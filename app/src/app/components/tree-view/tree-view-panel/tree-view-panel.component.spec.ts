import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewPanelComponent } from './tree-view-panel.component';

describe('TreeViewPanelComponent', () => {
  let component: TreeViewPanelComponent;
  let fixture: ComponentFixture<TreeViewPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeViewPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
