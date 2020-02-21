<template lang="pug">
  .card.m-b-lg
    header.card-header
      .card-header-title {{ resource.title }}
    .card-content
      .content(v-html='markedContent')
</template>

<script>
import * as marked from 'marked'

export default {
  props: ['resource'],

  computed: {
    markedContent() {
      return marked(this.resource.content)
    }
  }
}
</script>
