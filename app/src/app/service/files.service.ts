import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

interface ArticleModel {
  name: String;
  group: String;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  get articles(): Observable<any> {
    return <Observable<Array<ArticleModel>>> this.http.get(`${environment.serverUrl}/files`);
  }

  getArticle(id: String): Observable<any> {
    return <Observable<Array<ArticleModel>>> this.http.get(`${environment.serverUrl}/files/${id}`);
  }
}
