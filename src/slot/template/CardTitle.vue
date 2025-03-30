<template lang="pug">
v-card-title.d-flex.justify-space-between.align-center
  slot(name="title")
  .button-container
    slot(name="title-button")
</template>
<style lang="sass" scoped>
.main_box
  .v-card-title
    background-color: #ffffff
    color: #000000
    border-radius: 8px 8px 0 0
</style>