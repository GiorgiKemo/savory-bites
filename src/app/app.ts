import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Api } from './api';
import { CartService } from './cart/cart.service';
import { ScrollService } from './scroll.service';
import { ToastComponent } from './toast/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, ToastComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  title = 'Savory Bites';
  isScrolled = false;
  cartItemCount$: Observable<number> | undefined;
  isMenuOpen = false;
  private currentRoute: string = '/dishes';

  constructor(
    private cartService: CartService,
    private api: Api,
    private scrollService: ScrollService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cartItemCount$ = this.cartService.cartItemCount$;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
        this.restoreScrollPosition();
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    this.scrollService.saveScrollPosition(this.currentRoute);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToTopHome(): void {
    this.scrollService.scrollToTop();
  }

  private restoreScrollPosition(): void {
    if (this.currentRoute === '/dishes') {
      this.scrollService.restoreScrollPosition(this.currentRoute);
    }
  }
}
