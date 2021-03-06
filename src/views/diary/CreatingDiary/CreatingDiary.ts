import _ from 'lodash';

import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import { Diary } from '@/form/class';

@Component({})
export default class CreatingDiary extends Vue {
  private diaryDate: string = new Date().toLocaleDateString() + '(시간포함)';
  private diary: Diary = Diary.create();

  private editorType: string = 'normal-editor'; // normal-editor, ...

  /**
   * diary를 저장하는 함수이다.
   */
  private async saveDiary() {
    // 마지막 index를 가지고 있는지 확인
    if (_.isNil(this.$store.state.lastDiaryIndex)) {
      // await this.$store.dispatch('setLastDiaryIndex');
      const lastDiary: Diary = await Diary.getLastDiary(this.$store.state.myUser.data.uid);
      this.$store.state.lastDiaryIndex = lastDiary.data.index;
    }

    // index를 확인할 수 있도록 database를 조정하는데

    // 일기제목 확인
    if (this.diary.data.title === '') {
      this.diary.data.title = new Date().toLocaleString();
    }

    // 새로 글 쓰는 상황일 때
    if (_.isNil(this.$route.query.diaryId)) {
      try {
        await this.diary.saveForCreate(this.$store.state.myUser.data.uid, this.$store.state.lastDiaryIndex);

        this.$store.state.lastDiaryIndex += 1;
      } catch (error) {
        console.error('saveDiary에서 saveForCreate() 에러남', error);
      }
    } else {
      // 수정하는 상황일 때
      await this.diary.saveForUpdate();
    }

    this.$router.push({ name: 'diary' });
  }

  private async created() {
    // query가 있으면 가지고 온다.
    const diaryId: string = this.$route.query.diaryId as string;
    if (_.isNil(this.$route.query.diaryId)) {
      this.diary = Diary.create();
    } else {
      this.diary = await Diary.get(diaryId);
    }
  }
}

// export default {
//   name: 'MakingMemo',
//   components: {
//     // Use the <ckeditor> component in this view.
//     // ckeditor: CKEditor.component
//   },
//   data() {
//     return {
//       diaryTitle: '',
//       diaryDate: new Date().toLocaleDateString() + '(시간포함)',
//       diaryContents: '',

//       editorData: '',
//       editorConfig: {
//         // The configuration of the editor.
//       },

//       editorType: 'ckeditor' // normal-editor, ckeditor, slide
//     };
//   },
//   methods: {
//     /**
//      * db로 diary 정보 보내기
//      */
//     async sendDiary() {
//       // 마지막 index를 가지고 있는지 확인
//       if (_.isNil(this.$store.state.lastDiaryIndex)) {
//         await this.$store.dispatch('setLastDiaryIndex');
//       }

//       // 일기제목 확인
//       if (this.diaryTitle === '') {
//         this.diaryTitle = new Date().toLocaleString();
//       }

//       // 새로 글 쓰는 상황일 때
//       if (_.isNil(this.$route.query.diaryData)) {
//         try {
//           // 무슨 에디터를 사용하는지
//           // if (this.editorType === 'normal-editor') {
//           //     firebase.database.setDiary({
//           //       title: this.diaryTitle,
//           //       contents: this.diaryContents,
//           //       index: this.$store.state.lastDiaryIndex + 1,
//           //     });
//           //     this.$store.commit('addLastDiaryIndex');
//           // } else if (this.editorType === 'ckeditor') {
//           //     firebase.database.setDiary({
//           //       title: this.diaryTitle,
//           //       contents: this.editorData,
//           //       index: this.$store.state.lastDiaryIndex + 1,
//           //     });
//           //     this.$store.commit('addLastDiaryIndex');
//           // }
//           // else if (this.editorType === 'slide') {
//           // }
//         } catch (error) {
//           console.error(error);
//         }
//       } else {
//         // 수정하는 상황일 때
//         if (this.editorType === 'normal-editor') {
//           // firebase.database.reviseDiary(this.$route.query.diaryId);
//         } else if (this.editorType === 'ckeditor') {
//           // ckeditor
//           // firebase.database.reviseDiary({
//           //   id: this.$route.query.diaryId as string,
//           //   title: this.diaryTitle,
//           //   contents: this.editorData,
//           // });
//         }
//       }

//       this.$router.push({ name: 'diary' });
//     },
//     showCkeditorContents() {
//       console.log(this.editorData);
//     }
//   },
//   created() {
//     console.log('query : ', this.$route.query.diaryData);

//     if (!_.isNil(this.$route.query.diaryData)) {
//       console.log('data exist');
//       // this.diaryTitle = this.$route.query.diaryData.title;
//       // this.editorData = this.$route.query.diaryData.contents;
//       // this.editorType = this.$route.query.diaryData.type;
//     } else {
//       console.log('data not exist');
//     }
//   }
// };
