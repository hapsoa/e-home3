// style-weather-cms 에서 가져온 양식대로 바꾸기.
import _ from 'lodash';
import firebase from './initializingFirebase';
import { DiaryData } from '../class/Diary';
import DefaultApi from './DefaultApi';
// import { ClothData, MajorClass } from '@/api/class/Cloth';

const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.firestore();
const storage = firebase.storage();
const storageRef = firebase.storage().ref();
const diaryRef = storageRef.child('diary');
// var spaceRef = imagesRef.child(fileName);

// let nextDocuments: firebase.firestore.Query | null = null;

// class DiaryApi {
//   public db = {
//     // crud
//     create(clothData: ClothData): Promise<void> {
//       return new Promise((resolve, reject) => {
//         database
//           .collection('clothes')
//           .doc(clothData.id as string)
//           .set(clothData)
//           .then(() => {
//             console.log('Document(clothData) successfully written!');
//             resolve();
//           })
//           .catch(error => {
//             console.error('Error writing document(clothData): ', error);
//             reject(error);
//           });
//       });
//     },
//     read(clothId: string): Promise<ClothData> {
//       return new Promise((resolve, reject) => {
//         database
//           .collection('clothes')
//           .doc(clothId)
//           .get()
//           .then(doc => {
//             if (doc.exists) {
//               // console.log('Document data(userData):', doc.data());
//               resolve(doc.data() as ClothData);
//             } else {
//               // doc.data() will be undefined in this case
//               console.log('No such document(clothData)!');
//               reject(new Error('No such document(clothData)!'));
//             }
//           })
//           .catch(error => {
//             console.log('Error getting document(clothData):', error);
//             reject(error);
//           });
//       });
//     },
//     // update() 필요하지않고, 덮어쓰기(create)하면 되지 않을까
//     delete(clothId: string): Promise<void> {
//       return new Promise((resolve, reject) => {
//         database
//           .collection('clothes')
//           .doc(clothId)
//           .delete()
//           .then(() => {
//             console.log('Document(clothData) successfully deleted!');
//             resolve();
//           })
//           .catch(error => {
//             console.error('Error removing document(clothData): ', error);
//             reject(error);
//           });
//       });
//     },
//     readDocumentsByRecent(numOfDocuments: number): Promise<ClothData[]> {
//       return new Promise((resolve, reject) => {
//         if (_.isNil(nextDocuments)) {
//           database
//             .collection('clothes')
//             .orderBy('createdAt', 'desc')
//             .limit(numOfDocuments)
//             .get()
//             .then(documentSnapshots => {
//               if (documentSnapshots.docs.length !== 0) {
//                 // Get the last visible document
//                 const lastDocument =
//                   documentSnapshots.docs[documentSnapshots.docs.length - 1];
//                 // console.log('last', lastVisible);

//                 nextDocuments = database
//                   .collection('clothes')
//                   .orderBy('createdAt', 'desc')
//                   .startAfter(lastDocument)
//                   .limit(numOfDocuments);
//               }

//               const clothDatas: ClothData[] = [];
//               documentSnapshots.forEach(doc => {
//                 // console.log(doc.id, ' => ', doc.data());
//                 clothDatas.push(doc.data() as ClothData);
//               });

//               resolve(clothDatas);
//             })
//             .catch(error => {
//               console.error('readDocumentsByRecent()');
//               reject(error);
//             });
//         } else {
//           nextDocuments
//             .get()
//             .then(documentSnapshots => {
//               const clothDatas: ClothData[] = [];
//               documentSnapshots.forEach(doc => {
//                 clothDatas.push(doc.data() as ClothData);
//               });

//               const lastDocument =
//                 documentSnapshots.docs[documentSnapshots.docs.length - 1];
//               nextDocuments = database
//                 .collection('clothes')
//                 .orderBy('createdAt', 'desc')
//                 .startAfter(lastDocument)
//                 .limit(numOfDocuments);

//               resolve(clothDatas);
//             })
//             .catch(error => {
//               console.error('readDocumentsByRecent()', error);
//               reject(error);
//             });
//         }
//       });
//     },
//     initNextDocuments() {
//       nextDocuments = null;
//     },
//     /**
//      * query를 이용해 clothData들을 가져오기
//      * @param queryObject
//      * numOfClothes: 불러올 clothData 수
//      * searchInput: 검색창 input
//      * majorClass: null이면 모두 가져온다
//      * majorClass: null이면 모두 가져온다
//      * gender: null이면 모두 가져온다.
//      */
//     readByQuery(queryObject: {
//       numOfClothes: number;
//       searchInput: string;
//       majorClass: string | null;
//       minorClass: string | null;
//     }): Promise<ClothData[]> {
//       return new Promise((resolve, reject) => {
//         let queryRef: firebase.firestore.Query = ClothApi.getQueryRef(
//           queryObject,
//         );
//         if (_.isNil(nextDocuments)) {
//           queryRef = queryRef
//             .orderBy('createdAt', 'desc')
//             .limit(queryObject.numOfClothes);

//           queryRef
//             .get()
//             .then(querySnapshot => {
//               if (querySnapshot.docs.length !== 0) {
//                 const lastDocument =
//                   querySnapshot.docs[querySnapshot.docs.length - 1];

//                 nextDocuments = ClothApi.getQueryRef(queryObject)
//                   .orderBy('createdAt', 'desc')
//                   .startAfter(lastDocument)
//                   .limit(queryObject.numOfClothes);
//               }

//               const clothDatas: ClothData[] = [];
//               querySnapshot.forEach(doc => {
//                 // console.log(doc.id, ' => ', doc.data());
//                 clothDatas.push(doc.data() as ClothData);
//               });
//               _.sortBy(clothDatas, clothData => -clothData.createdAt);
//               console.log('clothDatas', clothDatas);
//               resolve(clothDatas);
//             })
//             .catch(error => {
//               console.error('Error getting documents: ', error);
//               reject();
//             });
//         } else {
//           nextDocuments
//             .get()
//             .then(documentSnapshots => {
//               const clothDatas: ClothData[] = [];
//               documentSnapshots.forEach(doc => {
//                 clothDatas.push(doc.data() as ClothData);
//               });
//               _.sortBy(clothDatas, clothData => -clothData.createdAt);

//               const lastDocument =
//                 documentSnapshots.docs[documentSnapshots.docs.length - 1];
//               console.log('lastDocument', lastDocument);
//               console.log('documentSnapshots.docs', documentSnapshots.docs);
//               nextDocuments = ClothApi.getQueryRef(queryObject)
//                 .orderBy('createdAt', 'desc')
//                 .startAfter(lastDocument)
//                 .limit(queryObject.numOfClothes);

//               resolve(clothDatas);
//             })
//             .catch(error => {
//               console.error('readByQuery()', error);
//               reject(error);
//             });
//         }
//       });
//     },
//   };
//   // firebaseCloth.storage.read();
//   public storage = {
//     // crud
//     create(clothId: string, file: File | Blob): Promise<void> {
//       return new Promise((resolve, reject) => {
//         clothRef
//           .child(clothId)
//           .put(file)
//           .then(snapshot => {
//             console.log('Uploaded a blob or file!');
//             resolve();
//           })
//           .catch(error => {
//             console.error('Error writing storage(clothImage): ', error);
//             reject(error);
//           });
//       });
//     },
//     read(clothId: string): Promise<string> {
//       return new Promise((resolve, reject) => {
//         clothRef
//           .child(clothId)
//           .getDownloadURL()
//           .then(url => {
//             // `url` is the download URL for 'images/stars.jpg'
//             resolve(url);

//             // Or inserted into an <img> element:
//             // let img = document.getElementById('myimg');
//             // img.src = url;
//           })
//           .catch(error => {
//             // Handle any errors
//             console.error('Error getting storage(clothImage): ', error);
//             reject(error);
//           });
//       });
//     },
//     // update() 필요하지않고, 덮어쓰기(create)하면 되지 않을까
//     delete(clothId: string): Promise<void> {
//       return new Promise((resolve, reject) => {
//         clothRef
//           .child(clothId)
//           .delete()
//           .then(() => {
//             // File deleted successfully
//             console.log('storage(clothImage) successfully deleted!');
//             resolve();
//           })
//           .catch(error => {
//             // Uh-oh, an error occurred!
//             console.error('Error removing storage(clothImage): ', error);
//             reject();
//           });
//       });
//     },
//   };
// }

// db, storage
class DiaryApi extends DefaultApi<DiaryData> {



  //
  constructor() {
    super('diaries');

    this.db.update = (data: DiaryData): Promise<void> => {
      return new Promise((resolve, reject) => {
        // content는 storage에 저장한다.
        this.db.collection
          .doc(data.id)
          .update({
            title: data.title,
            content: data.content
          })
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    };
  }

  public readByUserId(userId: string): Promise<DiaryData[]> {
    return new Promise((resolve, reject) => {
      console.log('readByUserId start', userId);
      this.db.collection
        .where('uid', '==', userId)
        .get()
        .then(querySnapshot => {
          console.log('querySnapshot', querySnapshot);
          const datas: DiaryData[] = [];
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data());
            datas.push(doc.data() as DiaryData);
          });
          resolve(datas);
        })
        .catch(error => {
          console.error('Error getting documents: ', error);
          reject(error);
        });
    });
  }
}

const diaryApi = new DiaryApi();
export default diaryApi;
