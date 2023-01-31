import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postContent:string="NO Content";
  constructor() { }

  ngOnInit() {
  }
  onSave(textareaInput:HTMLTextAreaElement){
    this.postContent=textareaInput.value;
  }

}
