import firebase from './initializingFirebase';
const database = firebase.firestore();

export interface DefaultData {
  id: string;
}

interface Database<T> {
  collection: firebase.firestore.CollectionReference;
  create: (data: T) => Promise<void>;
  read: (id: string) => Promise<T>;
  update: (data: T) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export default abstract class DefaultApi<T extends DefaultData> {

  public db: Database<T> = {
    collection: database.collection('defaultCollection'),
    create(data: T): Promise<void> {
      return new Promise((resolve, reject) => {
        this.collection
          .doc(data.id)
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
    update: (data: T): Promise<void> => {
      return new Promise((resolve, reject) => {
        // content는 storage에 저장한다.
        this.db.collection
          .doc(data.id)
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

  // public storage {

  // }


  // protected dbCollection!: firebase.firestore.CollectionReference;

  protected constructor(collectionRefName: string) {
    // this.dbCollection = database.collection(collectionRefName);
    this.db.collection = database.collection(collectionRefName);
  }



  // 각 데이터마다 저장하는 property가 다를 수 있다.
  // public update(data: T) {
  //   return new Promise((resolve, reject) => {
  //     this.dbCollection.doc(data.id).update(data)
  //   });
  // }
}
