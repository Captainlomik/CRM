import { Subscription } from 'rxjs';
import { OrdersService } from './../shared/services/orders.service';
import { OrderService } from './../order-page/order.service';
import { MaterialService } from './../shared/clasess/meterial.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance } from '../shared/clasess/meterial.service';
import { Order } from '../shared/interfaces';

const STEP = 2

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip', { static: false }) tooltipRef: ElementRef

  tooltip: MaterialInstance
  isFilterVisible = false
  offset = 0
  limit = STEP
  oSub: Subscription
  orders: Order[] = []

  constructor(private ordersService: OrdersService) { }


  ngOnInit() {
    this.fetch()
  }

  private fetch() {
    const params = {
      offset: this.offset,
      limit: this.limit
    }
    this.oSub = this.ordersService.fetch(params).subscribe(
      order => {
        this.orders = order
      }
    )
  }

  ngOnDestroy() {
    this.tooltip.destroy()
    this.oSub.unsubscribe()
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

}
