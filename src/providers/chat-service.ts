import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class ChatMessage {
  messageId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  toUserId: string;
  time: number | string;
  message: string;
  status: string;
}

export class UserInfo {
  id: string;
  name?: string;
  avatar?: string;
}

@Injectable()
export class ChatService {

  messages;
  index = 0;

  constructor(private http: HttpClient, private events: Events) {
    this.getMessageList().subscribe((data) => {
      this.messages  = data;
    })
  }

  mockNewMessage() {
    const mockMessage: ChatMessage = {
      messageId: Date.now().toString(),
      userId: '210000198410281948',
      userName: 'Tzekas',
      userAvatar: './assets/user.jpg',
      toUserId: '140000198202211138',
      time: Date.now(),
      message: this.messages[this.index].message,
      status: 'success'
    };

    this.index++;

    setTimeout(() => {
      this.events.publish('chat:received', mockMessage, Date.now())
    }, Math.random() * 1800)
  }

  getMessageList(): Observable<ChatMessage[]> {
    const messageListUrl = './assets/mock/msg-list.json';
    return this.http.get<any>(messageListUrl)
      .pipe(map(response => response.array));
  }

  sendMessage() {
    return new Promise(resolve => setTimeout(() => resolve(), Math.random() * 1000))
      .then(() => this.mockNewMessage());
  }

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id: '140000198202211138',
      name: 'Zouros',
      avatar: './assets/user.jpg'
    };
    return new Promise(resolve => resolve(userInfo));
  }

  getToUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id: '210000198410281948',
      name: 'Tzekas',
      avatar: './assets/to-user.jpg'
    };
    return new Promise(resolve => resolve(userInfo));
  }

}
