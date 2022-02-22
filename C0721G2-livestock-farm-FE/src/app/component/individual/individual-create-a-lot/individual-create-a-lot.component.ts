import {Component, OnInit} from '@angular/core';
import {IndividualService} from '../../../service/individual/individual.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-individual-create-a-lot',
  templateUrl: './individual-create-a-lot.component.html',
  styleUrls: ['./individual-create-a-lot.component.css']
})
export class IndividualCreateALotComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  message: string;

  constructor(private individualService: IndividualService,
              public dialogRef: MatDialogRef<IndividualCreateALotComponent>) {
  }

  ngOnInit(): void {
  }

  // cái này của Hiền
  submitFile() {
    this.currentFile = this.selectedFiles.item(0);
    const formData = new FormData();
    formData.append('file', this.currentFile);
    this.individualService.uploadFileIndividual(formData).subscribe(value => {
        this.message = 'Thêm thành công!';
        this.dialogRef.close(this.message);
      }, error => {
        console.log(error);
      }
    );
  }

  // cái này của Hiền
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.selectedFiles = event.target.files;
    }
  }
}
