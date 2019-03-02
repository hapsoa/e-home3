import firebase from '@/api/firebase';

export interface UserData {
  uid: string;
  email: string;
  nickname: string;
  createdAt: number;
  updatedAt: number;
}

export class User implements UserData {
  public uid: string = '';
  public email: string = '';
  public nickname: string = '';
  public createdAt: number = 0;
  public updatedAt: number = 0;

  public async login() {
    const user = await firebase.auth.login();
  }

  public async logout() {
    await firebase.auth.logout();
  }
}
