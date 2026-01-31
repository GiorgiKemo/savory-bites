import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Api } from '../api';
import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();

  constructor(private api: Api) {
    this.loadCart();
  }

  loadCart() {
    this.api.getBasket().pipe(
      switchMap(items => {
        console.log('Raw basket items from API:', items);
        if (!items || items.length === 0) {
          return of([]);
        }
        const productObservables = items.map(item => {
          const productId = item.product?.id || item.productId;
          return this.api.getProduct(productId);
        });
        return forkJoin(productObservables).pipe(
          switchMap(products => {
            const detailedItems = items.map((item, index) => {
              const productDetails = products[index];
              const productId = item.product?.id || item.productId || item.id;
              const normalizedItem = {
                ...item,
                productId: productId,
                id: productId,
                name: productDetails.name,
                price: productDetails.price
              };
              console.log('Normalized item:', normalizedItem);
              return normalizedItem;
            });
            return of(detailedItems);
          })
        );
      })
    ).subscribe(detailedItems => {
      this.cartItems.next(detailedItems);
      this.updateCartItemCount();
    });
  }

  addToCart(product: Product) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(i => i.productId === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentItems.push({
        productId: product.id,
        quantity: 1,
        name: product.name,
        price: product.price
      });
    }

    this.cartItems.next(currentItems);
    this.updateCartItemCount();
  }

  deleteItem(productId: number) {
    const currentItems = this.cartItems.getValue().filter(i => i.productId !== productId);
    this.cartItems.next(currentItems);
    this.updateCartItemCount();
  }

  updateCartItemCount() {
    const count = this.cartItems.getValue().reduce((acc, item) => acc + item.quantity, 0);
    this.cartItemCount.next(count);
  }
}
