import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollPositions: { [key: string]: number } = {};

  saveScrollPosition(route: string): void {
    this.scrollPositions[route] = window.scrollY;
  }

  restoreScrollPosition(route: string): void {
    const position = this.scrollPositions[route];
    if (position !== undefined) {
      setTimeout(() => {
        window.scrollTo(0, position);
      }, 0);
    }
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
