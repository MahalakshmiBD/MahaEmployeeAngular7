import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

export class Employee{
  constructor(
    public id:Number,
    public firstName:string,
    public surname:string,
    public email:string,
    public dob:Date,
    public gender:string,
    public message:string,
  ) 
  {
    
  }
  
}



@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient:HttpClient   
  ) { }

  public getEmployees()
  {
    console.log("test call");
    return this.httpClient.get<Employee>('http://127.0.0.1:7376/employees');
  }

  public deleteEmployee(id) {
    return this.httpClient.delete<Employee>("http://127.0.0.1:7376/deleteEmployee" + "/"+ id);
  }

  public createEmployee(employee) {
    return this.httpClient.post<Employee>("http://127.0.0.1:7376/createEmployee", employee);
  }

  public updateEmployee(id,employee) {
    return this.httpClient.put<Employee>("http://127.0.0.1:7376/updateEmployee"+ "/"+ id, employee);
  }

  public readEmployee(id) {
    return this.httpClient.get<Employee>("http://127.0.0.1:7376/readEmployee" + "/"+ id);
  }


}
