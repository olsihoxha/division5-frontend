import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/_component/home.component";
import {AuthGuard} from "./auth/guards/auth.guard";

let routes: Routes;

routes = [
  {
    path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '', component: HomeComponent, canLoad: [AuthGuard], canActivate: [AuthGuard]
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
