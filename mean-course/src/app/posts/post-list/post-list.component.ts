import { Component, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
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
  isLoading: boolean = false;
  isUserAuthenticated: boolean;
  userAuthenticatedSub: Subscription;

  constructor(
    public postService: PostService,
    private authService: AuthService
  ) {}


  ngOnChanges() {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getAllPosts();
    this.postsSubscription = this.postService
      .postsListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;

        this.posts = posts;
      });

      console.log("HERE");

      this.isUserAuthenticated = this.authService.GetIsUserAuthCurrentState();
    this.userAuthenticatedSub = this.authService
      .IsUserAuthenticated()
      .subscribe((res) => {
        console.log(res);
        this.isUserAuthenticated = res;
      });
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
    this.userAuthenticatedSub.unsubscribe();
  }

  onDelete(id: string) {
    this.postService.deletePost(id);
  }
}
