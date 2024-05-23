import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit {
  ngOnInit(): void {
    if ( !this.url ) 
    throw new Error('Url property ie required');
  }

  @Input()
  public url!: string
  
  @Input()
  public alt: string = ""

  public hasLoad: boolean = false

  public onLoad(): void {
    console.log("Loaded!!");
    
    this.hasLoad = true
  }

}
