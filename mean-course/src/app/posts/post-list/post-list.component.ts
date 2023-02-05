import { Component, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostService } from "../post.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnChanges, OnDestroy {
  posts: Array<Post> = [];
  postsSubscription: Subscription;

  constructor(public postService: PostService) {}

  ngOnChanges() {}

  ngOnInit() {
    this.postService.getAllPosts();
    this.postsSubscription = this.postService
      .postsListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }
}
