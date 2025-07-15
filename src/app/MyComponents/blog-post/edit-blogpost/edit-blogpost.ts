import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogPostService } from '../../../shared/blogpost.services';
import { BlogPost } from '../../../shared/blog-post.model';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../shared/category.service';
import { Category } from '../../../shared/category-model';
import { UpdateBlogPostRequest } from '../../../shared/update-blogpost-request-model';
import { ImageSelector } from "../../shared/image-selector/image-selector";
import { ImageService } from '../../shared/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  imports: [FormsModule, MarkdownModule, CommonModule, ImageSelector],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.css',
})
export class EditBlogpost implements OnInit, OnDestroy {
  id: string | null = null;
  blogpost: BlogPost | undefined;
  categories: Category[] | undefined;
  selectedCategories: string[] | undefined;

  isImageSelectorVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router: Router,
    private imageService: ImageService,
  ) {}

  paramsSubscription: Subscription | undefined;
  updateBlogPostSubscription: Subscription | undefined;
  getBlogPostSubscription: Subscription | undefined;
  deleteBlogPostSubscription: Subscription | undefined;
  imageSelectSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
      }
    });


    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.blogpost = response;
              this.selectedCategories = response.categories.map(x => x.id)
            },
          });
        }

        this.imageSelectSubscription = this.imageService.onSelectImage()
        .subscribe({
          next: (response) => {
            if(this.blogpost){
              this.blogpost.featuredImageUrl = response.url;
              this.isImageSelectorVisible = false;
            }
          }
        });
      },
    });
  }

  onSubmit(): void {
    //convert this model to request object
    if(this.blogpost && this.id){
      var updateBlogPost: UpdateBlogPostRequest = {
        author: this.blogpost.author,
        content: this.blogpost.content,
        shortDescription: this.blogpost.shortDescription,
        featuredImageUrl: this.blogpost.featuredImageUrl,
        isVisible: this.blogpost.isVisible,
        publishedDate: this.blogpost.publishedDate,
        title: this.blogpost.title,
        urlHandle: this.blogpost.urlHandle,
        categories: this.selectedCategories ?? [],
      };

      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }
  }

  onDelete(): void {
    if(this.id){
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }
  }

  openImageSelector(): void{
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void{
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
