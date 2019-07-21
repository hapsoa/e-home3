<template>
  <div class="diary-detail">
    <v-layout column mx-3>
      <div>{{diary.data.title}}</div>
      <v-layout justify-end>
        <v-btn flat icon color="#aaa" @click="reviseDiary">
          <v-icon>create</v-icon>
        </v-btn>
      </v-layout>
      <div class="crud-button-zone">
        <!-- <icon-modal
        :cardTitle="'일기 삭제'"
        :cardText="'일기를 삭제하시겠습니까? 삭제를 하시면 복원할 수 없습니다.'"
        :agreeListener="deleteDiary"
        />-->
      </div>

      <div class="detail-view" v-html="diary.content"></div>
      <v-layout justify-end>
        <v-btn color="#bbb" @click="$router.go(-1)">돌아가기</v-btn>
      </v-layout>
    </v-layout>
  </div>
</template>

<script lang="ts" src='./DiaryDetail.ts'>
</script>

<style scoped lang="scss">
@import './DiaryDetail.scss';
</style>
