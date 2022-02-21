import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../../service/news/news.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {News} from "../../../model/news/news";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  news: News;
  id: string;
  url = '';
  img: string;
  msg = '';
  private subscription: Subscription;
  constructor(private newsService: NewsService,
              private activatedRoute: ActivatedRoute
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
          // console.log(this.imgList);
          // console.log(this.img);
        }
        , error => {
          console.log(this.news);
        });
    });
  }

}
