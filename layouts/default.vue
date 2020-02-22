<template lang="pug">
div
  nav.navbar.header.has-shadow.is-primary(role='navigation' aria-label='main navigation')
    .navbar-brand
      a.navbar-item(href='/')
        img(src='~assets/favicon-128.png' alt='Buefy' height='28')
        strong.m-l-sm NextCheckbox
      .navbar-burger(@click='isNavOpen = !isNavOpen')
        span
        span
        span

  section.main-content.columns
    aside.column.is-one-quarter-tablet.is-one-fifth-desktop.section(:class='{"is-hidden-mobile": !isNavOpen, "has-shadow": isNavOpen}')
      p.menu-label.is-hidden-mobile
        | Navigation
      ul.menu-list
        li(v-for='(item, key) of items' :key='key')
          nuxt-link(:to='item.to' exact-active-class='is-active')
            b-icon.m-r-sm(:icon='item.icon')
            | {{ item.title }}
    .container.column.is-three-quarters-tablet.is-four-fifths-desktop
      nuxt
</template>

<script>
export default {
  data() {
    return {
      isNavOpen: false,

      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Resources',
          icon: 'store',
          to: { name: 'resources' }
        }
      ]
    }
  },

  methods: {
    test () {
      this.isNavOpen = !this.isNavOpen
      console.log('test')
    }
  }
}
</script>

<style lang="scss">
aside.sidebar-visible {
  display: block !important;
}
</style>
