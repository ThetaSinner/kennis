import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page/page.component';
import { EditorHostComponent } from './editor-host/editor-host.component';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'home'
}, {
  path: 'home',
  component: HomeComponent
}, {
  path: 'pages',
  children: [{
    path: '**',
    component: PageComponent
  }]
}, {
  path: 'editor',
  component: EditorHostComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
