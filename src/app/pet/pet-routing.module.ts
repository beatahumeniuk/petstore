import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PetFormComponent} from "./pages/pet-form/pet-form.component";

const routes: Routes = [
  {
    path: '',
    component: PetFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetRoutingModule {
}
