import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  apiurl = 'http://localhost:3000/user';

  registerUser(inputdata: any) {
    return this.http.post(this.apiurl, inputdata);
  }

  getUserbyCode(id: any) {
    return this.http.get(this.apiurl + '/' + id);
  }
  getall() {
    return this.http.get(this.apiurl);
  }

  updateuser(id: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + id, inputdata);
  }

  getuserrole() {
    return this.http.get('http://localhost:3000/role');
  }

  isloggedin() {
    return sessionStorage.getItem('username') != null;
  }

  getrole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString()
      : '';
  }

  getAllCustomer() {
    return this.http.get('http://localhost:3000/customer');
  }

  getaccessbyrole(role: any, menu: any) {
    return this.http.get(
      'http://localhost:3000/roleaccess?role=' + role + '&menu=' + menu
    );
  }
}
