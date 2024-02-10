import { Component, Input } from '@angular/core';
import { Conversation } from '../../models/conversation';

@Component({
  selector: 'app-conversations-panel',
  templateUrl: './conversations-panel.component.html',
  styleUrl: './conversations-panel.component.scss'
})
export class ConversationsPanelComponent {
  @Input()
  conversations: Conversation[] | null = [];

}
