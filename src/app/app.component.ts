import { Component,trigger,animate,style,transition,keyframes } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
   trigger("moveInLeft",[
      transition("void=> *",[style({transform:"translateX(300px)"}),
        animate(200,keyframes([
         style({transform:"translateX(300px)"}),
         style({transform:"translateX(0)"})
 
          ]))]),


          transition("*=>void",[style({transform:"translateX(0px)"}),
        animate(100,keyframes([
         style({transform:"translateX(0px)"}),
         style({transform:"translateX(300px)"})
 
          ]))])    
     
   	])

  ]
})
export class AppComponent {
  public messages: Message[];
  API_URL = "http://localhost:9999/api/v1/messages/";

  sendMessage(title, text){
    var data = JSON.stringify({
      "title": title,
      "body": {
        "text": text
      }
    });
    
    var xhr = new XMLHttpRequest();
    
    xhr.open("POST", this.API_URL + "save/");
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send(data);
  }

  constructor(http: Http) {
    http.get(this.API_URL + "list/").subscribe(result => {
      this.messages = result.json() as Message[];
  }, error => console.error(error));
  }
}

interface Message {
  id: number,
  title: string,
  created: string,
  body: {
      id: number,
      text: string
  }
}




