import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeService} from '../../../service/employee/employee.service';
import {Subscription} from 'rxjs';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeDTO} from '../../../model/employee/employee-dto';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {checkDateOfBirth} from '../../../validator/checkDateOfBirth';


@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required,
        Validators.maxLength(40), Validators.minLength(6),
        Validators.pattern('^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+)*$')]),
      email: new FormControl('',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_!#$%&\'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+.[a-z]{2,6}$')]),
      phoneNumber: new FormControl('',
        [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
      address: new FormControl('',
        [Validators.required, Validators.pattern('')]),
      dateOfBirth: new FormControl('', [Validators.required, checkDateOfBirth]),
      idCard: new FormControl('', [Validators.required,
        Validators.pattern('^\\d{9}$|\\d{12}$')]),
      gender: new FormControl(0),
      roleDTO: new FormControl(2),
      image: new FormControl(''),
    }
  );

  subscription: Subscription;
  employee: EmployeeDTO;
  validateErrorEmail: string;
  selectedImage: any = null;
  loading = false;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private dialog: MatDialog,
              @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    // this.subscription = this.positionService.getAllPosition().subscribe(data => {
    //   this.positions = data;
    //   console.log(this.positions);
    // }, error => {
    //   console.log('abc');
    // });
    // this.subscription = this.degreeService.getAllDegree().subscribe(data => {
    //   this.degrees = data;
    //   console.log(this.degrees);
    // }, error => {
    //   console.log('bcd');
    // });
    if (this.employeeForm.valid) {
      this.subscription = this.employeeService.save(this.employeeForm.value).subscribe(data => {
        this.employee = data;
      }, error => {
        console.log('cuộc sống khó khắn');
      });
    }
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
    this.loading = true;
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.employeeForm.patchValue({image: url});

          // Call API to create employee
          console.log(this.employeeForm.value)
          this.employeeService.save(this.employeeForm.value).subscribe(() => {
            this.router.navigateByUrl('/employee/list').then(r => console.log('Thêm mới thành công!'));
          })
        });
      })
    ).subscribe();
    // this.loading = true;
  }

  onClear() {
    this.employeeForm.reset();
  };

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
  }
}

