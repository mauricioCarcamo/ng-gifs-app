import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/SearchResponse';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor( private http: HttpClient ) { 
    this.loadLocalStorage()

    if (this._tagHistory.length === 0) return
    this.searchTag( this._tagHistory[0] )
  }

  public gifs: Gif[] = []

  private apiKey: string = 'vn6xrYvnWYHYEuaiIr2MeGAd8LHgR1dv'

  private queryLimit: number = 10

  private baseUrl: string = 'https://api.giphy.com/v1/gifs'

  private _tagHistory: string[] = []

  get tagHistory() {
    return  [ ...this._tagHistory ]
  }

  /**
   * organiceHistory
   */
  public organiceHistory( tag: string ): void {
    tag = tag.toLocaleLowerCase()

    if ( this._tagHistory.includes(tag) ) {
      this._tagHistory = this._tagHistory.filter( oldTag => oldTag !== tag)
    }

    this._tagHistory.unshift( tag )
    this._tagHistory = this._tagHistory.splice(0, 10)

    this.saveLocalStorage()
  }

  private saveLocalStorage() {
    localStorage.removeItem( 'tagsHistory' )
    localStorage.setItem( 'tagsHistory', JSON.stringify( this._tagHistory ) )
  }

  private loadLocalStorage() {
    if ( !localStorage.getItem( "tagsHistory" ) ) return
    this._tagHistory = JSON.parse( localStorage.getItem( "tagsHistory" )! )

  }

  public searchTag( tag: string ) {
    if ( tag.length === 0 ) return

    this.organiceHistory( tag )

    const params= new HttpParams({
      fromObject: {
        api_key: this.apiKey,
        q: tag,
        limit: this.queryLimit
      }
    })

    this.http.get<SearchResponse>( `${ this.baseUrl }/search`, { params } ).subscribe(
      resp => {
        this.gifs = resp.data
      }
    )
    


    // fetch(`https://api.giphy.com/v1/gifs/search?api_key=vn6xrYvnWYHYEuaiIr2MeGAd8LHgR1dv&q=${ tag }&limit=3`)
    // .then( resp => resp.json() )
    // .then( data => console.log( data ) )
    
  }
}
