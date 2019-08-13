import firebase from './initializingFirebase';
const database = firebase.firestore();
const storage = firebase.storage();

export interface DefaultData {
  id: string;
}

interface Database<T> {
  collection: firebase.firestore.CollectionReference;
  create: (id: string, data: T) => Promise<void>;
  read: (id: string) => Promise<T>;
  update: (id: string, data: T) => Promise<void>;
  delete: (id: string) => Promise<void>;
  [databaseElement: string]: any;
}

// 변수를 넣는게 아니라, db와 storage에 대한 각각의 함수를 밖으로 빼 두는 것이 좋아보인다.
export default abstract class DefaultApi<T extends DefaultData> {

  public db: Database<T> = {
    collection: database.collection('defaultCollection'),
    create(id: string, data: T): Promise<void> {
      return new Promise((resolve, reject) => {
        this.collection
          .doc(id)
          .set(data)
          .then(() => {
            console.log('Document successfully written!');
            resolve();
          })
          .catch(error => {
            console.error('Error writing document: ', error);
            reject(error);
          });
      });
    },
    read(id: string): Promise<T> {
      return new Promise((resolve, reject) => {
        this.collection
          .doc(id)
          .get()
          .then(doc => {
            if (doc.exists) {
              console.log('Document data:', doc.data());
              const data: T = doc.data() as T;
              resolve(data);
            } else {
              // doc.data() will be undefined in this case
              console.error('No such document!');
              reject(new Error('No such document!'));
            }
          })
          .catch(error => {
            console.error('Error getting document:', error);
            reject(error);
          });
      });
    },
    update: (id: string, data: T): Promise<void> => {
      return new Promise((resolve, reject) => {
        // content는 storage에 저장한다.
        this.db.collection
          .doc(id)
          .update(data)
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    delete(id: string) {
      return new Promise((resolve, reject) => {
        this.collection
          .doc(id)
          .delete()
          .then(() => {
            resolve();
          })
          .catch(error => {
            console.error('DefaultApi delete() error', error);
            reject(error);
          });
      });
    }
  };

  public storage = {
    ref: storage.ref().child('defaultRef'),
    createFile(id: string, file: File | Blob): Promise<void> {
      return new Promise((resolve, reject) => {
        this.ref
          .child(id)
          .put(file)
          .then(snapshot => {
            console.log('Uploaded a blob or file!');
            resolve();
          })
          .catch(error => {
            console.error('Error writing storage: ', error);
            reject(error);
          });
      });
    },
    createString(id: string, text: string): Promise<void> {
      return new Promise((resolve, reject) => {
        this.ref
          .child(id)
          .putString(text)
          .then(snapshot => {
            console.log('Uploaded a string!');
            resolve();
          })
          .catch(error => {
            console.error('Error writing storage: ', error);
            reject(error);
          });
      });
    },
    read(id: string): Promise<string> {
      return new Promise((resolve, reject) => {
        this.ref
          .child(id)
          .getDownloadURL()
          .then(url => {
            // `url` is the download URL for 'images/stars.jpg'
            resolve(url);
            // Or inserted into an <img> element:
            // let img = document.getElementById('myimg');
            // img.src = url;
          })
          .catch(error => {
            // Handle any errors
            console.error('Error getting storage: ', error);
            reject(error);
          });
      });
    },
    readString(id: string): Promise<string> {
      return new Promise((resolve, reject) => {
        this.read(id).then(url => {
          const xmlHttp = new XMLHttpRequest();
          xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
              const response = xmlHttp.responseText; // should have your text
              console.log('readString() response!@#$%^&', response);
              resolve(response);
            }
            // else {
            //   reject(new Error('url download failed'));
            // }
          };
          xmlHttp.open('GET', url, true); // true for asynchronous
          xmlHttp.send(null);
        }).catch(error => {
          reject(error);
        });
      });
    },
    delete(id: string): Promise<void> {
      return new Promise((resolve, reject) => {
        this.ref
          .child(id)
          .delete()
          .then(() => {
            // File deleted successfully
            console.log('storage successfully deleted!');
            resolve();
          })
          .catch(error => {
            // Uh-oh, an error occurred!
            console.error('Error removing storage: ', error);
            reject(error);
          });
      });
    },
  };


  // protected dbCollection!: firebase.firestore.CollectionReference;

  protected constructor(collectionRefName: string) {
    // this.dbCollection = database.collection(collectionRefName);
    this.db.collection = database.collection(collectionRefName);
    this.storage.ref = storage.ref().child(collectionRefName);
  }



  // 각 데이터마다 저장하는 property가 다를 수 있다.
  // public update(data: T) {
  //   return new Promise((resolve, reject) => {
  //     this.dbCollection.doc(data.id).update(data)
  //   });
  // }
}
