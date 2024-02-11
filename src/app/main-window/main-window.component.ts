import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ConversationsService } from '../shared/services/conversations.service';
import { Conversation } from '../models/conversation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.scss',
})
export class MainWindowComponent implements OnInit {
  opened: boolean = true;
  currentConversation$!: Observable<Conversation | null>;
  currentConversation: Conversation | null = null;

  dynamicTransformValue: string =
    'translateX(0px) translateY(-50%) rotate(180deg) translateZ(0px)';

  constructor(
    private conversationsService: ConversationsService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'chatGptIcon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/svg/chat-gpt-icon.svg'
      )
    );
  }
  ngOnInit(): void {
    this.conversationsService.currentConversation$.subscribe((conversation) => {
      this.currentConversation = conversation;
    });
  }

  toggleSideNav() {
    this.opened = !this.opened;
  }

  submitText(messageContent: string) {
    if (this.currentConversation) {
      this.conversationsService.addMessage(
        this.currentConversation.id,
        messageContent
      );
    } else {
      this.conversationsService.addConversation(messageContent);
    }
  }
}
