import { Injectable } from "@angular/core";
import { AddBlogPost } from "./add-blog-post.model";
import { Observable } from "rxjs";
import { BlogPost } from "./blog-post.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { UpdateBlogPostRequest } from "./update-blogpost-request-model";

@Injectable({
    providedIn: 'root'
})

export class BlogPostService{

    constructor(private http: HttpClient){ }

    createBlogPost(data: AddBlogPost): Observable<BlogPost> {
        return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts?addAuth=true`, data);
    }

    getAllBlogPosts(): Observable<BlogPost[]> {
        return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/BlogPosts`);
    }

    getBlogPostById(id: string): Observable<BlogPost>{
        return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/${id}`);
    }

    getBlogPostByUrlHandle(urlHandle: string): Observable<BlogPost>{
        return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/${urlHandle}`);
    }

    updateBlogPost(id: string, updatedBlogPost: UpdateBlogPostRequest): Observable<BlogPost>{
        return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/${id}?addAuth=true`, updatedBlogPost);
    }

    deleteBlogPost(id: string): Observable<BlogPost>{
        return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/${id}?addAuth=true`);
    }
}