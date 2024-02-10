import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationsPanelComponent } from './conversations-panel/conversations-panel.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';



@NgModule({
  declarations: [ConversationsPanelComponent],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule
  ],
  exports: [
    ConversationsPanelComponent
  ]
})
export class CoreModule { }
