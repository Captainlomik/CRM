import { MaterialService } from './../../shared/clasess/meterial.service';
import { Component, Injectable, Input, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';
import { MaterialInstance } from 'src/app/shared/clasess/meterial.service';
import { Order } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @Input() orders: Order[]
  @ViewChild('modal', { static: false }) modalRef: ElementRef

  modal: MaterialInstance
  selectedOrder: Order

  constructor() { }

  ngOnDestroy() {
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  computePrice(order: Order): number {
    return order.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)

  }

  selectOrder(order: Order) {
    this.selectedOrder = order
    this.modal.open()
  }

  closeModal(){
    this.modal.close()
  }
}
