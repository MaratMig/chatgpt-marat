import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainWindowComponent } from './main-window/main-window.component';
import { ConversationComponent } from './shared/components/chat-conversation/chat-conversation.component';

const routes: Routes = [
  { path: '', redirectTo: 'chat/new', pathMatch: 'full' },
  // { path: 'new', component: ConversationComponent },
  { path: 'chat/:id', component: ConversationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
