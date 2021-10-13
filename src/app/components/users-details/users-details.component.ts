import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { UsersService } from '../../services/users.service'

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {

  user
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
   this.getUser()
  }

  getUser () {
    this.userService.getUser(this.data)
        .then(response => response.json())
        .then(json => this.user = json)
  }
}
