import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, flatMap } from 'rxjs/operators';
import { FilesService, Article } from '../service/files.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editor-host',
  templateUrl: './editor-host.component.html',
  styleUrls: ['./editor-host.component.scss']
})
export class EditorHostComponent implements OnInit {
  source$: Observable<Article>;
  sourceId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filesService: FilesService) { }

  ngOnInit() {
    this.source$ = this.route.queryParams.pipe(
      map(params => {
        this.sourceId = params.sourceId;
        return this.sourceId;
      }),
      flatMap(sourceId => this.filesService.getArticle(sourceId))
    );
  }

  handleSave(content) {
    this.filesService.updateArticle(this.sourceId, content).subscribe(() => {
      console.log('Saved!');
    });
  }

  handleSaveAndExit(content) {
    this.filesService.updateArticle(this.sourceId, content).subscribe(() => {
      this.router.navigate(['/pages', this.sourceId]);
    });
  }
}
