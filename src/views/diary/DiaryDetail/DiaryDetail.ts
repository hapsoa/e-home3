import _ from 'lodash';
import firebase from '@/form/firebase';
// import IconModal from '@/components/IconModal.vue';
import { Component, Vue } from 'vue-property-decorator';
import { Diary } from '@/form/class';


@Component({
  // components: { IconModal }
})
export default class DiaryDetail extends Vue {
  // private id: string = this.$route.query.id as string;
  private diary: Diary = Diary.create();
  private diaryData = {};
  private dialog: boolean = false;

  private async initializeView() {
    console.log('initView');
    this.diary = await Diary.get(this.$route.query.id as string);
    console.log('this.diary', this.diary);
    this.diary.content = this.diary.content.split(/\n|\r|↵/).join('<br>');
  }
  private reviseDiary() {
    console.log('devise diary');
    this.$router.push({
      name: 'creating-diary',
      query: {
        diaryId: this.$route.query.id
      }
    });
  }
  private async deleteDiary() {

    this.$alertWindow.on({
      title: 'diary 삭제',
      message: '일기를 삭제하시겠습니까?',
      positive: '네',
      negative: '아니오',
      positiveAction: () => {
        try {
          this.diary.deleteDiary();
          this.$router.push({ name: 'diary' });
        } catch (error) {
          console.error('Error removing diary: ', error);
        }
      }
    });
  }

  private created() {
    if (!_.isNil(this.$store.state.myUser)) {
      this.initializeView();
    } else {
      this.$store.commit('saveMethod', this.initializeView);
    }
  }
}


