<template lang="pug">
v-card.model_card
  .tbody_wrapper
    .tbody_box
      slot(name="table-body")
    .pagination_content
      slot(name="pagination")
</template>
<style lang="sass" scoped>
@import ../../styles/_mixin
@import ../../styles/_variables
.model_card
  box-shadow: none
.tbody_wrapper
  // border: 2px solid green
  height: 100%
  padding: 10px 5px

.tbody_box
  height: auto
  max-height: calc(100% - 60px)
  overflow: auto
  @include scrollBar(4, $blue-grey-lighten-5, $blue-grey-lighten-3)
  // border: 4px solid red
  padding-right: 5px
</style>