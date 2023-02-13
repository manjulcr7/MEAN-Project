import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getAllPosts() {
    return this.http
      .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
      .pipe(
        map((postsData) => {
          return postsData.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        console.log(transformedPosts);
        this.posts = transformedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPost(id: string) {
    return this.http.get("http://localhost:3000/api/posts/" + id);
  }

  postsListener() {
    return this.postUpdated.asObservable();
  }

  addNewPost(post: Post) {
    this.http
      .post<{ message: string; postId: string }>(
        "http://localhost:3000/api/posts",
        post
      )
      .subscribe((res) => {
        console.log(res);
        post.id = res.postId;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, post: Post) {
    this.http
      .put("http://localhost:3000/api/posts/" + id, post)
      .subscribe((res) => {
        console.log(res);
        const updatedPosts = [...this.posts];
        const index = updatedPosts.findIndex((p) => p.id == id);
        updatedPosts[index] = post;
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    return this.http
      .delete("http://localhost:3000/api/posts/" + postId)
      .subscribe((res) => {
        console.log("DELETED!");
        this.posts = this.posts.filter((post) => post.id != postId);
        this.postUpdated.next([...this.posts]);
      });
  }
}
