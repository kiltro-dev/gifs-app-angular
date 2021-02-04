import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from './../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'api_key=Br7Gb6AcrEfll1eULoqVIYzzceq2m6JT';
  private baseUrl: string = 'https://api.giphy.com/v1/gifs';
  private _record: string[] = [];

  // TODO: change any
  public results: Gif[] = [];

  get record() {
    return [...this._record];
  }

  constructor(private http: HttpClient) {
    this._record = JSON.parse(localStorage.getItem('record')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
    // if(localStorage.getItem('record')) {
    //   this._record  = JSON.parse(localStorage.getItem('record')!)
    // }
  }

  searchGifs(query: string) {
    query = query.trim().toLowerCase();
    if (!this._record.includes(query)) {
      this._record.unshift(query);
      this._record = this._record.splice(0, 10);

      localStorage.setItem('record', JSON.stringify(this._record));
    }

    this.http
      .get<SearchGifsResponse>(
        `${this.baseUrl}/search?${this.apiKey}&q=${query}&limit=12`
      )
      .subscribe((resp) => {
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
