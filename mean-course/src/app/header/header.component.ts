import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isUserAuthenticated: boolean;
  userAuthenticatedSub: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userAuthenticatedSub = this.authService
      .IsUserAuthenticated()
      .subscribe((res) => {
        this.isUserAuthenticated = res;
      });
  }
  ngOnDestroy() {
    this.userAuthenticatedSub.unsubscribe();
  }

  logout(){
    this.authService.logout();
  }
}
