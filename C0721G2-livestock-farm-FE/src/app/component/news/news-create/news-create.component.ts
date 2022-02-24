import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {NewsService} from '../../../service/news/news.service';
import {Router} from '@angular/router';
import {TypeOfNews} from '../../../model/news/type-of-news';

import {AngularFireStorage} from '@angular/fire/storage';
import {Observable, Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {NewsDTO} from '../../../model/news/news-dto';
import {TypeOfServerService} from '../../../service/news/type-of-news.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {TokenStorageService} from "../../../service/security/token-storage.service";
import {Employee} from "../../../model/employee/employee";


@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {
  // formCreateNews = new FormGroup({
  //   title: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(300)]),
  //   content: new FormControl('', [Validators.required]),
  //   typeOfNewsDTO: new FormControl(null, [Validators.required]),
  //   image: new FormControl('',),
  //   employee: new FormControl()
  // });
  formCreateNews: FormGroup;
  listNews: NewsDTO;
  flag: false;
  selectedImage: any = null;
  typeOfNewss: TypeOfNews[];
  subscription: Subscription;
  public Editor = ClassicEditor;
  employeeId: string;
  loading = false;


  constructor(private newsService: NewsService,
              private router: Router,
              private typeOfNewsService: TypeOfServerService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private token: TokenStorageService,
              private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.employeeId = this.token.getUser().idCustomer;
    console.log(this.token.getUser().idCustomer);
    this.formCreateNews = this.fb.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      typeOfNewsDTO: new FormControl(null, [Validators.required]),
      image: new FormControl(''),
      employeeId: new FormControl(this.employeeId)
    });


    this.subscription = this.typeOfNewsService.getAllType().subscribe(data => {
        this.typeOfNewss = data;
        console.log(this.typeOfNewss)
      },
      error => {
        console.log('có lỗi tại type of news')
      });
    // if (this.formCreateNews.valid) {
    //   this.subscription = this.newsService.save(this.formCreateNews.value).subscribe(data => {
    //     this.listNews = data;
    //   }, error => {
    //     console.log('cuộc sống khó khắn');
    //   });
    // }
  }

  get title() {
    return this.formCreateNews.get('title')
  }

  get content() {
    return this.formCreateNews.get('content')
  }

  get typeOfNews() {
    return this.formCreateNews.get('typeOfNewsDTO')
  }

  get image() {
    return this.formCreateNews.get('image')
  }

  onSubmit() {
    const nameImg = this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);

    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.formCreateNews.patchValue({image: url});

          // Thêm mới
          console.log(this.formCreateNews.value);
          if (this.formCreateNews.valid) {
            // this.typeOfNewss.forEach(value => {
            //   console.log(value);
            //   if (this.formCreateNews.value.typeOfNews === value.id) {
            //     this.formCreateNews.value.typeOfNews = value;
            //   }
            // });
            console.log(this.formCreateNews);
            this.subscription = this.newsService.save(this.formCreateNews.value).subscribe(data => {
                console.log(this.listNews);
                this.router.navigate(['/news/list']);
              }
              , error => {
                console.log('Có lỗi');
              });
          }
        });
      })
    ).subscribe();
    this.loading = true;
  }


  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }


  onClear() {
    this.formCreateNews.reset();
  }
}
