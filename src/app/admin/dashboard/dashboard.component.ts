import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketService,Post } from '../../services/ticket.service';


interface ContactMessage {
enquiryId: string;
  _id: string;
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
  createdAt: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
apiUrl: string = 'https://ajaz-backend.onrender.com';

  posts: Post[] = [];

  // ADD FORM
  newPost: Post = { title: '', description: '', image: '', url: '' };
  newImageFile: File | null = null;
  newImagePreview: string | null = null;

  // EDIT FORM
  editingPost: Post | null = null;
  editImageFile: File | null = null;
  editImagePreview: string | null = null;

  // LOADERS
  loadingPosts = false;
  addingPost = false;
  updatingPost = false;
  deletingPostId: string | null = null;
contactMessages: ContactMessage[] = [];
loadingContacts = false;
deletingContactId: string | null = null;
  constructor(
    private router: Router,
    private postService: TicketService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.getContactMessages();
  }
getContactMessages() {
  this.loadingContacts = true;

 this.postService.getMessages().subscribe({
    next: (res) => {
      this.contactMessages = res.data;
      this.loadingContacts = false;
    },
    error: () => {
      this.toastr.error("Failed to load contact messages");
      this.loadingContacts = false;
    }
  });
}
deleteContact(id: string) {
  this.deletingContactId = id;

  this.postService.deleteMessage(id).subscribe({
    next: () => {
      this.toastr.success("Message deleted");
      this.getContactMessages();
      this.deletingContactId = null;
    },
    error: (err) => {
      console.error(err);
      this.toastr.error("Failed to delete message");
      this.deletingContactId = null;
    }
  });
}


  // ---------------- GET POSTS ----------------
  getPosts(): void {
    this.loadingPosts = true;

    this.postService.getPosts().subscribe({
      next: (res: any) => {
        this.posts = res.data.map((post: Post) => ({
          ...post,
          image: post.image || ''
        }));
        this.loadingPosts = false;
      },
      error: () => {
        this.toastr.error('Failed to load posts');
        this.loadingPosts = false;
      }
    });
  }

  // ---------------- IMAGE PREVIEW (ADD) ----------------
  onNewFileSelect(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.newImageFile = file;
    const reader = new FileReader();
    reader.onload = (e: any) => this.newImagePreview = e.target.result;
    reader.readAsDataURL(file);
  }

  // ---------------- IMAGE PREVIEW (EDIT) ----------------
  onEditFileSelect(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.editImageFile = file;
    const reader = new FileReader();
    reader.onload = (e: any) => this.editImagePreview = e.target.result;
    reader.readAsDataURL(file);
  }

  // ---------------- ADD POST ----------------
addPost(): void {
  if (!this.newPost.title || !this.newPost.description || !this.newPost.url) {
    this.toastr.error('All fields are required');
    return;
  }

  this.addingPost = true;

  const form = new FormData();
  form.append('title', this.newPost.title);
  form.append('description', this.newPost.description);
  form.append('url', this.newPost.url);

  if (this.newImageFile) {
    form.append('image', this.newImageFile);
  }

  this.postService.createPost(form).subscribe({
    next: (res) => {
      this.toastr.success(res?.message || 'Post added successfully!');
      this.getPosts();
      this.resetAddForm();
      this.addingPost = false;
    },

    error: (err) => {
      console.error('Add Post Error:', err);

      // ✅ Handle known backend error (400)
      if (err.status === 400) {
        this.toastr.error(err.error?.message || 'Duplicate post detected');
      } 
      // ✅ Handle server errors
      else if (err.status === 500) {
        this.toastr.error('Server error. Please try again later.');
      } 
      // ✅ Fallback
      else {
        this.toastr.error('Failed to add post');
      }

      this.addingPost = false;
    }
  });
}



  // ---------------- SELECT POST ----------------
  selectPost(post: Post): void {
    this.editingPost = { ...post };
    this.editImagePreview = post.image
      ? this.postService.getImageUrl(post.image)
      : null;
  }

  // ---------------- UPDATE POST ----------------
  updatePost(): void {
    if (!this.editingPost) return;

    this.updatingPost = true;

    const form = new FormData();
    form.append('postId', this.editingPost.postId!);
    form.append('title', this.editingPost.title);
    form.append('url', this.editingPost.url);
    form.append('description', this.editingPost.description);
    if (this.editImageFile) form.append('image', this.editImageFile);

    this.postService.updatePost(form).subscribe({
      next: () => {
        this.toastr.success('Post updated successfully!');
        this.getPosts();
        this.cancelEdit();
        this.updatingPost = false;
      },
      error: () => {
        this.toastr.error('Failed to update post');
        this.updatingPost = false;
      }
    });
  }

  // ---------------- DELETE POST ----------------
  deletePost(post: Post): void {
    this.deletingPostId = post.postId!;

    this.postService.deletePost(post.postId!).subscribe({
      next: () => {
        this.toastr.success('Post deleted successfully!');
        this.getPosts();
        this.deletingPostId = null;
      },
      error: () => {
        this.toastr.error('Failed to delete post');
        this.deletingPostId = null;
      }
    });
  }

  // ---------------- HELPERS ----------------
  cancelEdit(): void {
    this.editingPost = null;
    this.editImageFile = null;
    this.editImagePreview = null;
  }

  resetAddForm(): void {
    this.newPost = { title: '', description: '', image: '', url: '' };
    this.newImageFile = null;
    this.newImagePreview = null;
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/']);
  }
}
