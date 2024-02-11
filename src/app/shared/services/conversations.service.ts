import { Injectable } from '@angular/core';
import { Message } from '../../models/message';
import { BehaviorSubject, Observable, Subject, map, of, tap } from 'rxjs';
import * as uuid from 'uuid';
import { Conversation } from '../../models/conversation';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConversationsService {
  readonly MAX_NAME_LENGTH = 28;

  private currConversationSubj = new BehaviorSubject<Conversation | null>(null);
  currentConversation$: Observable<Conversation | null> =
    this.currConversationSubj.asObservable();
  private conversationsSubject: BehaviorSubject<Conversation[]> =
    new BehaviorSubject<Conversation[]>([]);

  conversations$ = this.conversationsSubject.asObservable();
  private conversations: Conversation[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  getConversations(): void {
    this.apiService.fetchConversations().subscribe((res) => {
      this.conversations = res;
      this.conversationsSubject.next(this.conversations);
    });
  }

  getConversation(id: string): Conversation | null {
    return (
      this.conversations.find((conversation) => conversation.id === id) || null
    );
  }

  addConversation(message: string) {
    let name =
      message.length > this.MAX_NAME_LENGTH
        ? message.slice(0, this.MAX_NAME_LENGTH) + '...'
        : message;
    let id = uuid.v4();
    const newConversation = {
      id,
      name,
      messages: [{ role: 'User', content: message }],
    };
    this.conversations.push(newConversation);
    this.conversationsSubject.next([...this.conversations]);
    this.apiService
      .addNewConversation(newConversation)
      .subscribe((conversation) => {
        this.currConversationSubj.next(conversation);
        this.router.navigate(['/chat', conversation.id]);
      });
  }

  addMessage(chatId: string, messageContent: string) {
    let message = { role: 'User', content: messageContent };
    let conversationToUpdate = this.conversations.find(
      (conversation) => conversation.id === chatId
    );
    conversationToUpdate!.messages.push(message);
    this.apiService.updateConversation(chatId, {
      ...(conversationToUpdate as Conversation),
    });
  }

  updateCurrentConversation(conversation: Conversation | null) {
    this.currConversationSubj.next(conversation)
  }
}
