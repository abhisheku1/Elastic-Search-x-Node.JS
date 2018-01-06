import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Product } from '../Shared/Product';
import { ProductSearchQuery } from '../Shared/ProductSearchQuery';
import { ProductServiceConfig } from '../Shared/ProductServiceConfig';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  getConfig() {
    const url = `http://localhost:3000/api/product/config`;

    return this.http.get(url)
      .map(
      (response: Response) => {
        // console.log('response = ', response.json());
        const res = response.json();
        console.log('res = ', res);
        return new ProductServiceConfig(
          res.soldBarrierStatusRange
        );
      });
  }

  search(query: ProductSearchQuery) {
    const url = `http://localhost:3000/api/product/search`;
    // console.log('getQuotes', url);
    return this.http.post(url, { query })
      .map(
      (response: Response) => {
        console.log(response.json());

        return response.json().map(item => {
          let itemSrc = item._source;
          let itemHighlight = item.highlight;

          console.log('itemSrc', itemSrc);
          console.log('itemHighlight', itemHighlight);

          return new Product(
            itemSrc.name,
            itemSrc.description,
            itemSrc.price,
            itemSrc.in_stock,
            itemSrc.sold,
            itemSrc.is_active,
            itemHighlight.name 
          );
        }
        );
      });
  }
}