import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NewsDTO} from '../../../model/news/news-dto';
import {TypeOfNews} from '../../../model/news/type-of-news';
import {NewsService} from '../../../service/news/news.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TypeOfServerService} from '../../../service/news/type-of-news.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  formNewsEdit: FormGroup;
  id: string;
  subscription: Subscription;
  newsDTO: NewsDTO;
  typeOfNewss: TypeOfNews[];
  selectedImage: any = null;
  public Editor = ClassicEditor;


  constructor(private newsService: NewsService,
              private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private typeOfNewsService: TypeOfServerService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.formNewsEdit = this.fb.group({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      typeOfNewsDTO: new FormControl(null, [Validators.required]),
      image: new FormControl('')
    });
    this.subscription = this.typeOfNewsService.getAllType().subscribe(data => {
        this.typeOfNewss = data;
        //   console.log(this.typeOfNewss)
      },
      error => {
        console.log('có lỗi tại type of news')
      });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {

      this.id = paramMap.get('id');
      console.log(this.id)
    });
    this.newsService.findById(this.id).subscribe(data => {
      this.newsDTO = data;
      console.log(this.id);
      console.log(this.newsDTO);
      console.log(this.formNewsEdit.value);
      this.formNewsEdit.patchValue(this.newsDTO);
      console.log(this.formNewsEdit.value);
      console.log(this.id);
      console.log('Tạ ơn mọi người');
    }, error => {
      console.log('cuộc sống khó khắn');
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  get title() {
    return this.formNewsEdit.get('title')
  }

  get content() {
    return this.formNewsEdit.get('content')
  }

  get typeOfNews() {
    return this.formNewsEdit.get('typeOfNewsDTO')
  }

  get image() {
    return this.formNewsEdit.get('image')
  }

  onSubmit() {
    const nameImg = this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.formNewsEdit.patchValue({image: url});

          this.subscription = this.newsService.updateNews(this.id, this.formNewsEdit.value).subscribe(data => {
            // alert('Chỉnh sửa thông tin thành công');
            this.router.navigate(['/news/detail',this.id]);
            console.log(this.formNewsEdit);
          }, error => {
            console.log('có lỗi đại ca ơi');
          });
        });
      })
    ).subscribe();
  }

  // onSubmit() {
  //   this.subscription = this.newsService.updateNews(this.id, this.formNewsEdit.value).subscribe(data => {
  //     // alert('Chỉnh sửa thông tin thành công');
  //     this.router.navigate(['/news/list']);
  //     console.log(this.formNewsEdit);
  //   }, error => {
  //     console.log('có lỗi đại ca ơi');
  //   });
  // }
  onClear() {
    this.formNewsEdit.reset();
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }
}
