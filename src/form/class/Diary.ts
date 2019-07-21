import uuidv1 from 'uuid/v1';
import firebase from '../firebase';
import _ from 'lodash';

export interface DiaryData {
  id: string;
  uid: string;
  date: number;
  index: number;
  title: string;
}

export default class Diary {
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
    diary.content = await firebase.diaryApi.storage.read(diary.data.id);
    return diary;
  }

  public static async getByUserId(userId: string) {
    const diaryDatas: DiaryData[] = await firebase.diaryApi.readByUserId(
      userId
    );
    const diaries = _.map(diaryDatas, diaryData => new Diary(diaryData));
    return diaries;
  }

  public data!: DiaryData;
  public content: string = '';

  private constructor(data: DiaryData) {
    this.data = data;
  }

  public async saveForCreate(userId: string) {
    this.data.uid = userId;
    this.data.date = new Date().getTime();
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
}
