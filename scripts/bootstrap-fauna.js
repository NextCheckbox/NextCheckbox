require('dotenv').config()
const faunadb = require('faunadb')
const chalk = require('chalk')
const insideNetlify = insideNetlifyBuildContext()
const q = faunadb.query
let client

// Check for secret
if (!process.env.FAUNADB_SECRET) {
  console.log(chalk.yellow('Required FAUNADB_SERVER_SECRET enviroment variable not found.'))
  console.log(`Make sure you have created your Fauna databse with "netlify addons:create fauna"`)
  console.log(`Then run "npm run functions:bootstrap" to setup your database schema`)
  if (insideNetlify) {
    process.exit(1)
  }
} else {
  createFaunaDB(process.env.FAUNADB_SECRET)
}

/**
 * Create our database
 */
function createFaunaDB(key) {
  client = new faunadb.Client({
    secret: key
  })

  console.log(chalk.cyan('Creating "Resource" collection'))
  return client.query(q.CreateCollection({ name: 'Resource' })).then(() => {
    // Create Index
    return createIndexes()
  }).catch((e) => {
    console.log(chalk.red(e))
    createIndexes()
  })
}

function createIndexes () {
  console.log(chalk.cyan('Creating "allResources" index'))
  return client.query(
    q.CreateIndex({
      name: 'allResources',
      source: q.Collection('Resource'),
      terms: [{field: ['data']}]
    })).catch((e) => {
      console.log(chalk.red(e))
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
