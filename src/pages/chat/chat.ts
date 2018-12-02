import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";
import { WatsonProvider } from '../../providers/watson/watson';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {

  @ViewChild(Content) content: Content;
  @ViewChild('user_input') messageInput: ElementRef;

  messages: ChatMessage[] = [];

  user: UserInfo;
  toUser: UserInfo;
  editorMessage = '';

  // create users
  constructor(navParams: NavParams,
    private chatService: ChatService,
    private events: Events, public watson: WatsonProvider) {

    // get bot info
    this.chatService.getUserInfo()
      .then((res) => {
        this.user = res
      });

    // get user info
    this.chatService.getToUserInfo()
      .then((res) => {
        this.toUser = res
      });
  }

  // Watson 
  callWatson() {
    this.watson.callWatson(this.editorMessage.trim());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    //get message list
    this.getMessage();

    // Subscribe to received  new message events
    this.events.subscribe('chat:received', message => {
      this.pushNewMessage(message);
    })
  }

  onFocus() {
    this.content.resize();
    this.scrollToBottom();
  }

  /**
   * @name getMessage
   * @returns {Promise<ChatMessage[]>}
   */
  getMessage() {
    // Get mock message list
    this.messages = [
      {
        "messageId": "1",
        "userId": "210000198410281948",
        "userName": "George",
        "userAvatar": "./assets/user.jpg",
        "toUserId": 'x',
        "time": 1491036720000,
        "message": "👋 Hey George, βγήκαν τα τέλη κυκλοφορίας!",
        "status": "success"
      }
    ];
    // return this.chatService
    //   .getMessageList()
    //   .subscribe(res => {
    //     this.messages = res;
    //     this.scrollToBottom();
    //   });
  }

  /**
   * @name sendMessage
   */
  sendMessage() {
    if (!this.editorMessage.trim()) return;

    // Mock message
    const id = Date.now().toString();
    let newMessage: ChatMessage = {
      messageId: Date.now().toString(),
      userId: this.user.id,
      userName: this.user.name,
      userAvatar: this.user.avatar,
      toUserId: this.toUser.id,
      time: Date.now(),
      message: this.editorMessage,
      status: 'pending'
    };

    this.pushNewMessage(newMessage);
    this.editorMessage = '';

    this.chatService.sendMessage()
      .then(() => {
        let index = this.getMessageIndexById(id);
        if (index !== -1)
          this.messages[index].status = 'success';
      });

    //this.callWatson();
  }

  /**
   * @name pushNewMessage
   * @param message
   */
  pushNewMessage(message: ChatMessage) {
    const userId = this.user.id,
      toUserId = this.toUser.id;

    // Verify user relationships
    if (message.userId === userId && message.toUserId === toUserId) {
      this.messages.push(message);
    } else if (message.toUserId === userId && message.userId === toUserId) {
      this.messages.push(message);
    }
    this.scrollToBottom();
  }

  getMessageIndexById(id: string) {
    return this.messages.findIndex(e => e.messageId === id)
  }


  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea = this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }
}
