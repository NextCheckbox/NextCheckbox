require('dotenv').config()
const faunadb = require('faunadb')
const chalk = require('chalk')
const insideNetlify = insideNetlifyBuildContext()
const q = faunadb.query

console.log(chalk.cyan('Creating FaunaDB Database...\n'))

// Check for secret
if (!process.env.FAUNADB_SECRET) {
  console.log(chalk.yellow('Required FAUNADB_SERVER_SECRET enviroment variable not found.'))
  console.log(`Make sure you have created your Fauna databse with "netlify addons:create fauna"`)
  console.log(`Then run "npm run functions:bootstrap" to setup your database schema`)
  if (insideNetlify) {
    process.exit(1)
  }
} else {
  createFaunaDB(process.env.FAUNADB_SECRET).then(() => {
    console.log(chalk.green('Fauna Database schema has been created'))
    console.log('Claim your fauna database with "netlify addons:auth fauna"')
  })
}

/**
 * Create our database
 */
function createFaunaDB(key) {
  const client = new faunadb.Client({
    secret: key
  })

  return client.query(q.CreateCollection({ name: 'Resource' }))
    .then(() => {
      return client.query(
        q.CreateIndex({
          name: 'allResources',
          source: q.Collection('Resource'),
          terms: [{field: ['data']}]
        }))
    }).catch((e) => {
      // Database already exists
      if (e.requestResult.statusCode === 400 && e.message === 'instance not unique') {
        console.log('Fauna already setup! Good to go')
        console.log('Claim your fauna database with "netlify addons:auth fauna"')
        throw e
      }
    })
}

/**
 * Checks if we're inside netlify
 */
function insideNetlifyBuildContext () {
  if (process.env.DEPLOY_PRIME_URL) {
    return true
  }
  return false
}
