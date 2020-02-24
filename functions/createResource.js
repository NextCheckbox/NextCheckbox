require('dotenv').config({path: '../.env'})
import faunadb from 'faunadb'
import chalk from 'chalk'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  // parse the string body into a useable JS object
  const data = JSON.parse(event.body)
  console.log("Function `createResource` invoked", data)
  const resource = {
    data: data
  }

  return client.query(q.Create(q.Collection('Resource'), resource))
    .then((response) => {
      console.log(chalk.green('createResource success'))
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify(response)
      }
    }).catch((error) => {
      console.log(chalk.red('createResource error', error))
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
