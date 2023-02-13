import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
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
  postId: string = "";
  isEditForm: boolean = false;
  post: Post;
  isLoading: boolean = false;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.isEditForm = true;
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe((post: Post) => {
          this.isLoading = false;
          this.post = post;
        });
      } else {
        this.isEditForm = false;
        this.postId = null;
      }
    });
  }

  onSave(form: NgForm) {
    if (form.invalid) return;
    var newPost: Post = {
      id: null,
      title: form.value.title,
      content: form.value.content,
    };
    this.isLoading = true;
    if (this.isEditForm) {
      newPost.id = this.postId;
      this.postService.updatePost(this.postId, newPost);
    } else {
      this.postService.addNewPost(newPost);
    }
    form.resetForm();
  }
}
