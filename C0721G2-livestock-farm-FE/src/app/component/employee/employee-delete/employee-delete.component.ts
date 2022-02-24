import {Component, Inject, OnInit} from '@angular/core';
import {Employee} from '../../../model/employee/employee';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EmployeeService} from '../../../service/employee/employee.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  employee: Employee;

  constructor(public dialogRef: MatDialogRef<EmployeeDeleteComponent>,
              public  employeeService: EmployeeService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    employeeService.findEmployeeById(data).subscribe(
      value => {
        console.log(value)
        this.employee = value;
      }
    )
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    console.log(this.data);
    this.employeeService.deleteEmployee(this.data).subscribe(data => {
      this.employee = data;
      this.dialogRef.close({event: true});
    });
  }
}
