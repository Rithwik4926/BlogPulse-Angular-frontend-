import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../shared/category.service';
import { Category } from '../../../shared/category-model';
import { FormsModule } from '@angular/forms';
import { UpdateCategoryRequest } from '../../../shared/update-category-request-model';

@Component({
  selector: 'app-edit-category',
  imports: [FormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory implements OnInit, OnDestroy {
  id : string | null = null;
  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router) {}
  paramsSubscription: Subscription | undefined;
  category?: Category;

  editCategorySubscription?: Subscription;

  
  
  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if(this.id){
          //get category from api for this id
          this.categoryService.getCategoryById(this.id)
          .subscribe({
            next: (response) =>{
              this.category = response;
            }
          });
        }
      },
    });
  }

  onSubmit(): void{
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? '',
    };

    //pass object to service
    if(this.id){
      this.editCategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
  }

  onDelete(): void {
    if(this.id){
      this.categoryService.deleteCategory(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}
