import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as uuid from 'uuid';
import { ConversationsService } from '../../services/conversations.service';
import { Message } from '../../../models/message';
import { Conversation } from '../../../models/conversation';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrl: './chat-conversation.component.scss',
})
export class ConversationComponent {
  id: string = '';
  messages!: Message[];
  conversation!: Conversation | null;

  constructor(
    private router: ActivatedRoute,
    private conversationsService: ConversationsService
  ) {
    this.router.params.subscribe((params) => {
      this.id = params['id'];
      console.log('id : ', this.id);
      this.getConversationData(this.id);
    });
  }

  getConversationData(id: string): void {
    if (id === 'new') {
      this.conversation = this.initNewConversation();
      console.log('this.conversation : ', this.conversation);
    } else {
      this.conversation = this.conversationsService.getConversation(this.id);
      console.log('this.conversation ', this.conversation);
    }
    this.messages = this.conversation!.messages;
  }

  initNewConversation(): Conversation {
    return { id: '', name: '', messages: [] };
  }
}
