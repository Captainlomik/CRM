import { MaterialService } from './../../shared/clasess/meterial.service';
import { OrderService } from './../order.service';
import { Observable } from 'rxjs';
import { PositionService } from './../../shared/services/positions.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Position } from '../../shared/interfaces';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-positoins',
  templateUrl: './order-positoins.component.html',
  styleUrls: ['./order-positoins.component.scss']
})
export class OrderPositoinsComponent implements OnInit {

  positions$: Observable<Position[]>

  constructor(private route: ActivatedRoute,
     private positionsService: PositionService,
     private orderservice:OrderService) { }

  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap(
        (params: Params) => {
          return this.positionsService.fetch(params['id'])
        }
      ),
      map((positions: Position[]) => {
        return positions.map(position => {
          position.quantity = 1
          return position
        })

      })
    )
  }


  addToOrder(position: Position) {
    MaterialService.toast(`Добавлено ${position.quantity}`)
    this.orderservice.add(position)
  }
}
