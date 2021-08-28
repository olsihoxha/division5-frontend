import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/_component/home/home.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {ProfileComponent} from "./profile/_component/profile/profile.component";

let routes: Routes;

routes = [
  {
    path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '', component: HomeComponent, canLoad: [AuthGuard], canActivate: [AuthGuard]
  },
  {
    path: 'profile', component: ProfileComponent, canLoad: [AuthGuard], canActivate: [AuthGuard]
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
