import { Component, OnInit } from '@angular/core';
import { HttpClientService, Employee } from '../service/http-client.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';



@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']  
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  submitted = false;
  user: Employee;
  message : String;

  constructor(
    private httpClientService: HttpClientService ,
    private formBuilder: FormBuilder
  ) { } 

    

  ngOnInit() {    
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required,],
      surname: ['', Validators.required],
      email: ['', Validators.email, ],
      dob: ['', Validators.required,],
      gender: ['', Validators.required]})
  }

  // convenience getter for easy access to form fields
  get f() { return this.employeeForm.controls; }

  createEmployee(): void {    
    this.submitted = true;    
    if (this.employeeForm.invalid) {      
      return;
    }else{  
      const employee : Employee= {
        id :0,
        firstName : this.employeeForm.controls.firstName.value,
        surname : this.employeeForm.controls.surname.value,
        email : this.employeeForm.controls.email.value,
        dob : this.employeeForm.controls.dob.value,
        gender : this.employeeForm.controls.gender.value,
        message : ""
      }
      this.httpClientService.createEmployee(employee)
      .subscribe( response =>this.handleSuccessfulResponse(response), );
      //alert(this.user.message+" for Employee ID "+this.user.id);
      this.employeeForm.reset();
      this.submitted =false;
    }   

  }

  handleSuccessfulResponse(response)
  {
   this.user=response;
   this.message = this.user.message+" with Employee ID "+this.user.id;
  }  

  dateValidator(control : AbstractControl) :{ [key: string]: boolean }  {
    let datePattern = /^\[0-9]{2}\/\[0-9]{2}\/[0-9]{4}$/; 
    if (!control.value.match(datePattern))
      return { "datePattern": true };    
    return  { "datePattern": false };
  } 

  }

