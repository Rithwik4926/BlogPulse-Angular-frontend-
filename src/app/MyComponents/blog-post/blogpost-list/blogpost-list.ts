import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../../../shared/blogpost.services';
import { BlogPost } from '../../../shared/blog-post.model';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterLink],
  templateUrl: './blogpost-list.html',
  styleUrl: './blogpost-list.css'
})
export class BlogpostList implements OnInit{
  blogPosts: BlogPost[] | undefined;
  constructor(private blogPostService: BlogPostService){}

  ngOnInit(): void {
    //get all blogPosts from api
    this.blogPostService.getAllBlogPosts()
    .subscribe({
      next: (response) => {
        this.blogPosts = response;
      }
    });
  }

}
