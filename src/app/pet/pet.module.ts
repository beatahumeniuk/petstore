import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetFormComponent } from './pages/pet-form/pet-form.component';
import {SharedModule} from "../shared/shared.module";
import {PetRoutingModule} from "./pet-routing.module";
import { TableComponent } from './controls/table/table.component';
import { FormComponent } from './controls/form/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [PetFormComponent, TableComponent, FormComponent],
  imports: [
    CommonModule,
    PetRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PetModule { }
