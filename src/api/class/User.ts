import firebase from '@/api/firebase';

export interface UserData {
  uid: string | null;
  email: string | null;
  nickname: string | null;
  createdAt: number | null;
  updatedAt: number | null;
}

// user instance는 한개. vuex에 하나 있을듯.
// 로그인 로그아웃 버튼, nickname 설정할 때,
export default class User implements UserData {
  public uid: string | null = null;
  public email: string | null = null;
  public nickname: string | null = null;
  public createdAt: number | null = null;
  public updatedAt: number | null = null;

  // public async readUser() {}

  public async login() {
    // const user = await firebase.auth.login();
  }

  public async logout() {
    await firebase.auth.logout();
  }

  private consturctor() {
    this.createdAt = new Date().getTime();
    this.updatedAt = this.createdAt;
  }
}
