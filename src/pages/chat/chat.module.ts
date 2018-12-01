import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { ChatService } from "../../providers/chat-service";
import { RelativeTime } from "../../pipes/relative-time";

@NgModule({
  declarations: [
    ChatPage,
    RelativeTime
  ],
  imports: [
    IonicPageModule.forChild(ChatPage),
  ],
  providers: [
    ChatService
  ]
})
export class ChatPageModule {}

