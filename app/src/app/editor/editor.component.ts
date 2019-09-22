import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ephyra/ckeditor5-build-markdown'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public Editor = ClassicEditor;
  content: string = 'Edit me!';

  constructor() { }

  ngOnInit() {
  }

  test() {
    console.log(this.content);
  }
}
