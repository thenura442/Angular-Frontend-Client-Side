import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../services/socket/socket.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  title = 'Websocket-Component';
  userName: string = '';
  message: string = '';
  output: any[] = [];
  feedback: string = '';
  id: any = '';
  name = 'Student';
  Type: string = '';
  chatTrue: boolean = false;

  constructor(private socketService:SocketService, private activatedRoute: ActivatedRoute, private storageService:StorageService, private router:Router) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      console.log(this.id);
      let user = this.storageService.getUser();
      this.Type = user.type;
      if(this.Type == 'student'){
        this.userName = this.id
      }
      if(this.Type == 'staff'){
        this.userName = "Staff";
      }
      socketService.emit('new-user', this.id, this.userName)
      socketService.listen('typing').subscribe((data) => this.updateFeedback(data));
      socketService.listen('chat').subscribe((data) => this.updateMessage(data));
  }

  ngOnInit(): void {
    this.socketService.listen('user-connected').subscribe((data) => {console.log(data+' It came bitch');})
  }
  updateMessage(data: any): void {
    this.feedback = '';
    if(!!!data) return;
    this.output.push(data);
  }
  updateFeedback(data: any): void {
    this.feedback = `${data} is typing a message`
  }

  messageTyping(): void{
    console.log(`${this.userName} is typing`);
    this.socketService.emit('typing', this.id ,this.userName);
  }

  sendMessage():void{
    if(this.message == "" || this.userName == "") return;
    this.output.push({message: this.message, handle: 'You'});
    console.log({
      message: this.message,
      handle: this.userName
    });
    this.socketService.emit('chat',this.id,{
      message: this.message,
      handle: this.userName
    })
    this.message = "";
  }

  deleteChat(): void{
    this.socketService.delete('delete-chat',this.id);
    this.router.navigate(['/room']);
  }

  back(): void{
    this.router.navigate(['/room']);
  }
}
