import { Subject } from 'rxjs';
import { CardsService } from './../shared/cards.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.less']
})
export class CardsComponent implements OnInit {
  rows;
  cards;
  columns;
  columnsArr;
  rowsArr;
  colWid;
  constructor(
    private cardsApi: CardsService
  ) { }

  ngOnInit() {
    this.cardsApi.getCards();
    this.cardsApi.getupdatedCards().subscribe(
      cards => {
        this.cards = cards;
      }
    );
  }

  createCards() {
    this.rowsArr = Array(+this.rows);
    const wid = Math.round(12 / this.columns);
    this.colWid = wid < 2 ? 2 : wid;
    this.columnsArr = this.cardsApi.chunkArray([...this.cards], +this.columns);
  }
  handleRemoveCard(obj) {
    this.columnsArr[obj.rowId] = this.columnsArr[obj.rowId].filter((itm) => itm.id !== obj.id);
    this.cards = [].concat.apply([], this.columnsArr);
    this.cardsApi.cardsUpdated.next([...this.cards]);
  }
}
