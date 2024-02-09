import { Injectable } from '@angular/core';
import { Message } from '../../models/message';
import { Observable, map, of, tap } from 'rxjs';
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

  private conversations!: Conversation[];

  constructor(private apiService: ApiService) {}

  getConversations(): Observable<Conversation[]> {
    if (this.conversations) {
      return of(this.conversations);
    } else {
      return this.apiService.requestConversationsFromServer().pipe(
        tap((conversations) => (this.conversations = [...conversations])),
        map(() => this.conversations)
      );
    }
  }

  //create additonal api service low level
  getConversation(id: string): Conversation | null {
    return this.conversations.find((chat) => chat.id === id) || null;
  }

  addConversation(message: string) {
    let name =
      message.length > this.MAX_NAME_LENGTH
        ? message.slice(0, this.MAX_NAME_LENGTH) + '...'
        : message;
    let id = uuid.v4();
    this.conversations.push({ id, name, messages: [{role: 'Me', content: message}] });
  }

  addMessage(chatId: string, message: Message) {
    this.conversations
      .find((conversation) => conversation.id === chatId)
      ?.messages.push(message);
  }
}
