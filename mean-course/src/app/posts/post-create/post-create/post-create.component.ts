import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import { Post } from "../../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  @Output() newPost = new EventEmitter<Post>();
  enteredValue: string = "";
  enteredTitle: string = "";
  constructor() {}

  ngOnInit() {}
  onSave(form: NgForm) {
    if (form.invalid) return;
    var newPost: Post = {
      title: form.value.title,
      content: form.value.content,
    };
    this.newPost.emit(newPost);
  }
}
