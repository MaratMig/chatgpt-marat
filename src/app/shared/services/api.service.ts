import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { Conversation } from '../../models/conversation';
import mock from './mocks/conversations-mock.json';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  requestConversationsFromServer(): Observable<Conversation[]> {
    return of(mock).pipe(
      tap(() => console.log('Call to API for all conversations')),
      shareReplay()
    );
  }
}
