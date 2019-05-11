import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/Models/employee';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  mostrar: boolean;

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form: NgForm) {
      console.log(form.value);
      this.employeeService.postEmployee(form.value)
        .subscribe(res => {
          console.log(res);
          this.resetForm(form);
          M.toast({ html: 'Save Successfully' });
          this.getEmployees();
        });
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(res => {
        this.employeeService.employees = res as Employee[];
        console.log(res);
      });
  }

  // tslint:disable-next-line: max-line-length
  editEmployee(_id: HTMLInputElement, name: HTMLInputElement, position: HTMLInputElement, office: HTMLInputElement, salary: HTMLInputElement, employee: Employee) {
    this.employeeService.selectedEmployee = employee;
    _id.value = this.employeeService.selectedEmployee._id.toString();
    name.value = this.employeeService.selectedEmployee.name.toString();
    position.value = this.employeeService.selectedEmployee.position.toString();
    office.value = this.employeeService.selectedEmployee.office.toString();
    salary.value = this.employeeService.selectedEmployee.salary.toString();
  }

  Edit(form: NgForm) {
    if (form.value._id) {
      this.employeeService.putEmployee(form.value)
        .subscribe(res => {
          console.log(res);
          this.resetForm(form);
          M.toast({ html: 'Updated Successfully' });
          this.getEmployees();
        });
  }
}

  deleteEmployee(_id: string) {
    if (confirm('Are you sure, Your want you delete it')) {
      this.employeeService.deleteEmployee(_id)
        .subscribe(res => {
          console.log(res);
          M.toast({ html: 'Deleted Successfully' });
          this.getEmployees();
        });
    }


  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

}
