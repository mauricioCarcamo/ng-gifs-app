import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/SearchResponse';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  ngOnInit(): void {
    if ( !this.gif ) throw new Error('Prop no enviado')
  }

  @Input()
  public gif!: Gif

}
