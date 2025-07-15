import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageService } from './image.service';
import { BlogImage } from '../models/blog-image-model';

@Component({
  selector: 'app-image-selector',
  imports: [FormsModule],
  templateUrl: './image-selector.html',
  styleUrl: './image-selector.css'
})
export class ImageSelector implements OnInit {
  private file?: File;
  fileName: string = '';
  title: string = '';
  images: BlogImage[] | undefined;

  @ViewChild('form', {static: false}) imageUploadForm?: NgForm;

  constructor(private imageService: ImageService){}
  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(event: Event): void{
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void{
    if(this.file && this.fileName != '' && this.title != ''){
      //Image service to upload the image
      this.imageService.uploadImage(this.file, this.fileName, this.title)
      .subscribe({
        next: (response) => {
          this.imageUploadForm?.resetForm();
          this.getImages();
        }
      });
    }
  }

  selectImage(image: BlogImage): void{
    this.imageService.selectImage(image);
  }

  private getImages(){
    this.imageService.getAllImages()
    .subscribe({
      next: (response) => {
        this.images = response;
      }
    });
  }
}
