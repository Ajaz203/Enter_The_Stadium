import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiKey = 'QDlCJV2YMLjMLAITNL3JNJ7y4ZlmUDsP'; // Replace with your API key
  private baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';

  constructor(private http: HttpClient) {}

  // LOGIN API
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  getEventsInIndia(): Observable<any> {
    const url = `${this.baseUrl}?countryCode=IN&apikey=${this.apiKey}&size=50`;
    return this.http.get(url);
  }

  getConcertsInIndia(): Observable<any> {
    const url = `${this.baseUrl}?countryCode=IN&classificationName=music&apikey=${this.apiKey}&size=50`;
    return this.http.get(url);
  }
}
