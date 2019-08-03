<template>
  <!-- .alert-dialog(v-if='use')
    .window
      .group
        .title {{option.title}}
        .message(v-html="option.message")
        .button-group
          .flex-empty
          .button.negative(v-if="negativeExist" @click="onReject()") {{option.negative}}
  .button.positive(v-if="positiveExist" @click="onResolve()") {{option.positive}}-->
  <v-dialog v-model="use" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">{{option.title}}</v-card-title>
      <v-card-text>{{option.message}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="negativeExist" color="green darken-1" flat @click="onReject()">Disagree</v-btn>
        <v-btn v-if="positiveExist" color="green darken-1" flat @click="onResolve()">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script src='./alert-window.ts'/>

<style scoped lang="scss">
</style>
