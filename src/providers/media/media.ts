import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Media } from '../../interfaces/pic';
import { LoginResponse, RegisterResponse, User } from '../../interfaces/Users';


/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  mediaApi = 'http://media.mw.metropolia.fi/wbma/';
  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/';

  loggedIn = false;
  user: User = null;

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getAllMedia() {
    // @ts-ignore
    return this.http.get<Media[]>(this.mediaApi + 'media');
  }

  getSingleMedia(id) {
    return this.http.get<Media>(this.mediaApi + 'media/' + id);

  }

  upload(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('key'),
      }),
    };
    return this.http.post<LoginResponse>(this.mediaApi + 'media', data, httpOptions);
  }

  login(user: User) {
    console.log('at log in party');
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-type': 'application/json',
        },
      ),
    };
    return this.http.post<LoginResponse>(this.mediaApi + 'login', user, httpOptions);
  }

  register(userData: User) {

    const httpOptions = {
      headers: new HttpHeaders({
          'Content-type': 'application/json',
        },
      ),
    };
    return this.http.post<RegisterResponse>(this.mediaApi + 'users', userData, httpOptions);
  }

  checkUsers(username) {
    return this.http.get(this.mediaApi + 'users/username/:' + username);
  }

  getFileByTag(tag) {
    return this.http.get<Media[]>(this.mediaApi + 'tags/' + tag);
  }
}
