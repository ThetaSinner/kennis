import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as ClassicEditor from '@ephyra/ckeditor5-build-markdown'
import { Observable } from 'rxjs';
import { Article } from '../service/files.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input()
  source$: Observable<Article>;

  @Output()
  onSave: EventEmitter<string> = new EventEmitter();

  @Output()
  onSaveAndExit = new EventEmitter();

  public Editor = ClassicEditor;
  content: string;

  constructor() { }

  ngOnInit() {
    this.source$.pipe(
      map(source => source.content)
    ).subscribe(content => {
      this.content = content;
    });
  }

  save() {
    this.onSave.emit(this.content);
  }

  saveAndClose() {
    this.onSaveAndExit.emit(this.content);
  }
}
