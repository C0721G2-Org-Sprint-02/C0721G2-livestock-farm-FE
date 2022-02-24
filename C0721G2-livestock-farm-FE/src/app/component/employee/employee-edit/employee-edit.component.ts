import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {EmployeeDTO} from '../../../model/employee/employee-dto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../../service/employee/employee.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {checkDateOfBirth} from '../../../validator/checkDateOfBirth';

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
  selectedImage: any = null;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
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
      dateOfBirth: this.fb.control('', [Validators.required, checkDateOfBirth]),
      idCard: this.fb.control('',
        [Validators.required, Validators.pattern('^\\d{9}$|\\d{12}$')]),
      gender: this.fb.control('', [Validators.required]),
      roleDTO: this.fb.control('', [Validators.required]),
      image: new FormControl(),
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

  get role() {
    return this.employeeForm.get('roleDTO');
  }


  onSubmit() {
    const nameImg = this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.employeeForm.patchValue({image: url});

          // Call API
          this.employeeService.save(this.employeeForm.value).subscribe(() => {
            this.router.navigateByUrl('/employee/list').then(r => console.log('Chỉnh sửa thông tin thành công!'));
          })
        });
      })
    ).subscribe();
    // console.log(this.employeeForm.value.image);
    // this.subscription = this.employeeService.save(this.employeeForm.value).subscribe(data => {
    //     alert('Chỉnh sửa thông tin thành công!');
    //     console.log(this.employee);
    //     this.router.navigate(['/employee/list']);
    //   }
    //   , error => {
    //     this.validateErrorEmail = error.error.errorEmail;
    //     console.log('Not found');
    //     this.validateErrorEmail = 'Email bạn nhập đã được sử dụng';
    //   });
  }

  onClick() {
    this.employeeForm.reset();
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
  }
}

