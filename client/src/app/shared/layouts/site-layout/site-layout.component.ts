import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {

  links=[
    {url:'/overview', name:'Обзор'},
    {url:'/analytics', name:'Аналитика'},
    {url:'/history', name:'История'},
    {url:'/order', name:'Добавление заказа'},
    {url:'/categories', name:'Ассортимент'}
  ]
  constructor(private authService:AuthService, 
   private router:Router) { }

  ngOnInit() {
  }


  logout(){
    event.preventDefault()
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
