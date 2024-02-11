import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainWindowComponent } from './main-window/main-window.component';
import { ConversationComponent } from './core/chat-conversation/chat-conversation.component';

const routes: Routes = [
  { path: '', component: ConversationComponent },
  { path: 'chat/:id', component: ConversationComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
