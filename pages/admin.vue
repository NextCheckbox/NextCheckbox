<template lang="pug">
  div
    section.section
      h1.title.is-1.is-2-mobile Admin
      p.subtitle Adminstration and database management tools

    section.section
      .columns.is-multiline
        .column.is-half-tablet
          h2.title Import Resources
          p Imports data in the form
          pre.m-b-md.m-t-md
            code.
              {
                "resource": {
                  "id1": {...},
                  "id2": {...},
                  ...
                }
              }
          b-field
            b-input(type='textarea' v-model='importResourceJSON')
          b-button(type='is-primary' :loading='isImportingResources' @click='importResources') Import JSON
        .column.is-half-tablet()
</template>

<script>
export default {
  data: () => ({
    importResourceJSON: '',
    isImportingResources: false
  }),

  methods: {
    /**
     * Imports resources from a JSON in the form: {resource: {id1: {}, id2: {}}}
     */
    importResources () {
      this.isImportingResources = true
      let json = {}

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

      if (!json.resource) {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'JSON does not contain a root .resource'
        })
      }

      Object.keys(json.resource).forEach(key => {
        console.log(key)
      })
      this.isImportingResources = false
    }
  }
}
</script>
