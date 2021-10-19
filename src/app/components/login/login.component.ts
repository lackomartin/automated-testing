import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 loginForm: FormGroup
 code: any

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
    ) { 
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    if ((this.loginForm.controls.username.value === 'test_user' &&
        this.loginForm.controls.password.value === 'test123') ||
        (this.loginForm.controls.username.value === 'test_admin' &&
        this.loginForm.controls.password.value === 'admin123')) {
      this.code = ''
      this.router.navigate(['/users-list'])
    } else {
      this.code = 'Pogrešna lozinka ili korisničko ime!'
    }
  }
}
