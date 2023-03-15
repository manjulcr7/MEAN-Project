import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string) {
    const user: AuthData = {
      email: email,
      password: password,
    };
    this.http
      .post("http://localhost:3000/api/user/signup", user)
      .subscribe((res) => {
        console.log(res);
        // this.router.navigate(["/"]);
      });
  }

  login(email: string, password: string) {
    const user: AuthData = {
      email: email,
      password: password,
    };
    this.http
      .post("http://localhost:3000/api/user/login", user)
      .subscribe((res) => {
        console.log(res);
        // this.router.navigate(["/"]);
      });
  }
}
