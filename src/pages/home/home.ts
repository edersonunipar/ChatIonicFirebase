import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild("content") content: any;

  // variaveis
  nome: string = "";
  mensagem: string = "";
  mensagens = [];

  constructor(public navCtrl: NavController) {
    this.getMensagens();
  }

  getMensagens(){
    var mensagensRef = firebase.database().ref().child("msg");
    mensagensRef.on("value", (snap) => {
      var data = snap.val();
      this.mensagens = [];
      for(var key in data){
        this.mensagens.push(data[key]);
      }

      this.scrollToBottom();
    });
  }

  scrollToBottom(){
    var contentEnd = document.getElementById("content-end").offsetTop;
    this.content.scrollTo(0, contentEnd, 300);
  }

  //mensaje = mensaginha e nombre = usuario
  // mensajes = msg e messages = mensagens e message = mensagem

  enviarMensagem(){
    var mensagensRef = firebase.database().ref().child("msg");
    mensagensRef.push({mensaginha: this.mensagem, usuario: this.nome });
    this.mensagem = "";
  }
}
