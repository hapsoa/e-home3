import _ from 'lodash';
import firebase from './initializingFirebase';
// import database from './cloudFireStore';
import { UserData } from '@/api/class/User';

const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.firestore();

class Authentication {
  public db = {
    loginUser(user: any) {
      database
        .collection('users')
        .doc(user.uid)
        .set({
          uid: user.uid,
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
          .doc(userData.uid)
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
    update(userData: UserData): Promise<void> {
      return new Promise((resolve, reject) => {
        database
          .collection('users')
          .doc(userData.uid)
          .update({
            updatedAt: userData.updatedAt,
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
            console.log('Document successfully deleted!');
          })
          .catch(error => {
            console.error('Error removing document: ', error);
          });
      });
    },
  };

  private userOnlineListener: null | (() => void) = null;
  private userOfflineListener: null | (() => void) = null;
  private logoutListener: null | (() => void) = null;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('current user : ', user);
      if (user) {
        // User is signed in.
        // this.router.push('/');
        if (!_.isNil(this.userOnlineListener)) {
          this.userOnlineListener();
        }
      } else {
        // No user is signed in.
        // this.router.push('/login');
        // eslint-disable-next-line no-lonely-if
        if (!_.isNil(this.userOfflineListener)) {
          this.userOfflineListener();
        }
      }
    });
  }

  public setUserOnlineListener(listener: () => void) {
    this.userOnlineListener = listener;
  }

  public setUserOfflineListener(listener: () => void) {
    this.userOfflineListener = listener;
  }

  public async login() {
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      console.log('google login');
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const token = result.credential.accessToken;
      // The signed-in user info.
      const user: object = result.user as object;

      this.db.loginUser(user);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
      console.log(errorMessage);
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
