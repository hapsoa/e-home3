import uuidv1 from 'uuid/v1';
import { DefaultData } from '../firebase/DefaultApi';
import firebase from '../firebase';
import _ from 'lodash';

export interface DiaryData extends DefaultData {
  id: string;
  uid: string;
  date: number;
  index: number;
  title: string;
  content: string;
}

export default class Diary {
  public static create() {
    return new Diary({
      id: uuidv1(),
      uid: '', // 현재 로그인된 유저의 id
      date: 0,
      index: 0,
      title: '',
      content: ''
    });
  }

  public static async get(diaryId: string) {
    const diaryData: DiaryData = await firebase.diaryApi.read(diaryId);
    const diary = new Diary(diaryData);
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

  private constructor(data: DiaryData) {
    this.data = data;
  }

  public saveForCreate(userId: string) {
    this.data.uid = userId;
    this.data.date = new Date().getTime();
    firebase.diaryApi.create(this.data);
  }
  public saveForUpdate() {
    firebase.diaryApi.update(this.data);
  }
}
