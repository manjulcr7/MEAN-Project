import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string;
  private userId: string;
  private logoutTimer: any;

  private isUserAuthCurrentState: boolean;
  private isUserAuthenticated = new Subject<boolean>();
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
      .post<{ token: string; expiresIn: number; userId: string }>(
        "http://localhost:3000/api/user/login",
        user
      )
      .subscribe((res) => {
        console.log(res);
        const token = res.token;
        const tokenExpirationTime = res.expiresIn;
        if (token) {
          this.isUserAuthCurrentState = true;
          this.isUserAuthenticated.next(true);
          this.userId = res.userId;
          this.router.navigate(["/"]);
          this.setAuthTimer(tokenExpirationTime);
          const date = new Date();
          this.saveAuthData(
            token,
            new Date(date.getTime() + tokenExpirationTime * 1000),
            this.userId
          );
        }
        this.token = token;
      });
  }

  getToken() {
    return this.token;
  }

  IsUserAuthenticated() {
    return this.isUserAuthenticated.asObservable();
  }

  GetIsUserAuthCurrentState() {
    return this.isUserAuthCurrentState;
  }

  getUserId() {
    return this.userId;
  }

  logout() {
    this.token = null;
    this.isUserAuthCurrentState = false;
    this.isUserAuthenticated.next(false);
    this.router.navigate(["/"]);
    this.clearAuthData();
    clearTimeout(this.logoutTimer);
  }

  private saveAuthData(token: string, expiresIn: Date, userId: string) {
    console.log(token, expiresIn, userId);

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expiresIn", expiresIn.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("userId");
  }

  private setAuthTimer(duration: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expiresIn.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isUserAuthCurrentState = true;
      this.userId = authInfo.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.isUserAuthenticated.next(true);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");
    const userId = localStorage.getItem("userId");
    if (!token || !expiresIn || !userId) {
      return;
    }
    return {
      token: token,
      expiresIn: new Date(expiresIn),
      userId: userId,
    };
  }
}
