import { Subscription } from 'rxjs';
import { OrdersService } from './../shared/services/orders.service';
import { Order, OrderPosition } from './../shared/interfaces';
import { OrderService } from './order.service';
import { MaterialInstance, MaterialService } from './../shared/clasess/meterial.service';
import { NavigationEnd, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal', { static: false }) modalRef: ElementRef

  isRoot: boolean
  modal: MaterialInstance
  pending = false
  oSub: Subscription


  constructor(private router: Router,
    private orderService: OrderService,
    private ordersService: OrdersService) { }

  ngOnInit() {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  ngOnDestroy() {
    this.modal.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  open() {
    this.modal.open();
  }

  cancel() {
    this.modal.close()
  }

  submit() {
    this.pending = true

    const order: Order = {
      list: this.orderService.list.map(item => {
        delete item._id
        return item
      })
    }

    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Заказ № ${newOrder.order} был добавлен`)
        this.modal.close()
        this.orderService.clear()
      },
      error => {MaterialService.toast(error.error.message)
      console.log(error)},
      () => {
        this.modal.close()
        this.pending = false
      }
    )
  }

  removePosition(orderPosition: OrderPosition) {
    this.orderService.remove(orderPosition)
  }
}
