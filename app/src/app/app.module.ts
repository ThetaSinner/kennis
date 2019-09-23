import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { PageComponent } from './page/page/page.component';
import { FormsModule } from '@angular/forms';
import { TreeViewComponent } from './components/tree-view/tree-view/tree-view.component';
import { TreeViewPanelComponent } from './components/tree-view/tree-view-panel/tree-view-panel.component';
import { RouteTransformDirective } from './directive/route-transform.directive';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditorComponent } from './editor/editor.component';
import { EditorHostComponent } from './editor-host/editor-host.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageComponent,
    TreeViewComponent,
    TreeViewPanelComponent,
    RouteTransformDirective,
    EditorComponent,
    EditorHostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgbAlertModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
