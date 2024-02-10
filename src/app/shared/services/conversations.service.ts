import { Injectable } from '@angular/core';
import { Message } from '../../models/message';
import { BehaviorSubject, Observable, Subject, map, of, tap } from 'rxjs';
import * as uuid from 'uuid';
import { Conversation } from '../../models/conversation';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ConversationsService {
  readonly MAX_NAME_LENGTH = 28;

  // conversations$: Observable<Conversation[]> = of(mock).pipe(
  //   tap(() => console.log('Call to API for all conversations'))
  // );

  private currConversationSubj = new Subject<Conversation>();
  currentConversation$: Observable<Conversation> =
    this.currConversationSubj.asObservable();
  // conversations$ = this.conversationsSubject.asObservable();
  private conversationsSubject: BehaviorSubject<Conversation[]> =
    new BehaviorSubject<Conversation[]>([]);
  private conversations: Conversation[] = [];

  constructor(private apiService: ApiService) {}

  // getConversations(): Observable<Conversation[]> {
  //   if (this.conversations) {
  //     return this.conversations$;
  //   } else {
  //     this.apiService.fetchConversations().pipe(
  //       tap((conversations) => {
  //         this.conversations = [...conversations];
  //         this.conversationsSubj.next(this.conversations)
  //       })
  //     );
  //   }
  // }
  getConversations(): Observable<Conversation[]> {
    if (this.conversations.length > 0) {
      return this.conversationsSubject.asObservable();
    } else {
      return this.apiService.fetchConversations().pipe(
        tap((conversations) => {
          this.conversations = conversations;
          this.conversationsSubject.next(this.conversations);
        })
      );
    }
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
      messages: [{ role: 'Me', content: message }],
    };
    this.conversations.push(newConversation);
    this.conversationsSubject.next([...this.conversations]);
    //optimistic approach
    this.apiService
      .addNewConversation(newConversation)
      .pipe(
        tap((conversation) => this.currConversationSubj.next(conversation))
      );
  }

  addMessage(chatId: string, message: Message) {
    this.conversations
      .find((conversation) => conversation.id === chatId)
      ?.messages.push(message);
  }
}
