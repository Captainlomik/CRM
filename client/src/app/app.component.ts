import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor (private authService:AuthService){

  }
  ngOnInit(): void {
   const potentialToken=localStorage.getItem('auth-token')
   if (potentialToken !==null){
     this.authService.setToken(potentialToken)
   }
  }
}
