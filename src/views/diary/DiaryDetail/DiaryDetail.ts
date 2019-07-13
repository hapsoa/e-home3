import _ from 'lodash';
import firebase from '@/form/firebase';
// import IconModal from '@/components/IconModal.vue';
import { Component, Vue } from 'vue-property-decorator';
import { Diary } from '@/form/class';


@Component({
  // components: { IconModal }
})
export default class DiaryDetail extends Vue {
  private id: string = this.$route.query.id as string;
  private diary!: Diary;
  private diaryData = {};
  private dialog: boolean = false;

  private async initializeView() {
    this.diary = await Diary.get(this.id);
    // this.diaryData.contents = this.diaryData.contents.split(/\n|\r|↵/).join('<br>');
  }
  private reviseDiary() {
    console.log('devise diary');
    this.$router.push({
      name: 'writing-diary', query: {
        diaryData: this.diaryData,
        diaryId: this.id,
      } as any
    });
  }
  private async deleteDiary() {
    // try {
    //   this.diary.deleteDiary(this.id);
    //   this.$router.push({ name: 'diary' });
    // } catch (error) {
    //   console.error('Error removing diary: ', error);
    // }
  }

  private created() {
    if (!_.isNil(firebase.auth.getCurrentUser())) {
      this.initializeView();
    } else {
      this.$store.commit('saveMethod', this.initializeView);
    }
  }
}

// {
//   components: {

//   },
//   data(): any {
//     return {
//       id: this.$route.query.id,
//       diaryData: {},
//       dialog: false,
//     };
//   },
//   methods: {
//     async initializeView() {
//       this.diaryData = await this.$firebase.database.getDiary(this.id);
//       this.diaryData.contents = this.diaryData.contents.split(/\n|\r|↵/).join('<br>');
//     },
//     reviseDiary() {
//       console.log('devise diary');
//       this.$router.push({
//         name: 'writing-diary', query: {
//           diaryData: this.diaryData,
//           diaryId: this.id,
//         } as any
//       });
//     },
//     async deleteDiary() {
//       try {
//         await firebase.database.deleteDiary(this.id);
//         this.$router.push({ name: 'diary' });
//       } catch (error) {
//         console.error('Error removing diary: ', error);
//       }
//     },
//   },
//   created() {
//     if (!_.isNil(firebase.auth.getCurrentUser())) {
//       this.initializeView();
//     } else {
//       this.$store.commit('saveMethod', this.initializeView);
//     }
//   },
// };
