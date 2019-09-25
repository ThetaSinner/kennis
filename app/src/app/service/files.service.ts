import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface ArticleModel {
  name: String;
  group: String;
}

export interface Article {
  content: string;
}

export interface NewArticle {
  articleId: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  get articles(): Observable<any> {
    return <Observable<Array<ArticleModel>>> this.http.get(`${environment.serverUrl}/files`);
  }

  getArticle(query: string): Observable<Article> {
    return <Observable<Article>> this.http.get(`${environment.serverUrl}/files/${query}`);
  }

  getPage(uri: string): Observable<Article> {
    return <Observable<Article>> this.http.get(`${environment.serverUrl}/pages/${uri}`);
  }

  addArticle(group: string, addFileInput: string): Observable<NewArticle> {
    return <Observable<NewArticle>> this.http.post(`${environment.serverUrl}/files`, {group: group, name: addFileInput})
  }

  updateArticle(id: string, content: any): Observable<any> {
    return this.http.post(`${environment.serverUrl}/files/${id}`, {content: content});
  }
}
