import { Component, OnInit } from '@angular/core';
import { HttpClientService,Employee } from '../service/http-client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  readForm: FormGroup;
  submitted = false;
  user: Employee;
  submittedId : String;
  employeePresent = false;
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
   if (this.user.firstName !=null){
    this.employeePresent = true;
   }else{
    this.employeePresent = false;
    this.message = this.user.message +" "+this.user.id; 
   }
  }

  deleteEmployee(): void {
    let id = (<HTMLInputElement>document.getElementById('id')).value;
    this.httpClientService.deleteEmployee(id)
      .subscribe(response =>this.handleSuccessfuldeleteResponse(response), );
      
    }
    handleSuccessfuldeleteResponse(response)
    {
      this.user = response;
      this.message = this.user.message+" for Employee ID "+this.user.id; 
      this.readForm.reset();
      this.employeePresent = false;
      this.submitted =false;
    } 
}