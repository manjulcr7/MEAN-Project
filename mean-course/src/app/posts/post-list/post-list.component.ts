import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  // posts=[
  //   {title:"Post1",value:"First Post"},
  //   {title:"Post2",value:"Second Post"},
  //   {title:"Post3",value:"Third Post"},
  // ]
  posts=[]
  constructor() { }

  ngOnInit() {
  }
}
