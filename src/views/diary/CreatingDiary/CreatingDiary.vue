<template>
  <div class="making-memo-root">
    <form>
      <label>제목</label>
      <input type="text" v-model="diary.data.title" :placeholder="diaryDate" />
    </form>
    <div class="editors">
      <textarea v-if="editorType === 'normal-editor'" v-model="diary.content" />
    </div>
    <div class="controller">
      <v-btn @click="$router.go(-1)" flat>취소</v-btn>
      <!-- 데이터베이스에 메모 내용을 저장시키고, 해당 내용을 보여 준다.-->
      <v-btn @click="saveDiary" flat>저장</v-btn>
    </div>
  </div>
</template>

<script lang="ts" src="./CreatingDiary.ts">
</script>

<style scoped lang="scss">
@import './CreatingDiary.scss';
</style>
