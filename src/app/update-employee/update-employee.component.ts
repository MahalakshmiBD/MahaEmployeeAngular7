import { Component, OnInit } from '@angular/core';
import { HttpClientService,Employee } from '../service/http-client.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  readForm: FormGroup;
  submitted = false;
  submittedUpdate = false;
  employeePresent = false;
  user: Employee;
  submittedId : String;
  message : string;
  dobPattern =/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  constructor(
    private httpClientService: HttpClientService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.readForm = this.formBuilder.group({
      empId: ['', Validators.required,]});
  }

  readEmployee(): void {
    this.submitted =true;
    if (this.readForm.invalid) {      
      return;
    }else{      
    this.submittedId = (<HTMLInputElement>document.getElementById('empId')).value;
    this.httpClientService.readEmployee(this.submittedId)
        .subscribe( response =>this.handleSuccessfulResponse(response), );
    }
  }

  handleSuccessfulResponse(response)
  {
    this.user=response;
    if (this.user.firstName !=null && this.user.id != 0){
      this.employeePresent = true;
      this.employeeForm = this.formBuilder.group({
        firstName: [this.user.firstName, Validators.required,],
        surname: [this.user.surname, Validators.required],
        email: [this.user.email, Validators.email, ],
        dob: [this.user.dob, [Validators.required,Validators.pattern(this.dobPattern),this.dateValidator]],
        gender: [this.user.gender, Validators.required]})
    }else if(this.user.id == 0){
      this.employeePresent = false;
      this.message = this.user.message;
    }else{
     this.employeePresent = false;
     this.message = this.user.message +" "+this.user.id; 
    }  
  }

  updateEmployee(): void {     
    this.submittedUpdate =true;    
  if (this.employeeForm.invalid) {      
    return;
  }else{ 
    const updatedEmp : Employee= {
      id :0,
      firstName : this.employeeForm.controls.firstName.value,
      surname : this.employeeForm.controls.surname.value,
      email : this.employeeForm.controls.email.value,
      dob : this.employeeForm.controls.dob.value,
      gender : this.employeeForm.controls.gender.value,
      message : ""
    }
    this.submittedId = (<HTMLInputElement>document.getElementById('empId')).value;
    this.httpClientService.updateEmployee(this.submittedId,updatedEmp)
      .subscribe( response =>this.handleSuccessfulUpdateResponse(response), );
  }
}

handleSuccessfulUpdateResponse(response)
  {
    this.user = response;
    this.message = this.user.message+" for Employee ID "+this.user.id; 
    this.employeeForm.reset();
    this.readForm.reset();
    this.employeePresent =false;
    this.submitted =false;
    this.submittedUpdate = false;
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