<template lang="pug">
  div
    section.section
      h1.title.is-1.is-2-mobile Admin
      p.subtitle Adminstration and database management tools

    section.section
      .columns.is-multiline
        .column.is-half-tablet
          h2.title Import Resources
          p Imports data in the form:
          pre.m-b-md.m-t-md
            code.
              {
                "Resource": {
                  "id1": {...},
                  "id2": {...},
                  ...
                }
              }
          b-field
            b-input(type='textarea' v-model='importResourceJSON')
          b-progress(v-if='isImportingResources' show-value format='percent' :value='progress')
          b-button(type='is-primary' :loading='isImportingResources' @click='importResources') Import JSON
        .column.is-half-tablet()
</template>

<script>
export default {
  data: () => ({
    progress: 0,
    importResourceJSON: '',
    isImportingResources: false
  }),

  methods: {
    /**
     * Imports resources from a JSON in the form: {resource: {id1: {}, id2: {}}}
     */
    importResources() {
      this.isImportingResources = true
      let json = {}

      // Attempt to parse JSON
      try {
        json = JSON.parse(this.importResourceJSON)
      } catch (e) {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'Invalid JSON'
        })
        this.isImportingResources = false
        return
      }

      if (!json.Resource) {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'JSON does not contain a root .resource'
        })
      }

      // Create one document for every resource
      this.progress = 0
      const keys = Object.keys(json.Resource)
      let numWaiting = keys.length
      let data = {}

      keys.forEach((key) => {
        let resource = json.Resource[key]
        let port = process.env.NODE_ENV === 'production' ? '' : ':9000'

        fetch(location.protocol + '//' + location.hostname + port + '/.netlify/functions/createResource', {
          body: JSON.stringify(json.Resource[key]),
          method: 'POST'
        })
          .catch((err) => {
            this.$buefy.toast.open({
              type: 'is-danger',
              message: err.toString()
            })
          })
          .finally(() => {
            --numWaiting
            this.progress = (1 - numWaiting / keys.length) * 100
            if (!numWaiting) {
              this.isImportingResources = false
              this.$buefy.toast.open({
                type: 'is-success',
                message: 'Import complete'
              })
            }
          })
      })
    }
  }
}
</script>
