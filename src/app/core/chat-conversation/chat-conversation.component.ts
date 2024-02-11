import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConversationsService } from '../../shared/services/conversations.service';
import { Message } from '../../models/message';
import { Conversation } from '../../models/conversation';

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
    private route: ActivatedRoute,
    private router: Router,
    private conversationsService: ConversationsService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.getConversationData(this.id);
      }
    });
  }

  getConversationData(id: string): void {
    this.conversation = this.conversationsService.getConversation(this.id);
    // It's a workaround -- didn't have time to finish...
    if (this.conversation === null) {
      this.router.navigate(['/']);
    } else {
      this.messages = this.conversation!.messages;
    }
  }
}
