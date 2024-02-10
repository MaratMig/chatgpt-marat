import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { Conversation } from '../../models/conversation';
import { conversations } from './mocks/conversations-mock';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';
  readonly CACHE_SIZE = 1;

  constructor(private http: HttpClient) {}

  fetchConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.baseUrl}/conversations`).pipe(
      tap(() => console.log('Call to API for all conversations')),
      shareReplay(this.CACHE_SIZE)
    );
  }

  getConversationById(id: number): Observable<Conversation> {
    return this.http.get<any>(`${this.baseUrl}/conversation/${id}`);
  }

  addNewConversation(conversation: Conversation) {
    console.log('new conversation', conversation);
    return this.http.post<Conversation>(
      'http://localhost:3000/conversations',
      conversation
    );
  }

  updateConversation(conversationId: string, conversationToUpdate: Conversation) {
    this.http.put<any>('http://localhost:3000/conversations/' + conversationId, conversationToUpdate)
      .subscribe(response => {
        console.log('Item updated:', response);
      });
  }
}
