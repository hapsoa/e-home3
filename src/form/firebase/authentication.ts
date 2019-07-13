import _ from 'lodash';
import firebase from './initializingFirebase';
// import database from './cloudFireStore';
import { UserData } from '@/form/class/User';

const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.firestore();

class Authentication {
  public db = {
    loginUser(user: any) {
      database
        .collection('users')
        .doc(user.uid)
        .set({
          uid: user.uid
        })
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch(error => {
          console.error('Error writing document: ', error);
        });
    },
    create(userData: UserData): Promise<void> {
      return new Promise((resolve, reject) => {
        database
          .collection('users')
          .doc(userData.uid as string)
          .set(userData)
          .then(() => {
            console.log('Document(userData) successfully written!');
            resolve();
          })
          .catch(error => {
            console.error('Error writing document(userData): ', error);
            reject(error);
          });
      });
    },
    read(uid: string): Promise<UserData> {
      return new Promise((resolve, reject) => {
        database
          .collection('users')
          .doc(uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              console.log('Document data(userData):', doc.data());
              resolve(doc.data() as UserData);
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document(userData)!');
              reject(new Error('No such document(userData)!'));
            }
          })
          .catch(error => {
            console.log('Error getting document(userData):', error);
            reject(error);
          });
      });
    },
    // updatedAt 변경하는 함수
    update(uid: string): Promise<void> {
      return new Promise((resolve, reject) => {
        database
          .collection('users')
          .doc(uid)
          .update({
            updatedAt: new Date().getTime()
          })
          .then(() => {
            console.log('Document(userData) successfully updated!');
            resolve();
          })
          .catch(error => {
            // The document probably doesn't exist.
            console.error('Error updating document(userData): ', error);
            reject(error);
          });
      });
    },
    delete(uid: string): Promise<void> {
      return new Promise((resolve, reject) => {
        database
          .collection('users')
          .doc(uid)
          .delete()
          .then(() => {
            console.log('Document(userData) successfully deleted!');
            resolve();
          })
          .catch(error => {
            console.error('Error removing document(userData): ', error);
            reject(error);
          });
      });
    }
  };

  private authOnListener: null | ((firebaseUser: firebase.User) => void) = null;
  private authOffListener: null | (() => void) = null;
  private logoutListener: null | (() => void) = null;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('current user : ', user);
      if (user) {
        // User is signed in.
        // this.router.push('/');
        if (!_.isNil(this.authOnListener)) {
          this.authOnListener(user);
        }
      } else {
        // No user is signed in.
        // this.router.push('/login');
        // eslint-disable-next-line no-lonely-if
        if (!_.isNil(this.authOffListener)) {
          this.authOffListener();
        }
      }
    });
  }

  public setAuthOnListener(listener: (firebaseUser: firebase.User) => void) {
    this.authOnListener = listener;
  }

  public setAuthOffListener(listener: () => void) {
    this.authOffListener = listener;
  }

  public async googleLogin(): Promise<UserData> {
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const resultUser = result.user as firebase.User;
      try {
        // update를 시도하고, 실패하면 create 한다.
        // uid에 해당하는 녀석에 updatedAt만 바꾼다.
        await this.db.update(resultUser.uid);
        const userData: UserData = await this.db.read(resultUser.uid);
        return userData;
      } catch (error) {
        console.log(error);
        const currentTime = new Date().getTime();
        const newUserData: UserData = {
          uid: resultUser.uid,
          email: resultUser.email,
          nickname: resultUser.displayName,
          createdAt: currentTime,
          updatedAt: currentTime
        };
        // 새로 회원가입을 한다.
        await this.db.create(newUserData);
        return newUserData;
      }

      // this.db.loginUser(user);
      // this.db.update(result.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.error('google login error', errorCode, errorMessage);
      return Promise.reject(error);
    }
  }

  public logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log('logout complete');
        if (!_.isNil(this.logoutListener)) {
          this.logoutListener();
        }
      })
      .catch(error => {
        // An error happened.
        console.log(error);
      });
  }

  public getCurrentUser() {
    return firebase.auth().currentUser;
  }
}

const auth = new Authentication();

export default auth;
