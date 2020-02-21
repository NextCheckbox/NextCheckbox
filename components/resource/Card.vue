<template lang="pug">
  .card.m-b-lg
    header.card-header
      .card-header-title {{ resource.title }}
    .card-content
      .content(v-html='markedContent')

      .card
        .card-content
          div(v-if='resource.requiresReferral')
            strong 🚨 Requires referral
          hr(v-if='resource.requiresReferral')
          div(v-if="resource.websiteUrl")
            strong.m-r-sm Website:
            a(:href="resource.websiteUrl") {{resource.websiteUrl}}
          div(v-if="resource.twitter")
            strong.m-r-sm Twitter:
            a(:href="'https://twitter.com/' + resource.twitter") @{{resource.twitter}}
          hr(v-if='resource.twitter || resource.website')
          div(v-if="resource.address")
            strong.m-r-sm Address:
            a(:href="'https://maps.google.com/?q=' + resource.address") {{resource.address}}
          div(v-if="resource.addressDetails")
            strong.m-r-sm Address Details:
            span {{resource.addressDetails}}
          div(v-if="resource.phone")
            strong Phone: {{resource.phone}}
          hr
          div.categories-list.d-print-none
            strong.m-r-sm Categories:
            NuxtLink.m-r-sm(v-for='(category, key) in resource.categories' :key='key' :to='{name: "resources", query: {category}}')
              img.m-r-sm(:src='"/img/map-icons/" + category + ".png"' style='vertical-align: middle')
              span {{category}}
            div(v-if='resource.tags && resource.tags.length')
              hr
              div
                strong.m-r-sm Tags:
                NuxtLink.m-r-sm(v-for='(tag, key) in resource.tags' :key='key' :to='{name: "resources", query: {tag}}')
                  span {{tag}}
                  span(v-if='key < resource.tags.length - 1') ,
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
