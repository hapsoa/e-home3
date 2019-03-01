<template>
  <div class="login-root">
    <div class="introduction">안녕하세요 나만의 공간
      <br>e-home 입니다
    </div>
    <!--form-->
    <!--input(type="text" placeholder="id")-->
    <!--input(type="password" placeholder="password")-->
    <!--input(type="submit" value="로그인")-->
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
