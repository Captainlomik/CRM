import { MaterialService } from './../shared/clasess/meterial.service';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
) { }



  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params:Params)=>{
if(params['registered']){
  MaterialService.toast('Теперь вы можете зайти в систему, используя свои данные')
}
else if ([params['acessDenied']]){
  MaterialService.toast('Для начала авторизуйтесь в системе')
}
else if (params['sessionFailed']){
  MaterialService.toast('Пожалуйста войжите в систему снова')
}
    })
  }

  ngOnDestroy() {
    if (this.aSub)
      this.aSub.unsubscribe()
  }

  onSubmit() {
    this.form.disable()

    this.aSub = this.authService.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      (error) => {
        MaterialService.toast(error.error.message)
        console.warn(error)
        this.form.enable()
      }
    )
  }


}
