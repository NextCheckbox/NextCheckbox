<template lang="pug">
div
  section.section
    h1.title.is-1.is-2-mobile NextCheckbox
    p.subtitle An easy to use directory of services, resources, and guides for those in need in for Portland, OR

  section.section
    .columns.is-multiline
      Card.is-half-tablet.is-one-quarter-desktop(title='Community Resources' icon='store')
        | coming soon
      Card.is-half-tablet.is-one-quarter-desktop(title='Programs and Events' icon='calendar')
        | coming soon
      Card.is-half-tablet.is-one-quarter-desktop(title='Guides' icon='clipboard-check')
        | coming soon
      Card.is-half-tablet.is-one-quarter-desktop(title='News & Views' icon='newspaper')
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
