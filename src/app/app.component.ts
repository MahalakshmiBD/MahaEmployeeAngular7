import { Component } from '@angular/core';
import * as moment from 'moment'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Maintainance';
  navLinks = [
    { path:'createEmployee', label: 'Create'},
    { path:'readEmployee', label: 'Read'},
    { path:'updateEmployee', label: 'Update'},
    { path:'deleteEmployee', label: 'Delete'},
  ];
}

