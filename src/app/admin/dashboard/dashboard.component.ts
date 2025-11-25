import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

interface Post {
  _id?: string;
  postId?: string;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  API = "https://ajaz-backend.onrender.com";

  posts: Post[] = [];

  // ADD FORM
  newPost: Post = { title: '', description: '', image: '' };
  newImageFile: File | null = null;
  newImagePreview: any = null;

  // EDIT FORM
  editingPost: Post | null = null;
  editImageFile: File | null = null;
  editImagePreview: any = null;
// Add flags at the top of the component
loadingPosts = false;
addingPost = false;
updatingPost = false;
deletingPostId: string | null = null;

  ngOnInit() {
    this.getPosts();
  }

  // GET ALL POSTS
getPosts() {
  this.loadingPosts = true;
  this.http.get<any>(`${this.API}/get-posts`).subscribe({
    next: (res) => {
      this.posts = res.data.map((post: { image: any; }) => ({
        ...post,
        image: post.image || ''
      }));
      this.loadingPosts = false;
    },
    error: () => {
      this.toastr.error("Failed to load posts");
      this.loadingPosts = false;
    }
  });
}

  // IMAGE PREVIEW – ADD
  onNewFileSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.newImageFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => this.newImagePreview = e.target.result;
    reader.readAsDataURL(file);
  }

  // IMAGE PREVIEW – EDIT
  onEditFileSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.editImageFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => this.editImagePreview = e.target.result;
    reader.readAsDataURL(file);
  }

  // ADD POST
addPost() {
  if (!this.newPost.title || !this.newPost.description) {
    this.toastr.error("Please fill all fields");
    return;
  }

  this.addingPost = true;

  const form = new FormData();
  form.append("title", this.newPost.title);
  form.append("description", this.newPost.description);
  if (this.newImageFile) form.append("image", this.newImageFile);

  this.http.post(`${this.API}/create-post`, form).subscribe({
    next: () => {
      this.toastr.success("Post added!");
      this.getPosts();
      this.newPost = { title: '', description: '', image: '' };
      this.newImageFile = null;
      this.newImagePreview = null;
      this.addingPost = false;
    },
    error: () => {
      this.toastr.error("Failed to add post");
      this.addingPost = false;
    }
  });
}


  // SELECT POST FOR EDIT
selectPost(post: Post) {
  this.editingPost = { ...post };
  this.editImagePreview = post.image ? `${this.API}/uploads/${post.image}` : null;
}

  // UPDATE POST
updatePost() {
  if (!this.editingPost) return;

  this.updatingPost = true;

  const form = new FormData();
  form.append("postId", this.editingPost.postId!);
  form.append("title", this.editingPost.title);
  form.append("description", this.editingPost.description);
  if (this.editImageFile) form.append("image", this.editImageFile);

  this.http.post(`${this.API}/update-post`, form).subscribe({
    next: () => {
      this.toastr.success("Post updated!");
      this.getPosts();
      this.editingPost = null;
      this.editImageFile = null;
      this.editImagePreview = null;
      this.updatingPost = false;
    },
    error: (err) => {
      console.error("Update failed", err);
      this.toastr.error("Failed to update post");
      this.updatingPost = false;
    }
  });
}

  // DELETE POST
deletePost(post: Post) {
  this.deletingPostId = post.postId!;

  this.http.request('post', `${this.API}/delete-post`, { body: { postId: post.postId } }).subscribe({
    next: () => {
      this.toastr.success("Post deleted");
      this.getPosts();
      this.deletingPostId = null;
    },
    error: () => {
      this.toastr.error("Failed to delete post");
      this.deletingPostId = null;
    }
  });
}
  cancelEdit() {
    this.editingPost = null;
    this.editImageFile = null;
    this.editImagePreview = null;
  }

  logout() {
    localStorage.removeItem("loggedIn");
    this.router.navigate(['/']);
  }
}
