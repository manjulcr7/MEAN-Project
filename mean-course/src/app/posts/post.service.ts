import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:3000/api/posts"
      )
      .subscribe((posts) => {
        this.posts = posts.posts;
        this.postUpdated.next([...this.posts]);
      });
  }

  postsListener() {
    return this.postUpdated.asObservable();
  }

  addNewPost(post: Post) {
    this.http
      .post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe((res) => {
        console.log(res.message);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }
}
