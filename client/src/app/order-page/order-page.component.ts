import { OrderPosition } from './../shared/interfaces';
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


  constructor(private router: Router,
    private orderService: OrderService) { }

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
    this.modal.close()
  }
  
  removePosition(orderPosition: OrderPosition) {
    this.orderService.remove(orderPosition)
  }
}
