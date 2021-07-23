import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'z8L84cRhMVVOIbQuduH0R8OxY88PESaX';
  private _history: string [] = [];
  private _urlService: string = 'http://api.giphy.com/v1/gifs'
  public results: Gif[] = [];



  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [] ;
    this.results = JSON.parse(localStorage.getItem('results')!) || [] ;
  }

  get hystory(){
    return [...this._history];
  }

  searchGifs( query: string = ''){
    
    query = query.trim().toLowerCase();

    if ( !this._history.includes(query) ) {
      this._history.unshift( query );
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history))
    }

    const params = new HttpParams()
                  .set('api_key', this._apiKey)
                  .set('limit', '10')
                  .set('q', query)


    this.http.get<SearchGifsResponse>(`${this._urlService}/search`, { params })
    .subscribe( (resp) => {
      this.results = resp.data;
      localStorage.setItem('results', JSON.stringify(this.results))
    });

  }



}
