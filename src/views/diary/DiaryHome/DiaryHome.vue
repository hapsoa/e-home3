<template>
  <div class="diary-root">
    <nav>
      <input type="text" placeholder="search" />
      <v-btn color="info" @click="$router.push({name: 'creating-diary'})">일기 쓰기</v-btn>
    </nav>
    <div class="diaries">
      <div
        class="diary"
        v-for="(diary) in diaries"
        :key="diary.data.id"
        @click="lookDiary(diary.data.id)"
      >{{diary.data.title}}</div>
    </div>
    <div class="text-xs-center">
      <v-pagination v-model="page" :length="pageLength"></v-pagination>
    </div>
  </div>
</template>

<script lang="ts" src='./DiaryHome.ts'/>

<style scoped lang="scss">
@import './DiaryHome.scss';
</style>
