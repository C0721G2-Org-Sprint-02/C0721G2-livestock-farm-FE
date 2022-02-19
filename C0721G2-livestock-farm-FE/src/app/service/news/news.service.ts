import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {News} from '../../model/news/news';

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
}
