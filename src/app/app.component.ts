import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { Subscription } from "rxjs";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  openedSidenav = true;
  sidenavMode = "side";

  private watcher$: Subscription;

  constructor(
    private mediaObserver: MediaObserver,
    public authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    authService.handleAuthentication();

    this.matIconRegistry.addSvgIcon(
      "cooking",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/cooking.svg")
    );
  }

  public hasScopes(scopes: string[]): boolean {
    return this.authService.hasScopes(scopes);
  }

  public login(): void {
    this.authService.login();
  }

  public logout(): void {
    this.authService.logout();
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get username(): string {
    return this.authService.getUsername();
  }

  get userProfileImage(): string {
    return this.authService.getProfileImage();
  }

  ngOnInit() {
    this.watcher$ = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        if (change.mqAlias === "xs") {
          this.openedSidenav = false;
          this.sidenavMode = "over";
        } else {
          this.openedSidenav = true;
          this.sidenavMode = "side";
        }
      }
    );
  }

  ngOnDestroy() {
    this.watcher$.unsubscribe();
  }
}
