import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  getAllPosts() {
    return [...this.posts]; // returns a copy of posts array
  }

  postsListener() {
    return this.postUpdated.asObservable();
  }

  addNewPost(post: Post) {
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }
}
