# nextcheckbox

> A platform for connecting with social services

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Deployment

- Create a [Netlify account](https://www.netlify.com/)
- Install Netlify CLI: `npm i netlify-cli -g`
- From project root: `netlify init`
- Connect to a Netlify site
- Create a FaunaDB instance for the project: `netlify addons:create fauna`
- Sign up or login in to Fauna: `netlify addons:auth fauna`
- Use default db name, then rename it if you wish

### Learn more about these steps
- [FaunaDB for Netlify quickstart](https://www.netlify.com/blog/2019/09/10/announcing-the-faunadb-add-on-for-netlify/)
- [FaunaDB addon for Netlify](https://docs.fauna.com/fauna/current/start/netlify)
