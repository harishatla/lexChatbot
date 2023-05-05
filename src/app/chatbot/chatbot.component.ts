import { Component, OnInit } from '@angular/core';
import {LexRuntime}  from 'aws-sdk';
import {Message} from '../messages';
import {LexRuntimeV2} from 'aws-sdk';
import { JsonPipe } from '@angular/common';
 
 
 

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  constructor() { }
   
  lex:LexRuntimeV2
  sessiondata:any
  userInput: string
  messages: Message[] = [];
  lexResponse: any = "Hi, what would you like to do?";
  botmessage:string="please"

  ngOnInit(): void {
    
    this.messages.push(new Message(this.lexResponse,"Bot"));
    // this.sessiondata=this.lex.getSession();
    
  }
  getRandomInt(min, max) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }
  postLexText() {
    // this.lex.putSession(params, function(err, data) {
    //   if (err) console.log(err, err.stack); // an error occurred
    //   else     console.log(data);           // successful response
    // });c
    // this.lex.putSession()
    this.lex = new LexRuntimeV2(
      {
        apiVersion: '2020-08-07',
        region:'us-east-1',
        accessKeyId: 'AKIAZZ4MR4JHIZC43VWN',
        secretAccessKey: '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'
      }
    );
    // console.log(this.lex)
     
    var params = {
      botAliasId: '0MV8FOBJGC', /* required */
      botId: '1UAINXJZ8L', /* required */
      localeId: 'en_US', /* required */
      sessionId: '4356', /* required */
      text:'hi'
    };
    
    params.text= this.userInput;
    this.lex.recognizeText(params, (err, data)=>{
      if (err){
        console.log(err, err.stack); // an error occurred
      }
      else {
        console.log(data)  
        let jsostr = JSON.stringify(data);
        console.log(jsostr);
        // for(var i=0;i<=0;i++){
        //   console.log(data.messages[i])
        //   this.lexResponse=data.messages[i].content;
        // }
        this.lexResponse = data.messages

      }
      this.messages.push(new Message(this.userInput,"User"));
        this.userInput="";
      this.messages.push(new Message(this.lexResponse,"Bot"));
    });
  }
}
