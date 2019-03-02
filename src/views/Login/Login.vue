<template>
  <div class="login-root">
    <div class="introduction">안녕하세요
      <br>e-home 입니다
    </div>
    <v-btn color="info" @click="login">구글로 로그인</v-btn>
  </div>
</template>

<script lang='ts' src='./Login.ts'/>


<style scoped lang="scss">
.login-root {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
  > button {
    margin-top: 40px;
  }
}
</style>
