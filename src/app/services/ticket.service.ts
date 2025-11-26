// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TicketService {

//   private apiKey = 'QDlCJV2YMLjMLAITNL3JNJ7y4ZlmUDsP'; 
//   private baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';

//   constructor(private http: HttpClient) {}

//   login(data: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/login`, data);
//   }
//   getEventsInIndia(): Observable<any> {
//     const url = `${this.baseUrl}?countryCode=IN&apikey=${this.apiKey}&size=50`;
//     return this.http.get(url);
//   }

//   getConcertsInIndia(): Observable<any> {
//     const url = `${this.baseUrl}?countryCode=IN&classificationName=music&apikey=${this.apiKey}&size=50`;
//     return this.http.get(url);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
url: any;
  _id?: string;
  postId?: string;
  title: string;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly baseUrl = 'https://ajaz-backend.onrender.com';

  constructor(private http: HttpClient) {}

  // ---------------- AUTH ----------------
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  // ---------------- POSTS ----------------
  getPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-posts`);
  }
  getMessages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-enquiry`);
  }

  createPost(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-post`, formData);
  }

  updatePost(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/update-post`, formData);
  }
  sendMessage(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/enquiry`, formData);
  }

  deletePost(postId: string): Observable<any> {
    return this.http.request('post', `${this.baseUrl}/delete-post`, {
      body: { postId }
    });
  }
deleteMessage(enquiryId: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/delete-enquiry`, {
    enquiryId: enquiryId  
  });
}



  getImageUrl(image: string): string {
    return `${this.baseUrl}/uploads/${image}`;
  }

}
