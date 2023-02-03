import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "mean-course";
  allPosts = [];
  constructor() {}

  GetNewPost(event: any) {
    this.allPosts.push(event);
  }
}
