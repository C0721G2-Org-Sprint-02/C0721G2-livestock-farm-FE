import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BuyService} from '../../../service/buy/buy.service';
import {BuyCreateComponent} from '../../buy/buy-create/buy-create.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog, private buyService: BuyService) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(BuyCreateComponent, {
      width: '800px',
      maxHeight: '100%',
      panelClass: 'custom-dialog-create-customer',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
