import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../shared/category.service';
import { Category } from '../../../shared/category-model';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit {
  categories: Category[] | undefined;
  constructor(private categoryService: CategoryService) {}
  totalCount?: number;
  pageNumber = 1;
  pageSize = 5;
  list: number[] = [];

  ngOnInit(): void {
    this.categoryService.getCategoryCount().subscribe({
      next: (value) => {
        this.totalCount = value;
        this.list = new Array(Math.ceil(value / this.pageSize));

        this.categoryService
          .getAllCategories(
            undefined,
            undefined,
            undefined,
            this.pageNumber,
            this.pageSize
          )
          .subscribe({
            next: (response) => {
              this.categories = response;
            },
          });
      },
    });
  }

  //FOR ASYNC PIPES METHOD
  //  categories$: Observable<Category[]> | undefined;

  //  ngOnInit(): void {
  //    this.categories$ = this.categoryService.getAllCategories();
  //  }

  onSearch(query: string) {
    this.categoryService.getAllCategories(query).subscribe({
      next: (response) => {
        this.categories = response;
      },
    });
  }

  sort(sortBy: string, sortDirection: string) {
    this.categoryService
      .getAllCategories(undefined, sortBy, sortDirection)
      .subscribe({
        next: (response) => {
          this.categories = response;
        },
      });
  }

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber
    this.categoryService
      .getAllCategories(
        undefined,
        undefined,
        undefined,
        this.pageNumber,
        this.pageSize
      )
      .subscribe({
        next: (response) => {
          this.categories = response;
        },
      });
  }

  getNext(){
    if(this.pageNumber + 1 > this.list.length){
      return;
    }

    this.pageNumber += 1;
    this.categoryService
      .getAllCategories(
        undefined,
        undefined,
        undefined,
        this.pageNumber,
        this.pageSize
      )
      .subscribe({
        next: (response) => {
          this.categories = response;
        },
      });
  }

  getPrevious(){
    if(this.pageNumber - 1 < 1){
      return;
    }

    this.pageNumber -= 1;
    this.categoryService
      .getAllCategories(
        undefined,
        undefined,
        undefined,
        this.pageNumber,
        this.pageSize
      )
      .subscribe({
        next: (response) => {
          this.categories = response;
        },
      });
  }
}
