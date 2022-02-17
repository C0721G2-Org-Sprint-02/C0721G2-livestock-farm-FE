import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SocialUser} from "angularx-social-login";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../service/security/auth.service";
import {TokenStorageService} from "../../../service/security/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareService} from "../../../service/share/share.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  username: string;
  roles: string[] = [];
  returnUrl: string;
  errorMessage = '';

  // socialUser: SocialUser;
  userLogged: SocialUser;
  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    // private socialAuthService: SocialAuthService,
    private shareService: ShareService
  ) { }

  ngOnInit(): void {
    // this.userForm = this.fb.group({
    //   username: ['', [Validators.required]],
    //   password: ['', [Validators.required]],
    //   remember_me: false});
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    if (this.tokenStorageService.getUser()) {
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
    // this.socialAuthService.authState.subscribe(
    //   data => {
    //     this.userLogged = data;
    //     this.authService.isLoggedIn = (this.userLogged != null && this.tokenStorageService.getUser() != null);
    //   }
    // );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {

  }

  openDialogResetPassword() {

  }

  signInWithFB() {

  }

  signInWithGoogle() {

  }

  openDialogRegister() {

  }
}
