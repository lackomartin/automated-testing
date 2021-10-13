import { Component, OnInit, ViewChild } from '@angular/core'
import { UsersService } from '../../services/users.service'
import { MatDialog } from '@angular/material/dialog'
import { UsersDetailsComponent } from '../users-details/users-details.component'
import * as _ from 'lodash'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('userDialog') userDialog
  allUsers
  usersList
  displayedColumns: string[] = ['username', 'name', 'email', 'actions']
  searchInput
  
  constructor(
      private userService: UsersService,
      private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
   this.getAllUsers()
  }

  getAllUsers () {
    this.userService.getUsers()
        .then(response => response.json())
        .then(json => {
            this.usersList = json
            this.allUsers = json
        })
  }

  openUserDetails(id: number) {
    this.matDialog.open(UsersDetailsComponent, {
        width: '500px',
        data: id 
    })
  }

  searchUsers (value) {

    if (value !== '') {
        const results = this.allUsers.filter(el => { return el.name.toLowerCase().includes(value.toLowerCase()) })
        let newTableData = results
        this.usersList = newTableData
    } else {
        this.usersList = this.allUsers
    }
  }

  deleteUser(id: number) {
    const userIndex = _.findIndex(this.usersList, user => { return user.id === id })
    let newTableData = []
    this.usersList.forEach(value => {
        if (value.id !== id) newTableData.push(value)
    })

    this.usersList = newTableData
  }
}
