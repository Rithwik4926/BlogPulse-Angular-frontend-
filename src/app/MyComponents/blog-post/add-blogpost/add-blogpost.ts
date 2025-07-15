import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../../../shared/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogPostService } from '../../../shared/blogpost.services';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../../shared/category.service';
import { Category } from '../../../shared/category-model';
import { ImageSelector } from "../../shared/image-selector/image-selector";
import { ImageService } from '../../shared/image-selector/image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-blogpost',
  imports: [FormsModule, CommonModule, MarkdownModule, ImageSelector],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.css'
})
export class AddBlogpost implements OnInit, OnDestroy{
  isImageSelectorVisible: boolean = false;

  model: AddBlogPost;
  categories: Category[] | undefined;

  imageSelectorSubscription?: Subscription;

  constructor(
    private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService,
  ){
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: [],
    }
  }
  ngOnInit(): void {
    this.categoryService.getAllCategories()
    .subscribe({
      next: (response) => {
        this.categories = response;
      }
    });

    this.imageSelectorSubscription = this.imageService.onSelectImage()
    .subscribe({
      next: (selectedImage) => {
        this.model.featuredImageUrl = selectedImage.url;
        this.closeImageSelector();
      }
    });
  }
  
  onSubmit(): void{
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }
  
  openImageSelector(): void{
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void{
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
}
