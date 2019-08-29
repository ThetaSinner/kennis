import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

export interface TreeViewData {
  key: String;
  link: String;
  children: Array<TreeViewData>;
}

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {
  stageOneData: Array<TreeViewData> = null;
  stageTwoData: Array<TreeViewData> = null;
  stageThreeData: Array<TreeViewData> = null;

  data: Array<TreeViewData>

  @Input()
  data$: Observable<Array<TreeViewData>>

  constructor() { }

  ngOnInit() {
    this.data$.subscribe((data) => {
      this.data = data;
      this.stageOneData = data;
    })
  }

  panelOneSelect(index: number) {
    this.stageTwoData = this.data[index].children
    this.stageThreeData = null;
  }

  panelTwoSelect(index: number) {
    this.stageThreeData = this.stageTwoData[index].children
  }

  panelThreeSelect(index: number) {
    this.stageOneData = this.stageTwoData;
    this.stageTwoData = this.stageThreeData;
    this.stageThreeData = this.stageThreeData[index].children
  }
}
