import { Component, OnInit } from '@angular/core';
import { HttpClientService, Employee } from '../service/http-client.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms'; 
import { DatePipe } from '@angular/common';



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
  dobPattern =/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  
  

  constructor(
    private httpClientService: HttpClientService ,
    private formBuilder: FormBuilder  

  ) { } 

  
  
  

  ngOnInit() {  
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required,],
      surname: ['', Validators.required],
      email: ['', Validators.email, ],
      dob: ['', [Validators.required,Validators.pattern(this.dobPattern),this.dateValidator]],
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
    if(this.user.id !=0 ){
      this.message = this.user.message+" with Employee ID "+this.user.id;
    }else{
      this.message = this.user.message;
    }
  }  

  dateValidator(control : AbstractControl) :{ [key: string]: boolean }  {     
    var dateString = control.value;
    var myDate = new Date(dateString);
    var today = new Date(); 
    if ( myDate > today ) 
      return { "incorrectDob": true };    
    return  null;
  } 

  }
