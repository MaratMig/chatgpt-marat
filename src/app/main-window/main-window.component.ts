import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ConversationsService } from '../shared/services/conversations.service';
import { Conversation } from '../models/conversation';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.scss',
})
export class MainWindowComponent implements OnInit {
  opened: boolean = true;
  events: string[] = [];
  conversations$!: Observable<Conversation[]>;
  currentConversation$!: Observable<Conversation | null>;
  currentConversation: Conversation | null = null;
  textForm!: FormGroup;

  dynamicTransformValue: string =
    'translateX(0px) translateY(-50%) rotate(180deg) translateZ(0px)';

  constructor(
    private conversationsService: ConversationsService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.matIconRegistry.addSvgIcon(
      'chatGptIcon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/svg/chat-gpt-icon.svg'
      )
    );
  }
  ngOnInit(): void {
    this.conversations$ = this.conversationsService.getConversations();
    this.currentConversation$ = this.conversationsService.currentConversation$;
    this.currentConversation$.subscribe(
      (conversation) => (this.currentConversation = conversation)
    );
    this.textForm = this.formBuilder.group({
      text: ['', Validators.required],
    });
  }

  toggleSideNav(sidenav: MatSidenav) {
    this.changeTransformValue();
    this.opened = !this.opened;
  }

  changeTransformValue() {
    if (this.opened) {
      this.dynamicTransformValue =
        'translateX(260px) translateY(-50%) rotate(0deg) translateZ(0px)';
    } else {
      this.dynamicTransformValue =
        'translateX(0px) translateY(-50%) rotate(180deg) translateZ(0px)';
    }
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

    this.textForm.reset();
  }
}
