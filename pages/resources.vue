<template lang="pug">
div
  section.section
    h1.title.is-1.is-2-mobile Community Resources
    p.subtitle Find local services and resources serving your community

  section.section
    ResourceCard(v-for='(resource, key) in resources.resource' :key='key' :resource='resource')
</template>

<script>
import mockResources from '~/mock/resources'
import ResourceCard from '~/components/resource/Card'

export default {
  components: {
    ResourceCard
  },

  data: () => ({
    resources: mockResources
  })
}
</script>
