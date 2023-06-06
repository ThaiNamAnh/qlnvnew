import { Component } from '@angular/core';
import { Employee } from '../models/Employee';
import { EmployeesService } from '../employees.service';
import { Router } from '@angular/router';
// import { Observable, interval } from 'rxjs';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  public listemployees: Employee[] = [];
  constructor(private employeeService: EmployeesService, private router: Router) {}

  ngOnInit(): void {


    this.employeeService.getEmployees().subscribe( (data)=> {
      console.log(data);
      this.listemployees = data;
    } );
  }

  public getListemployees(){
    this.employeeService.getEmployees().subscribe( (data) => {
      console.log(data);
      this.listemployees = data;
    } )
  }

  public addEmployee() {
    this.router.navigate(['employee-form']);
  }

  public deleteEmployee(id: any){
    console.log('employee id: '+id);
    this.employeeService.deleteEmployee(Number(id)).subscribe( (data)=>{
      console.log('delete: ' +data);
    } )
    this.getListemployees();
  }


  public editEmployee(id: any) {
    this.router.navigate(['employee-form', id]);
  }


}


