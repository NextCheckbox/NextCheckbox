require('dotenv').config({path: '../.env'})
import faunadb from 'faunadb'

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
      console.log("success", response)
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    }).catch((error) => {
      console.log("error", error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
}
