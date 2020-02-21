<template lang="pug">
  .card.m-b-lg
    header.card-header
      .card-header-title {{ resource.title }}
    .card-content
      .content {{ resource.content }}
</template>

<script>
export default {
  props: {
    resource: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
