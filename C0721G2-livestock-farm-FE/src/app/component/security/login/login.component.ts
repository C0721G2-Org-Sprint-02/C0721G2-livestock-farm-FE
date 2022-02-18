import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SocialUser} from "angularx-social-login";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../service/security/auth.service";
import {TokenStorageService} from "../../../service/security/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareService} from "../../../service/share/share.service";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";

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

  socialUser: SocialUser;
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
  ) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember_me: false
    });
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


  onSubmit() {
    this.authService.login(this.userForm.value).subscribe(data => {
      if (this.userForm.value.remember_me === true) {
        this.tokenStorageService.saveUserLocal(data);
        this.tokenStorageService.saveTokenLocal(data.jwtToken);
      } else {
        this.tokenStorageService.saveUserSession(data);
        this.tokenStorageService.saveTokenSession(data.jwtToken);
      }

      this.authService.isLoggedIn = true;
      this.username = this.tokenStorageService.getUser().username;
      this.roles = this.tokenStorageService.getUser().roles;

      console.log('username: ' + this.tokenStorageService.getUser().username);
      console.log('role: ' + this.tokenStorageService.getUser().roles);
      console.log('token: ' + this.tokenStorageService.getUser().jwtToken);

      this.userForm.reset();
      this.dialogRef.close();
      if (this.roles.indexOf('ROLE_EMPLOYEE') !== -1) {
        this.router.navigate(['cages/list']);
        this.shareService.sendClickEvent();
      } else {
        this.router.navigate(['employee/list']);
        this.shareService.sendClickEvent();
      }
    }, error => {
      console.log(error);
      this.authService.isLoggedIn = false;
      this.errorMessage = 'Tài khoản hoặc mật khẩu không đúng';
    });


  }


  openDialogResetPassword() {
    this.dialogRef.close();
    const dialogResetPassword = this.dialog.open(ResetPasswordComponent, {
      width: '450px',
      height: '300px',
      panelClass: 'custom-dialog',
      disableClose: true
    });

    dialogResetPassword.afterClosed().subscribe(result => {
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  signInWithFB() {

  }

  signInWithGoogle() {

  }



  // logOut(): void {
  //   this.socialAuthService.signOut().then(
  //     data => {
  //       this.tokenStorageService.signOut();
  //       this.authService.isLoggedIn = false;
  //     }
  //   );
  // }


}
