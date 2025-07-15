import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequest } from '../../../shared/add-category-request-model';
import { CategoryService } from '../../../shared/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [FormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory implements OnDestroy{

  constructor(private categoryService: CategoryService, private router: Router){}

  private addCategorySubscription?: Subscription;

  addCategoryRequest: AddCategoryRequest = {
    name: '',
    urlHandle: '',
  };

  onFormSubmit() {
    this.addCategorySubscription = this.categoryService.addCategory(this.addCategoryRequest)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/categories');
      }
    })
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
