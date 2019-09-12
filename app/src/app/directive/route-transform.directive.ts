import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appRouteTransform]'
})
export class RouteTransformDirective {

  constructor(private router: Router) {
    // Required to make the same component re-init for a different route.
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  @HostListener('click', ['$event'])
  public onClick(event) {
    if (event.target.tagName === 'A') {
      const href = event.target.getAttribute('href');
      if (!/^https?:\/\//.test(href)) {
        event.preventDefault();
        this.router.navigateByUrl(href);
      }
    }
  }
}
