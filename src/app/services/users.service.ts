import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})

export class UsersService {

    public apiUrl: string = 'https://jsonplaceholder.typicode.com/'

    constructor () {}

    getUsers (username?: string) {
        if (username) return fetch(`${this.apiUrl}users?username=${username}`)
        else return fetch(`${this.apiUrl}users`)
    }

    getUser (id: number) {
      return fetch(`${this.apiUrl}users/${id}`)
    }

    deleteUser (id: number) {
      return fetch(`${this.apiUrl}users/${id}`, {
        method: 'DELETE',
      })
    }
  
}
