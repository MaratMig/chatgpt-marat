import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { Conversation } from '../../models/conversation';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch conversations from API', () => {
    const mockConversations: Conversation[] = [
      { id: "1", name: 'Conversation 1', messages: [] },
      { id: "2", name: 'Conversation 2', messages: [] }
    ];

    service.fetchConversations().subscribe(conversations => {
      expect(conversations).toEqual(mockConversations);
    });

    const request = httpMock.expectOne(`${service.baseUrl}/conversations`);
    expect(request.request.method).toBe('GET');
    request.flush(mockConversations);
  });

  it('should add new conversation via API', () => {
    const newConversation: Conversation = { id: "1", name: 'New Conversation', messages: [] };

    service.addNewConversation(newConversation).subscribe(conversation => {
      expect(conversation).toEqual(newConversation);
    });

    const request = httpMock.expectOne(`${service.baseUrl}/conversations`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(newConversation);
    request.flush(newConversation);
  });
});
