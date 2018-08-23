import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import { Card } from './card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  cards: Card[];
  cardsUpdated = new Subject<Card[]> ();
  constructor(
    private http: HttpClient
  ) { }

  getCards() {
    return this.http.get<Card[]>('assets/cards.json')
      .subscribe(
        (cards) => {
          this.cards = cards;
          this.cardsUpdated.next([...this.cards]);
        }
      );
  }
  getupdatedCards() {
    return this.cardsUpdated.asObservable();
  }
  chunkArray(myArray, chunk_size) {
    const results = [];
    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }
    return results;
  }
}
