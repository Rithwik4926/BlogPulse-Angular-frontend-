import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../shared/blogpost.services';
import { BlogPost } from '../../shared/blog-post.model';
import { DatePipe } from '@angular/common';
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: 'app-blog-details',
  imports: [DatePipe, MarkdownComponent],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css'
})
export class BlogDetails implements OnInit{

  url: string | null = null;
  blogpost: BlogPost | undefined; 

  constructor(private route: ActivatedRoute,
    private blogpostService: BlogPostService,
  ){}

  ngOnInit(): void {
    this.route.paramMap
    .subscribe({
      next: (params) => {
        this.url = params.get('url');
      }
    });
    
    //fetch blog details by url
    if(this.url){
      this.blogpostService.getBlogPostByUrlHandle(this.url)
      .subscribe({
        next: (response) => {
          this.blogpost = response;
        }
      });
    }

  }
}
