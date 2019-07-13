<template>
  <div class="diary-detail">
    <div class="crud-button-zone">
      <v-btn flat icon color="#aaa" @click="reviseDiary">
        <v-icon>create</v-icon>
      </v-btn>
      <icon-modal
        :cardTitle="'일기 삭제'"
        :cardText="'일기를 삭제하시겠습니까? 삭제를 하시면 복원할 수 없습니다.'"
        :agreeListener="deleteDiary"
      />
    </div>
    <div class="detail-view" v-html="diaryData.contents"></div>
    <v-btn color="#bbb" @click="$router.go(-1)">돌아가기</v-btn>
  </div>
</template>

<script lang="ts" src='./DiaryDetail.ts'>
</script>

<style scoped lang="scss">
.diary-detail {
  width: 100%;
  // height: 100%;
  > .crud-button-zone {
    display: flex;
    justify-content: flex-end;
  }
  > .detail-view {
    min-height: 500px;
    margin: 30px;
    padding: 10px;
    border: 1px solid #ddd;
  }
  > .v-btn {
    float: right;
  }
}
</style>
