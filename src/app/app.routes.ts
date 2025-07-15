import { Routes } from '@angular/router';
import { authGuard } from './shared/auth/guards/auth-guard';

export const routes: Routes = [
    {path: '', canActivate: [authGuard], loadComponent: () => import('./MyComponents/home/home').then(m => m.Home)},
    {path: 'blog/:url', loadComponent: () => import('./MyComponents/blog-details/blog-details').then(m => m.BlogDetails)},
    {path: 'login', loadComponent: () => import('./MyComponents/auth/login/login').then(m => m.Login)},
    {path: 'signup', loadComponent: () => import('./MyComponents/auth/signup/signup').then(m => m.Signup) },
    {path: 'admin/categories',canActivate: [authGuard], loadComponent: () => import('./MyComponents/category/category-list/category-list').then(m => m.CategoryList)},
    {path: 'admin/categories/add',canActivate: [authGuard], loadComponent: () => import('./MyComponents/category/add-category/add-category').then(m => m.AddCategory)},
    {path: 'admin/categories/:id',canActivate: [authGuard], loadComponent: () => import('./MyComponents/category/edit-category/edit-category').then(m => m.EditCategory)},
    {path: 'admin/blogposts',canActivate: [authGuard], loadComponent: () => import('./MyComponents/blog-post/blogpost-list/blogpost-list').then(m => m.BlogpostList)},
    {path: 'admin/blogposts/add',canActivate: [authGuard], loadComponent: () => import('./MyComponents/blog-post/add-blogpost/add-blogpost').then(m => m.AddBlogpost)},
    {path: 'admin/blogposts/:id',canActivate: [authGuard], loadComponent: () => import('./MyComponents/blog-post/edit-blogpost/edit-blogpost').then(m => m.EditBlogpost)},

];
