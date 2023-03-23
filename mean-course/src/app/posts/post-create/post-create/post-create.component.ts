import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../../post.model";
import { PostService } from "../../post.service";
import { mimeType } from "./mime-type.validator";

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
  form: FormGroup;
  imagePreview: string = null;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.isEditForm = true;
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe((post: Post) => {
          this.isLoading = false;
          this.post = post;
          this.form.setValue({
            title: post.title,
            content: post.content,
            image: post.image,
          });
        });
      } else {
        this.isEditForm = false;
        this.postId = null;
      }
    });
  }

  fileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file,
    });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSave() {
    if (this.form.invalid) return;
    var newPost: Post = {
      id: null,
      title: this.form.value.title,
      content: this.form.value.content,
      image: this.form.value.image,
      creator : null
    };
    this.isLoading = true;
    if (this.isEditForm) {
      newPost.id = this.postId;
      this.postService.updatePost(this.postId, newPost);
    } else {
      this.postService.addNewPost(newPost);
    }
    this.form.reset();
  }
}
