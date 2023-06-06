import { Component, OnInit  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/Employee';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  id: number = 0;
  public employeeForm :any = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    age: new FormControl(''),
    sex: new FormControl(''),
    address: new FormControl(''),
    date: new FormControl(''),
    avatar: new FormControl('')
  });
  employee: any;

  constructor(private employeeService: EmployeesService,
    private router : Router,
    private myroute: ActivatedRoute){}

  ngOnInit(): void{

    const idParam = this.myroute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    console.log('id = ', this.id);
    if(this.id>0){
      this.loadData(this.id);
    }
  }

  public onSubmit(){
    var employee: Employee = {
      name: this.employeeForm.get('name')?.value,
      age: this.employeeForm.get('age')?.value,
      sex: this.employeeForm.get('sex')?.value,
      address: this.employeeForm.get('address')?.value,
      id: '',
      salary: 0,
      avatar: this.employeeForm.get('avatar').value.replace('C:\\fakepath\\', './assets/images/'),
      birthdate: new Date(2000,1,1),
      date: new Date().toLocaleDateString()
    };

    if(this.id>0){
      this.employeeService.updateEmployee(this.id,employee as Employee).subscribe( (data) => {
        console.log('Cap nhat nhan vien' + data);
        this.router.navigate(['employees']);
      });
    } else {
      this.employeeService.addEmployee(employee as Employee).subscribe( (data) => {
        console.log('Them nhan vien moi' + data);
        this.router.navigate(['employees']);
      });
    }


  }

  private loadData(id: number){
    console.log('load data', id);
    this.employeeService.getEmployeesById(id).subscribe((data)=> {
      console.log('get employee: ', data);

      for(const control in this.employeeForm.controls){
        if(control){
          this.employeeForm.controls[control].setValue(data[control]);
        }
      }
    });
  }

selectedFile: File | null | undefined;

fileUrl: string = '';

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  // const fakePath = 'C:\\fakepath\\';
  // this.fileUrl = this.fileName.replace(fakePath, './assets/images/');
}


}
