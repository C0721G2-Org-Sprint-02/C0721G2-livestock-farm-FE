import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BuyCreateComponent} from './component/buy/buy-create/buy-create.component';
import {TokenStorageService} from './service/security/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'C0721G2-livestock-farm-FE';

  constructor(private token: TokenStorageService) {
    const user = this.token.getUser();
    console.log(user);
  }
}
