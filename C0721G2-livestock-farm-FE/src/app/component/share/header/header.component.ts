import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {Router} from '@angular/router';
import {ShareService} from '../../../service/share/share.service';
import {LoginComponent} from '../../security/login/login.component';
import {BuyCreateComponent} from '../../buy/buy-create/buy-create.component';
import {BuyService} from '../../../service/buy_individual/buy.service';

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
    private shareService: ShareService,
    private buyService: BuyService) {
    this.shareService.getClickEvent().subscribe(()=>{
      this.loadHeader();
    })
  }


  ngOnInit(): void {
    this.loadHeader();
  }

  loadHeader(): void{
    if(this.tokenStorageService.getUser()){
      // dòng này dùng để làm gì???
      // this.role = this.tokenStorageService.getUser().role[0];
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


  openDialogBuy() {
    const dialogRef = this.dialog.open(BuyCreateComponent, {
      width: '800px',
      maxHeight: '100%',
      panelClass: 'custom-dialog-create-customer',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '800px',
      panelClass: 'custom-dialog',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe( result => {});
  }

  logout() {
    this.tokenStorageService.signOut();
    this.loadHeader();
    this.router.navigate(['/home']);
  }
}
