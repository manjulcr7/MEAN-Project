import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Post } from "../post.model";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnChanges {
  @Input() posts: Array<Post>;
  // posts=[
  //   {title:"Post1",value:"First Post"},
  //   {title:"Post2",value:"Second Post"},
  //   {title:"Post3",value:"Third Post"},
  // ]
  constructor() {}

  ngOnChanges() {}
  ngOnInit() {}
}
