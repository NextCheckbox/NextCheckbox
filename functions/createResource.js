require('dotenv').config()
import faunadb from 'faunadb'
import chalk from 'chalk'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

/**
 * Creates a Resource
 */
exports.handler = async (event, context, callback) => {
  // parse the string body into a useable JS object
  const data = JSON.parse(event.body)
  const resource = {
    data: data
  }

  console.log('Creating Resource', data)
  return client.query(q.Create(q.Collection('Resource'), resource))
    .then((response) => {
      console.log(chalk.green('Resource created'), response.data._id)
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify(response)
      }
    }).catch((err) => {
      console.log(chalk.red('Error creating resource:', err))
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
