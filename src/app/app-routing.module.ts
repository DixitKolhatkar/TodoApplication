import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  { path: 'logIn' , loadChildren:() => import('./Components/TodoLogin/log-in/log-in.module').then(m => m.LogInModule)},
  { path: 'signUp' , loadChildren:() => import('./Components/TodoLogin/sign-up/sign-up.module').then(m => m.SignUpModule)},
  { path: 'todo' , loadChildren:() => import('./Components/todo/todo.module').then(m => m.TodoModule), canActivate:[AuthGuard]},
  { path: 'home' , loadChildren:() => import('./Components/home/home.module').then(m => m.HomeModule)},
  { path: '**' , loadChildren:() => import('./Components/home/home.module').then(m => m.HomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
