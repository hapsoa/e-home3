import firebase from '@/form/firebase';

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
export default class User {
  public static getMyUser() {
    return this.myUser;
  }

  public static setAuthOnListener(listener: () => void) {
    firebase.auth.setAuthOnListener(async firebaseUser => {
      const myUserData = await firebase.auth.db.read(firebaseUser.uid);
      User.myUser = new User(myUserData);
      listener();
    });
  }

  public static setAuthOffListener(listener: () => void) {
    firebase.auth.setAuthOffListener(listener);
  }
  // 로그인이 되면 user instance가 만들어 지는데,
  // setAuthChanged가 불릴 때 만들어 지는게 좋지 않나.
  public static async googleLogin(): Promise<User> {
    const userData: UserData = await firebase.auth.googleLogin();
    const user = new User(userData);
    return user;
  }

  private static myUser: User | null = null;

  private data!: UserData;

  private constructor(data: UserData) {
    this.data = data;
    // this.data.createdAt = new Date().getTime();
    // this.data.updatedAt = this.data.createdAt;
  }

  public async logout() {
    await firebase.auth.logout();
  }
}
