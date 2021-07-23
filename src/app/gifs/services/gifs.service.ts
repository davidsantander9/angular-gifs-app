import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'z8L84cRhMVVOIbQuduH0R8OxY88PESaX';
  private url = '';
  private _history: string [] = [];
  public results: Gif[] = [];

  constructor(private http: HttpClient) {}

  get hystory(){
    return [...this._history];
  }

  searchGifs( query: string = ''){
    
    query = query.trim().toLowerCase();

    if ( !this._history.includes(query) ) {
      this._history.unshift( query );
      this._history = this._history.splice(0, 10);
      this.url = `http://api.giphy.com/v1/gifs/search?q=${encodeURI( query )}&limit=10&api_key=${this.apiKey}`;
    }

    this.http.get<SearchGifsResponse>(this.url).subscribe( (resp) => {
      this.results = resp.data;
    });

  }



}
