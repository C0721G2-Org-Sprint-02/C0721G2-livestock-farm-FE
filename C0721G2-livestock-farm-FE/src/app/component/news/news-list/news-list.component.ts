import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {News} from '../../../model/news/news';
import {NewsService} from '../../../service/news/news.service';
import {TokenStorageService} from '../../../service/security/token-storage.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  private subscription: Subscription;
  time = new Date();
  news: News[];
  totalPages: number;
  pageNumber: number;
  size = 0;
  page = 0;
  title = '';
  typeNews = '';
  message: string;
  flagSearch = true;
  flag = true;
  check = false;

  constructor(
    public newsService: NewsService,
    private tokenStorageService: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    if (user){
      user.roles.forEach(role => {
        if ((role === 'ROLE_ADMIN') || (role === 'ROLE_EMPLOYEE')){
          this.check = true;
          console.log(this.check)
        }
      });
    }
    this.showNews();
  }

  showNews() {
    if (this.title === '' && this.typeNews === '') {
      this.flagSearch = false;
      this.showListNews();
    } else if (this.title !== '' && this.typeNews === '') {
      this.searchNewsByTitle();
    } else if (this.title === '' && this.typeNews === '1') {
      this.focus();
    } else if (this.title === '' && this.typeNews === '2') {
      this.breeding();
    } else if (this.title === '' && this.typeNews === '3') {
      this.technology();
    }
  }

  searchNewsByTitle() {
    if (this.flagSearch === false) {
      this.page = 0;
      this.showListNews();
      this.flagSearch = true;
    } else {
      this.showListNews();
      this.flagSearch = true;
    }
  }

  onSubmit() {
    this.page = 0;
    console.log('aaa')
    this.flagSearch = false;
    this.showListNews();
  }

  showListNews() {
    this.subscription = this.newsService.getAllNews(this.page, this.title, this.typeNews).subscribe(data => {
      console.log(this.page);
      console.log(this.title);
      console.log(data);
      if (data !== null) {
        this.news = data['content'];
        console.log(this.news);
        this.totalPages = data['totalPages'];
        this.size = data['size'];
        this.pageNumber = data['pageable'].pageNumber;
        console.log(this.pageNumber);
        this.message = '';
        console.log(this.message);
      } else {
        this.message = 'Not found !!!';
        console.log(this.message);
      }
    });
  }

  // Tiêu điểm
  showAllNews() {
    this.page = 0;
    this.typeNews = '';
    this.title = '';
    this.showListNews()
  }

  focus() {
    this.typeNews = '1';
    if (this.flagSearch === false) {
      this.page = 0;
      this.showListNews();
      this.flagSearch = true;
    } else {
      this.showListNews();
      this.flagSearch = true;
    }
  }

  // tin chan nuoi
  breeding() {
    this.typeNews = '2';
    if (this.flagSearch === false) {
      this.page = 0;
      this.showListNews();
      this.flagSearch = true;
    } else {
      this.showListNews();
      this.flagSearch = true;
    }
  }

  // tin công nghệ
  technology() {
    this.typeNews = '3';
    if (this.flagSearch === false) {
      this.page = 0;
      this.showListNews();
      this.flagSearch = true;
    } else {
      this.showListNews();
      this.flagSearch = true;
    }
  }

  previousClick(index) {
    this.page = this.page - index;
    console.log(this.page);
    // console.log('pre pay ' + this.page + '/' + this.totalPages + 'search:' + this.flagSearch);
    this.ngOnInit();
  }

  nextClick(index) {
    this.page = this.page + index;
    // console.log('next pay ' + this.page + '/' + this.totalPages + 'search:' + this.flagSearch);
    this.ngOnInit();
  }

}
