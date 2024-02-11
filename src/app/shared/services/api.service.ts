import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { Conversation } from '../../models/conversation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:3000';
  readonly CACHE_SIZE = 1;

  constructor(private http: HttpClient) {}

  fetchConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.baseUrl}/conversations`).pipe(
      shareReplay(this.CACHE_SIZE)
    );
  }

  getConversationById(id: number): Observable<Conversation> {
    return this.http.get<any>(`${this.baseUrl}/conversation/${id}`);
  }

  addNewConversation(conversation: Conversation) {
    return this.http.post<Conversation>(
      `${this.baseUrl}/conversations`,
      conversation
    );
  }

  updateConversation(conversationId: string, conversationToUpdate: Conversation) {
    this.http.put<any>('http://localhost:3000/conversations/' + conversationId, conversationToUpdate)
  }
}
