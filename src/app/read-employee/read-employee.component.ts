import { Component, OnInit } from '@angular/core';
import { HttpClientService,Employee } from '../service/http-client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-read-employee',
  templateUrl: './read-employee.component.html',
  styleUrls: ['./read-employee.component.css']
})
export class ReadEmployeeComponent implements OnInit {

  readForm: FormGroup;
  submitted = false;
  employeePresent = false;
  user: Employee;
  submittedId : String;
  message : string;

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
     this.message = this.user.message +" for Employee Id "+this.user.id; 
    }else if(this.user.id == 0){
      this.employeePresent = false;
      this.message = this.user.message;
    }
    else{
     this.employeePresent = false;
     this.message = this.user.message +" "+this.user.id; 
    }
   }
  
}
