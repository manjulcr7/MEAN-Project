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
              image: post.image,
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
    const postData: FormData = new FormData();
    postData.append("title", post.title);
    postData.append("content", post.content);
    postData.append("image", post.image, post.title);

    this.http
      .post<{ message: string; post: Post }>(
        "http://localhost:3000/api/posts",
        postData
      )
      .subscribe((res) => {
        console.log(res);
        post.id = res.post.id;
        post.image = res.post.image;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, post: Post) {
    let postData: Post | FormData;
    if (typeof post.image == "object") {
      postData = new FormData();
      postData.append("id", post.id);
      postData.append("title", post.title);
      postData.append("content", post.content);
      postData.append("image", post.image);
    } else {
      postData = {
        id: post.id,
        title: post.title,
        content: post.content,
        image: post.image,
      };
    }
    this.http
      .put("http://localhost:3000/api/posts/" + id, postData)
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
