import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: '/pet', pathMatch: 'full'},
  {
    path: 'pet',
    loadChildren: () => import('./pet/pet.module').then(m => m.PetModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
