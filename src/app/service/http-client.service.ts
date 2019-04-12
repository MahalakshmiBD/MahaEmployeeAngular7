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
  
  serverRunningPort: String;
  

  constructor(
    private httpClient:HttpClient   
  ) { 
    this.serverRunningPort = "http://127.0.0.1:7376/";
  }


  public getEmployees()
  {
    console.log("test call");
    return this.httpClient.get<Employee>(this.serverRunningPort+"employees");
  }

  public deleteEmployee(id) {
    return this.httpClient.delete<Employee>(this.serverRunningPort+"deleteEmployee" + "/"+ id);
  }

  public createEmployee(employee) {
    return this.httpClient.post<Employee>(this.serverRunningPort+"createEmployee", employee);
  }

  public updateEmployee(id,employee) {
    return this.httpClient.put<Employee>(this.serverRunningPort+"updateEmployee"+ "/"+ id, employee);
  }

  public readEmployee(id) {
    return this.httpClient.get<Employee>(this.serverRunningPort+"readEmployee" + "/"+ id);
  }


}
