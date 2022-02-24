import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {News} from '../../model/news/news';
import {NewsDTO} from "../../model/news/news-dto";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private API_URL = 'http://localhost:8080/api/news';

  constructor(private http: HttpClient) {
  }

// Tai
  getNewsById(id): Observable<News> {
    return this.http.get<News>(this.API_URL + '/' + id);
  }

  getAllNews(page, title, typeNews): Observable<News[]> {
    console.log(typeNews + 'test');
    console.log(this.API_URL + '?page=' + page + '&title =' + title + '&typeNews=' + typeNews);
    return this.http.get<News[]>(this.API_URL + '?page=' + page + '&title=' + title + '&typeNews=' + typeNews);
  }
// ThinhTP
  deleteNewsById(id: string): Observable<any> {
    return this.http.delete(this.API_URL + '/delete/' + id);
  }

  save(news: any): Observable<any> {
    return this.http.post(this.API_URL + '/create/', news);
  }

  updateNews(id: string, news: News): Observable<any> {
    return this.http.patch(this.API_URL + '/edit/' + id, news);
  }

  findById(id: string): Observable<any> {
    return this.http.get<NewsDTO>(this.API_URL + '/edit/' + id);
  }
}
