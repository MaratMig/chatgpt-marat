import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation } from '../../models/conversation';
import { ConversationsService } from '../../shared/services/conversations.service';

@Component({
  selector: 'app-conversations-panel',
  templateUrl: './conversations-panel.component.html',
  styleUrl: './conversations-panel.component.scss'
})
export class ConversationsPanelComponent {
  conversations$!: Observable<Conversation[]>;

  constructor(private conversationsService: ConversationsService) {

  }
  ngOnInit(): void {
    this.conversations$ = this.conversationsService.conversations$;
    this.conversationsService.getConversations()
  }

  selectConversation(conversation: Conversation | null){
    this.conversationsService.updateCurrentConversation(conversation)
  }

}
