import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { EmployeeComponent } from './employee.component';
import { NewemployeeComponent } from './newemployee/newemployee.component';


const routes: Routes = 
[
  {
    path: '', redirectTo: 'emp', pathMatch: 'full'
  },

  {
    path: 'emp',

    children:
      [
        {
          path:'', component: EmployeeComponent,
        },
        {

          path: 'newemp', component: NewemployeeComponent

        },
        {

          path: 'viewemp/:id', component: NewemployeeComponent

        },

        {

          path: 'editemp/:id', component: NewemployeeComponent

        },

      

      ]
  },

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class EmployeeRoutingModule {
  constructor() {
    console.log("Employee Routing Module Loaded...");
  }
}