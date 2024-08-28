import { RetroItem } from './../models/retro-item.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class RetroItemService {

  constructor(private http: HttpClient) { }

  loadItemById(itemId: number): Observable<RetroItem> {
    return this.http.get<RetroItem>(`${API_URL}/item?itemId=${itemId}`);
  }

  loadItems(category: number, sprint?: number): Observable<RetroItem>  {
    let apiUrl = `${API_URL}/item/${category}`;
    if(sprint) {
      apiUrl += `?sprint=${sprint}`;
    }
    return this.http.get<RetroItem>(apiUrl);
  }

  addNewItem(item: RetroItem): Observable<RetroItem> {
    return this.http.post<RetroItem>(`${API_URL}/item`, item);
  }

  deleteItem(itemId: number): Observable<RetroItem> { 
    return this.http.delete<RetroItem>(`${API_URL}/item/${itemId}`);
  }

  changeItemType(itemId: number, newType: string): Observable<RetroItem> {
    return this.http.put<RetroItem>(`${API_URL}/item/change/type/${itemId}?newType=${newType}`, {})
  }

  editItem(item: RetroItem): Observable<RetroItem> {
    return this.http.put<RetroItem>(`${API_URL}/item/${item.itemId}`, item);
  }

  addReactionToItem(itemId: number, reactionType: string) {
    return this.http.post(`${API_URL}/reaction/${itemId}?type=${reactionType}`, {});
  }

  getAllSprints() {
    return this.http.get(`${API_URL}/item/sprints`);
  }
}
