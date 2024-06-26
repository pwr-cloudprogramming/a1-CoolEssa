import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {
    path: 'game/:id/:name',
    component: GameComponent
  },
  {
    path: 'init',
    component: StartComponent
  },
  {
    path: '',
    redirectTo: 'init',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
