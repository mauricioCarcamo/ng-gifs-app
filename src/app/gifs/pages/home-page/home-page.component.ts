import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/SearchResponse';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor( private gifsService: GifsService) {  }

  public get gifs() : Gif[] {
    return this.gifsService.gifs
  }

}
