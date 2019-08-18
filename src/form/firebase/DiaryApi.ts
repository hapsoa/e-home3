// TODO style-weather-cms 에서 가져온 양식대로 바꾸기.
import _ from 'lodash';
import firebase from './initializingFirebase';
import { DiaryData } from '../class/Diary';
import DefaultApi from './DefaultApi';

const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.firestore();
const storage = firebase.storage();
const storageRef = firebase.storage().ref();
const diaryRef = storageRef.child('diary');
// var spaceRef = imagesRef.child(fileName);

// db, storage
class DiaryApi extends DefaultApi<DiaryData> {
  constructor() {
    super('diaries');

    this.db.update = (id: string, data: DiaryData): Promise<void> => {
      return new Promise((resolve, reject) => {
        // content는 storage에 저장한다.
        this.db.collection
          .doc(id)
          .update({
            title: data.title,
          })
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    };

    this.db.readUserLastDiary = (userId: string) => {
      //
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

  public async getDiaryPerPage(pageData: {
    pageNumber: number;
    lastDiaryIndex: number;
  }) {
    const user = firebase.auth().currentUser;
    const diaries: object[] = [];

    if (!_.isNil(user)) {
      const diaryFromDb = await this.db.collection
        .doc(user.uid)
        .collection('diary')
        .orderBy('index', 'desc')
        .startAt(pageData.lastDiaryIndex - (pageData.pageNumber - 1) * 10)
        .limit(10)
        .get();

      diaryFromDb.forEach(doc => {
        const diaryData: { id: string } = { id: '' };
        Object.assign(diaryData, doc.data());
        diaryData.id = doc.id;
        diaries.push(diaryData);
      });
      // console.log('diaryFromDb diaries', diaries);
      return diaries;
    } else {
      console.error('no logined user');
      return null;
    }
  }

  /**
   * 페이지별 해당 user의 diaryData를 가져오는 함수이다.
   * @param o.userId: userId
   * @param pageNumber: 현재 페이지
   * @param 해당 user의 마지막 diary index
   * @param 페이지당 diary의 수
   */
  public readByPage(o: {
    userId: string,
    pageNumber: number,
    lastDiaryIndex: number,
    numOfDiariesPerPage: number
  }): Promise<DiaryData[]> {
    return new Promise((resolve, reject) => {
      console.log('1234', o);
      this.db.collection
        .where('uid', '==', o.userId)
        .orderBy('index', 'desc')
        .startAt(o.lastDiaryIndex - (o.pageNumber - 1) * o.numOfDiariesPerPage)
        .limit(o.numOfDiariesPerPage)
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

  public readUserLastDiaryData(userId: string): Promise<DiaryData> {
    return new Promise((resolve, reject) => {
      console.log('userId', userId);
      this.db.collection
        .where('uid', '==', userId)
        .orderBy('index', 'desc')
        .limit(1)
        .get()
        .then(querySnapshot => {
          console.log('querySnapshot', querySnapshot);
          let data!: DiaryData;
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data());
            data = doc.data() as DiaryData;
          });
          resolve(data);
        })
        .catch(error => {
          console.error('readUserLastDiaryData() Error', error);
          reject(error);
        });
    });
  }
}

const diaryApi = new DiaryApi();
export default diaryApi;
