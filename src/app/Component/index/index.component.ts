import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    dots: true,
    // navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
    
  }
  

}
  // homeSlider={items: 3,dots: true,nav: true};
  // homeSlider2={items: 1,dots: true,nav: true};


