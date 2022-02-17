import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TokenStorageService} from "../../../service/security/token-storage.service";
import {Router} from "@angular/router";
import {ShareService} from "../../../service/share/share.service";
import {LoginComponent} from "../../security/login/login.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  role: string;
  urlImg: string;
  isLoggedIn: boolean;
  idCustomer: string;
  constructor(
    public dialog: MatDialog,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private shareService: ShareService) {
    this.shareService.getClickEvent().subscribe(()=>{
      this.loadHeader();
    })
  }

  ngOnInit(): void {
    this.loadHeader();
  }

  loadHeader(): void{
    if(this.tokenStorageService.getUser()){
      this.role = this.tokenStorageService.getUser().role[0];
      this.username = this.tokenStorageService.getUser().username;
      this.urlImg = this.tokenStorageService.getUser().urlImg;
      this.isLoggedIn = this.tokenStorageService.getUser().idCustomer;
    } else {
      this.role = null;
      this.username = null;
      this.urlImg = null;
      this.idCustomer = null;
    }
    this.isLoggedIn = this.username != null;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: "700px",
      panelClass: 'custom-dialog',
      // disableClose: true
    });
    // dialogRef.afterClosed().subscribe( result => {});
  }

  logout() {
    this.tokenStorageService.signOut();
    this.loadHeader();
    this.router.navigate(['/home']);
  }
}
