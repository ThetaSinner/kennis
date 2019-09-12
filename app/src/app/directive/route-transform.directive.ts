import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appRouteTransform]'
})
export class RouteTransformDirective {

  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  @HostListener('click', ['$event'])
  public onClick(event) {
    console.log(event.target.tagName);
    if (event.target.tagName === 'A') {
      event.preventDefault();
      const href = event.target.getAttribute('href');
      // const parts = href.split('/').filter(a => a);
      // if (href.indexOf('/') === 0) {
      //   parts[0] = '/' + parts[0];
      // }
      // console.log(parts);
      // this.router.navigate(parts);
      console.log(href);
      this.router.navigateByUrl(href);
    }
  }
}
