import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  @Output() newPost = new EventEmitter<any>();
  enteredValue: string = "";
  enteredTitle: string = "";
  constructor() {}

  ngOnInit() {}
  onSave() {
    var newPost = { title: this.enteredTitle, value: this.enteredValue };
    this.newPost.emit(newPost);
  }
}
