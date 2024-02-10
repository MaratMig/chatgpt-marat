import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { Conversation } from '../../models/conversation';
import { conversations } from './mocks/conversations-mock';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly CACHE_SIZE = 1;

  fetchConversations(): Observable<Conversation[]> {
    return of(conversations).pipe(
      tap(() => console.log('Call to API for all conversations')),
      shareReplay(this.CACHE_SIZE)
    );
  }

  addNewConversation(conversation: Conversation) {
    return of(conversation);
    console.log('POST new conversation');
  }
}
