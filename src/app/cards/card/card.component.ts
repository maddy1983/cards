import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Card } from './../../shared/card.model';
import { CardsService } from './../../shared/cards.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {
  @Input() card;
  @Input() rowId;
  @Output() removeCard = new EventEmitter ();
  allowEdit = false;
  CardForm = new FormGroup({
    name: new FormControl(null),
    email: new FormControl(null),
    address: new FormControl(null),
    dob: new FormControl(null),
    designation: new FormControl(null),
    phone: new FormControl(null),
  });
  constructor() { }

  ngOnInit() {
    this.CardForm.setValue({
      name: this.card.name,
      email: this.card.email,
      address: this.card.address,
      dob: this.card.dob,
      designation: this.card.designation,
      phone: this.card.phone,
    });
  }
  onEdit() {
    return this.allowEdit = true;
  }
  onCancel() {
    return this.allowEdit = false;
  }
  onDelete() {
    this.removeCard.emit({
      id: this.card.id,
      rowId: this.rowId
    });
  }
  onSave(f) {
    this.allowEdit = false;
  }

}
