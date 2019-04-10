import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee/employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ReadEmployeeComponent } from './read-employee/read-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';

const routes: Routes = [  { path:'employee', component: EmployeeComponent},
{ path:'createEmployee', component: CreateEmployeeComponent},
{ path:'readEmployee', component: ReadEmployeeComponent},
{ path:'updateEmployee', component: UpdateEmployeeComponent},
{ path:'deleteEmployee', component: DeleteEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
