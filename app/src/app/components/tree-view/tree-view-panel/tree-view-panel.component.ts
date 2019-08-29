import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeViewData } from '../tree-view/tree-view.component';

@Component({
  selector: 'app-tree-view-panel',
  templateUrl: './tree-view-panel.component.html',
  styleUrls: ['./tree-view-panel.component.scss']
})
export class TreeViewPanelComponent implements OnInit {

  @Input()
  data: TreeViewData

  @Output()
  onSelect = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  selectItem(index: number) {
    this.onSelect.emit(index);
  }
}
