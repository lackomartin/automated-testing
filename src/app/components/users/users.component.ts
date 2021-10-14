import { Component, OnInit, ViewChild } from '@angular/core'
import { UsersService } from '../../services/users.service'
import { MatDialog } from '@angular/material/dialog'
import { UsersDetailsComponent } from '../users-details/users-details.component'
import * as _ from 'lodash'
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('userDialog') userDialog
  allUsers
  usersList
  displayedColumns: string[] = ['id', 'username', 'name', 'email', 'city', 'actions']
  searchInput
  currentPage = 1
  pageNumber = 2
  
  constructor(
      private userService: UsersService,
      private matDialog: MatDialog,
      private router: Router
  ) { }

  ngOnInit(): void {
   this.getAllUsers()
  }

  logout () {
    this.router.navigate([''])
  }

  getAllUsers () {
    this.userService.getUsers()
        .then(response => response.json())
        .then(json => {
            this.usersList = json.slice(0, 5)
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
        const results = this.allUsers.filter(el => {
          return el.name.toLowerCase().includes(value.toLowerCase()) ||
                 el.username.toLowerCase().includes(value.toLowerCase())
        })
        let newTableData = results
        this.usersList = newTableData
    } else {
        this.usersList = this.allUsers.slice(0, 5)
    }
  }

  filter (event) {
    if (event.value !== '-') {
      const results = this.allUsers.filter(el => {
        return el.address['city'].toLowerCase().includes(event.value.toLowerCase())
      })
      let newTableData = results
      this.usersList = newTableData
    } else {
      this.usersList = this.allUsers.slice(0, 5)
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

  pageUp () {
    if (this.currentPage !== 1) return

    this.usersList = this.allUsers.slice(4, 9)
    this.currentPage = 2
  }

  pageDown () {
    if (this.currentPage !== 2) return

    this.usersList = this.allUsers.slice(0, 5)
    this.currentPage = 1
  }
}
