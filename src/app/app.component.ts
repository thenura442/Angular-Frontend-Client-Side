import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Frontend-Client-Side';

  isShowDiv: boolean = false;

  clickEvent(){
    this.isShowDiv = !this.isShowDiv;
  }
}
