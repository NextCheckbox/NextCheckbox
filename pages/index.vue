<template lang="pug">
div
  section.section
    h1.title.is-1.is-2-mobile NextCheckbox
    p.subtitle An easy to use directory of services, resources, and guides for those in need in for Portland, OR

  section.section
    .columns.is-multiline
      nuxt-link.column.is-half-tablet.is-one-quarter-desktop(:to='{name: "resources"}')
        Card(title='Community Resources' icon='store' style='width: 100%')
          | Browse through all of our listed resources
      .column.is-half-tablet.is-one-quarter-desktop.ghosted
        Card(title='Programs and Events' icon='calendar')
          | coming soon
      .column.is-half-tablet.is-one-quarter-desktop.ghosted
        Card(title='Guides' icon='clipboard-check')
          | coming soon
      .column.is-half-tablet.is-one-quarter-desktop.ghosted
        Card(title='News & Views' icon='newspaper')
          | coming soon
</template>

<script>
import Card from '~/components/Card'

export default {
  components: {
    Card
  }
}
</script>
