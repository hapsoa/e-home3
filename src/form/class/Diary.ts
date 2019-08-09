import uuidv1 from 'uuid/v1';
import firebase from '../firebase';
import _ from 'lodash';
import { User } from '.';

export interface DiaryData {
  id: string;
  uid: string;
  date: number;
  index: number;
  title: string;
}

export default class Diary {
  /**
   * Diary instance를 생성한다.
   */
  public static create() {
    return new Diary({
      id: uuidv1(),
      uid: '', // 현재 로그인된 유저의 id
      date: 0,
      index: 0,
      title: '',
    });
  }

  public static async get(diaryId: string) {
    const diaryData: DiaryData = await firebase.diaryApi.db.read(diaryId);
    const diary = new Diary(diaryData);
    // diary.content = await firebase.diaryApi.storage.read(diary.data.id);
    diary.content = await firebase.diaryApi.storage.readString(diary.data.id);
    return diary;
  }

  public static async getByUserId(userId: string) {
    const diaryDatas: DiaryData[] = await firebase.diaryApi.readByUserId(
      userId
    );
    const diaries = _.map(diaryDatas, diaryData => new Diary(diaryData));
    return diaries;
  }

  public static async getByPage(o: {
    userId: string,
    pageNumber: number,
    lastDiaryIndex: number,
    numOfDiariesPerPage: number
  }): Promise<Diary[]> {
    const diaryDatas = await firebase.diaryApi.readByPage(o);
    const diaries = _.map(diaryDatas, diaryData => new Diary(diaryData));
    return diaries;
  }

  /**
   * 해당 유저의 마지막 diary instance를 가지고 온다.
   * (content는 안가지고 오도록 하였다.)
   * @param userId
   */
  public static getLastDiary(userId: string): Promise<Diary> {
    return new Promise((resolve, reject) => {
      firebase.diaryApi.readUserLastDiaryData(userId)
        .then(diaryData => {
          resolve(new Diary(diaryData));
        })
        .catch(error => {
          // lastdiary가 없는 경우를 생각해야 한다
          reject(error);
        });
    });
  }

  public data!: DiaryData;
  public content: string = '';

  private constructor(data: DiaryData) {
    this.data = data;
  }

  public async saveForCreate(userId: string, lastUserDiaryIndex: number) {
    this.data.uid = userId;
    this.data.date = new Date().getTime();
    this.data.index = lastUserDiaryIndex + 1;
    const promises = [
      firebase.diaryApi.db.create(this.data.id, this.data),
      firebase.diaryApi.storage.createString(this.data.id, this.content)
    ];
    try {
      await Promise.all(promises);
      return;
    } catch (error) {
      Promise.reject(error);
    }
  }
  public async saveForUpdate() {
    const promises = [
      firebase.diaryApi.db.update(this.data.id, this.data),
      firebase.diaryApi.storage.createString(this.data.id, this.content)
    ];
    try {
      await Promise.all(promises);
      return;
    } catch (error) {
      Promise.reject(error);
    }
  }

  /**
   * 해당 instance의 정보를 db와 storage에서 삭제한다.
   */
  public deleteDiary(): Promise<void> {
    return new Promise((resolve, reject) => {
      const promises = [
        firebase.diaryApi.db.delete(this.data.id),
        firebase.diaryApi.storage.delete(this.data.id)
      ];

      Promise.all(promises)
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
