import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../shared/blogpost.services';
import { BlogPost } from '../../shared/blog-post.model';
import { RouterModule } from '@angular/router';
import { User } from '../../shared/auth/user.model';
import { AuthService } from '../../shared/auth/auth.services';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  blogs?: BlogPost[];

  constructor(private blogPostService: BlogPostService,
    authService: AuthService
  ){}

  ngOnInit(): void {
    this.blogPostService.getAllBlogPosts()
    .subscribe({
      next: (response) => {
        this.blogs = response;
      }
    });
  }
}
