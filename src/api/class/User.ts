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
// vuex뿐만 아니라, 다른 class(boardPost 에서도 user.uid가 필요하다.)
export default class User implements UserData {
  public static getInstance() {
    return this.userInstance;
  }

  public static setAuthOnListener(listener: () => void) {
    firebase.auth.setAuthOnListener(listener);
  }

  public static setAuthOffListener(listener: () => void) {
    firebase.auth.setAuthOffListener(listener);
  }
  private static userInstance: User | null = null;

  public uid: string | null = null;
  public email: string | null = null;
  public nickname: string | null = null;
  public createdAt: number | null = null;
  public updatedAt: number | null = null;

  // 로그인이 되면 user instance가 만들어 지는데,
  // setAuthChanged가 불릴 때 만들어 지는게 좋지 않나.
  public async googleLogin() {
    await firebase.auth.googleLogin();
  }

  public async logout() {
    await firebase.auth.logout();
  }

  private consturctor() {
    this.createdAt = new Date().getTime();
    this.updatedAt = this.createdAt;
  }
}
