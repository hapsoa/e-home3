import _ from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import { Diary } from '@/form/class';

@Component({
  components: {}
})
export default class DiaryHome extends Vue {
  private diaries: object[] = [];
  private page: number = 1;
  private pageLength: number = 0;

  private async created() {
    this.$store.commit('saveMethod', async () => {
      console.log('created', this.$store.state.user);
      console.log('####');
      this.diaries = await Diary.getByUserId(this.$store.state.user.data.uid);
      console.log('diaries', this.diaries);
    });
  }

  private lookDiary(diaryId: string) {
    this.$router.push({ name: 'diary-detail', query: { id: diaryId } });
  }
}
