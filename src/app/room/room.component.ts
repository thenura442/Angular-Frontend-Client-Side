import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket/socket.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

  user: any ;
  Type: string | null = '';
  chatTrue:boolean = false;

  constructor(private router: Router, private storageService: StorageService, private socketService: SocketService){}

  keys: any[] = [];
  rooms: any[] = [];
  newRoom: string = '';

  ngOnInit(): void {
    this.socketService.getRooms().subscribe((result: any) => {
      console.log(result.rooms)
      this.keys = Object.keys(result.rooms)
      this.rooms = result.rooms;
      console.log(this.keys)
    })

    this.storageService.currentData.subscribe(dataSub => {
      let user = dataSub;
      this.user = dataSub;
      if(user != null && user.type == 'student'){
        console.log(user)
        this.Type = user.type;
        this.newRoom = user._id;
        console.log(this.Type);
        console.log(this.newRoom);
      }
      if(user != null && user.type == 'staff'){
        console.log(user)
        this.Type = user.type;
        this.newRoom = user._id;
        console.log(this.Type);
        console.log(this.newRoom);
      }
    })
  }

  body: any = {
    room: ''
  }

  startChat(){
    this.body.room = this.newRoom
    console.log(this.body.room)
    this.socketService.newRoom(this.body).subscribe((room) => {
      console.log(room);
    })
    this.chatTrue = true;
  }

  chatNow(){
    this.router.navigate(['/room/'+this.newRoom]);
  }
}
