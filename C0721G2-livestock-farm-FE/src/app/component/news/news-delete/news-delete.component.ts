import {Component, Inject, OnInit} from '@angular/core';
import {News} from '../../../model/news/news';
import {Subscription} from 'rxjs';
import {NewsService} from '../../../service/news/news.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-news-delete',
  templateUrl: './news-delete.component.html',
  styleUrls: ['./news-delete.component.css']
})
export class NewsDeleteComponent implements OnInit {
  id: number;
  news: News;
  private subscription: Subscription;

  constructor(private medicalService: NewsService,
              public dialogRef: MatDialogRef<NewsDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    console.log(this.data.customerData.id);
    this.news = this.data.customerData;
  }
  deleteMedical() {
    console.log(this.news.id);
    this.subscription = this.medicalService.deleteNewsById(this.news.id).subscribe(data => {
      this.dialogRef.close();
      this.router.navigate(['/news/list']);
    });
  }
}
