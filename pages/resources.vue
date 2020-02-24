<template lang="pug">
div
  section.section
    h1.title.is-1.is-2-mobile Community Resources
    p.subtitle Find local services and resources serving your community

  section.section
    b-progress(v-if='isLoading')
    ResourceCard(v-for='(resource, key) in resources' :key='key' :resource='resource')
</template>

<script>
import mockResources from '~/mock/resources'
import ResourceCard from '~/components/resource/Card'

export default {
  components: {
    ResourceCard
  },

  data: () => ({
    isLoading: true,
    resources: []
  }),

  mounted() {
    let port = process.env.NODE_ENV === 'production' ? '' : ':9000'

    fetch(location.protocol + '//' + location.hostname + port + '/.netlify/functions/getAllResources', {
      method: 'GET'
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        let data = []
        res.resources.forEach((resource) => {
          data.push(resource.data)
        })
        this.resources = data
      })
      .catch((err) => {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: err.toString()
        })
      })
      .finally(() => {
        this.isLoading = false
      })
  }
}
</script>
