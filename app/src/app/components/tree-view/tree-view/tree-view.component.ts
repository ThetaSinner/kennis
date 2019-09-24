import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

export interface TreeViewData {
  key: string;
  link: string;
  group: string;
  children: Array<TreeViewData>;
}

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {
  @Input()
  data$: Observable<Array<TreeViewData>>

  @Output()
  activeGroup = new EventEmitter<string>()

  stageOneData: Array<TreeViewData> = null;
  stageTwoData: Array<TreeViewData> = null;
  stageThreeData: Array<TreeViewData> = null;

  data: Array<TreeViewData>

  constructor() { }

  ngOnInit() {
    this.data$.subscribe((data) => {
      this.data = data;
      this.stageOneData = data;
      this.activeGroup.emit('root');
    })
  }

  panelOneSelect(index: number) {
    this.activeGroup.emit(this.stageOneData[index].group);

    this.stageTwoData = this.stageOneData[index].children
    this.stageThreeData = null;
  }

  panelTwoSelect(index: number) {
    this.activeGroup.emit(this.stageTwoData[index].group);

    this.stageThreeData = this.stageTwoData[index].children
  }

  panelThreeSelect(index: number) {
    this.activeGroup.emit(this.stageThreeData[index].group);

    this.stageOneData = this.stageTwoData;
    this.stageTwoData = this.stageThreeData;
    this.stageThreeData = this.stageThreeData[index].children
  }
}
