import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/shared/upload.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UploadComponent],
  exports: [UploadComponent],
  providers: [UploadService]
})
export class UploadModule { }
