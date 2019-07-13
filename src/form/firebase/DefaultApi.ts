import firebase from './initializingFirebase';
const database = firebase.firestore();

export interface DefaultData {
  id: string;
}

export default abstract class DefaultApi<T extends DefaultData> {
  protected dbCollection!: firebase.firestore.CollectionReference;

  protected constructor(collectionName: string) {
    this.dbCollection = database.collection(collectionName);
  }

  public create(data: T) {
    return new Promise((resolve, reject) => {
      this.dbCollection
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
  }

  public read(id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.dbCollection
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
  }

  public delete(id: string) {
    return new Promise((resolve, reject) => {
      this.dbCollection
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

  // 각 데이터마다 저장하는 property가 다를 수 있다.
  // public update(data: T) {
  //   return new Promise((resolve, reject) => {
  //     this.dbCollection.doc(data.id).update(data)
  //   });
  // }
}
