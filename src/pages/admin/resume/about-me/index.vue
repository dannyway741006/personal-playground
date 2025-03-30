<template lang="pug">
v-sheet
  v-card.mx-auto(subtitle="Front End Engineer", title="Wilson")
    template(v-slot:prepend)
      v-avatar(size="150", image="https://cdn.vuetifyjs.com/images/john.jpg")
  v-card-text
    h3 {{ `擁有3~4+年經驗的 Frond-End Developer :` }}
    ul(style="list-style-type: decimal")
      li {{ `規劃與實作模組化內容管理系統（CMS），統一後台模板架構，提升可重用性，並提供具備後台管理與資料維護需求的專案使用，以降低重複開發成本並提升開發效率。` }}
      li {{ `曾參與鴻海及英業達環控系統規劃及開發。` }}
      li {{ `近期完成專案為英業達環控系統。` }}
      li {{ `參與過各種不同產業的網站規劃及應用程式開發，可獨立完成前端開發項目。` }}
      li {{ `具備8人以上團隊協作經驗，負責前端架構整體規劃。` }}
      li {{ `具備自主學習及解決問題的能力，目前學習方向:` }}
        ul(style="list-style-type: disc")
          li {{ `Dart 基礎語法(變數、資料型別、控制流程)、Functions and Object-Oriented Programming (OOP)應用、相關套件安裝(pub.dev)。` }}
          li {{ `Flutter 框架應用，現階段先以Widget基礎進行學習，StatelessWidget、StatefulWidget、佈局 Row、Column、Stack。` }}
          li {{ `TypeScript 型別定義及函式泛型的應用。` }}
</template>
<script lang="ts">
export default {
  name: "AboutMe",
};
</script>
<script lang="ts" setup>
</script>
<style lang="sass" scoped>
ul
  list-style-type: disc
</style>