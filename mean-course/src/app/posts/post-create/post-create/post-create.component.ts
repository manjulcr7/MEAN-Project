import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from "../../post.model";
import { PostService } from "../../post.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  enteredValue: string = "";
  enteredTitle: string = "";
  constructor(public postService: PostService) {}

  ngOnInit() {}

  onSave(form: NgForm) {
    if (form.invalid) return;
    var newPost: Post = {
      title: form.value.title,
      content: form.value.content,
    };
    this.postService.addNewPost(newPost);
    form.resetForm();
  }
}
