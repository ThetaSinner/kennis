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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageComponent,
    TreeViewComponent,
    TreeViewPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgbAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
