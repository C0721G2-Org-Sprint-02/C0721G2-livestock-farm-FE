import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {EmployeeDTO} from '../../../model/employee/employee-dto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../../service/employee/employee.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employeeForm: FormGroup;
  id: string;
  subscription: Subscription;
  employee: EmployeeDTO;
  validateErrorEmail: string;
  imgdetect = false;
  imgMess: string;
  urls = new Array<string>();
  selectFiles: FileList;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: new FormControl(''),
      name: this.fb.control('', [Validators.required,
        Validators.pattern('^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+)*$')]),
      email: this.fb.control('', [Validators.required,
        Validators.pattern('^[a-zA-Z0-9_!#$%&\'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+.[a-z]{2,6}$')]),
      phoneNumber: this.fb.control('', [Validators.required,
        Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
      address: this.fb.control('', [Validators.required,
        Validators.pattern('')]),
      dateOfBirth: this.fb.control('', [Validators.required]),
      idCard: this.fb.control('',
        [Validators.required, Validators.pattern('^\\d{9}$|\\d{12}$')]),
      gender: this.fb.control('', [Validators.required]),
      degreeDTO: this.fb.control('', [Validators.required]),
      positionDTO: this.fb.control('', [Validators.required]),
      roleDTO: this.fb.control('', [Validators.required])
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {

      this.id = paramMap.get('id');
    });

    this.employeeService.findEmployeeById(this.id).subscribe(data => {
      this.employee = data;
      console.log(this.employee);
      this.employeeForm.setValue(this.employee);
      console.log('Tạ ơn mọi người');
    }, error => {
      console.log('cuộc sống khó khắn');
    });

  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  get name() {
    return this.employeeForm.get('name');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  get phoneNumber() {
    return this.employeeForm.get('phoneNumber');
  }

  get address() {
    return this.employeeForm.get('address');
  }

  get dateOfBirth() {
    return this.employeeForm.get('dateOfBirth');
  }

  get idCard() {
    return this.employeeForm.get('idCard');
  }

  get gender() {
    return this.employeeForm.get('gender');
  }

  get position_form() {
    return this.employeeForm.get('positionDTO');
  }

  get degree_form() {
    return this.employeeForm.get('degreeDTO');
  }

  get role() {
    return this.employeeForm.get('roleDTO');
  }


  onSubmit() {
    // if (this.employeeForm.valid) {
    this.subscription = this.employeeService.updateEmployee(this.id, this.employeeForm.value).subscribe(data => {
      // alert('Chỉnh sửa thông tin thành công');
      // this.router.navigate(['/employee/list']);
      console.log(this.employeeForm);
    }, error => {
      console.log('có lỗi đại ca ơi');
    });
    // }
  }

  onClick() {
    this.employeeForm.reset();
  }

  submitModal() {
    this.router.navigate(['/employee/list']);
  }

  detectFiles(event) {
    this.imgdetect = true;
    this.imgMess = null;
    if (this.urls.length !== 0) {
      this.urls = new Array<string>();
    }
    if (event.target.files.length > 5) {
      this.imgMess = 'Chỉ được chọn tối đa 5 ảnh';
      this.imgdetect = false;
      return;
    } else if (event.target.files.length === 0) {
      this.imgMess = 'Chọn tối thiểu 1 ảnh';
      this.imgdetect = false;
      return;
    } else {
      const files = event.target.files;
      this.selectFiles = files;
      if (files) {
        for (const file of files) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.urls.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }
}
