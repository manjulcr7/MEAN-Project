import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredValue:string="";
  postContent:string="NO Content";
  constructor() { }

  ngOnInit() {
  }
  onSave(){
    this.postContent=this.enteredValue;
  }

}
