import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../../service/news/news.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {News} from '../../../model/news/news';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {NewsDeleteComponent} from '../news-delete/news-delete.component';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  news: News;
  time = new Date();
  id: string;
  url = '';
  img: string;
  msg = '';
  roles: string;
  private subscription: Subscription;
   check = false;
  constructor(private newsService: NewsService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      // console.log(this.id);
      this.subscription = this.newsService.getNewsById(this.id).subscribe(data => {
          this.news = data;
          if (this.news.image == null) {
            this.img = 'https://staticfile.batdongsan.com.vn/images/avatar/no-image-default.png';
          } else{
            this.img = this.news.image;
          }
          console.log(this.news);
        }
        , error => {
          console.log(this.news);
        });
    });
    const user = this.tokenStorageService.getUser();
    if (user){
      user.roles.forEach(role => {
        if ((role === 'ROLE_ADMIN') || (role === 'ROLE_EMPLOYEE')){
          this.check = true;
          console.log(this.check)
        }
      });
    }
  }
  openDialog(id): void {
    console.log(id);
    // Trả về đối tượng customer
    this.newsService.getNewsById(id).subscribe(customerData => {
      console.log(customerData);
      const dialogRef = this.dialog.open(NewsDeleteComponent, {
        width: '500px',
        panelClass: '.mat-dialog-container',
        maxHeight: '100%',
        data: {customerData},
        // Khi bấm ra ngoài dialog khong bi mat di
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    });
    // this.router.navigate(['/news/list']);
  }
}
