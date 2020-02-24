require('dotenv').config()
import faunadb from 'faunadb'
import chalk from 'chalk'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

/**
 * Get all resources
 */
exports.handler = (event, context, callback) => {
  return client
    .query(q.Paginate(q.Match(q.Index('allResources'))))
    .then((res) => {
      let data = res.data.map((ref) => {
        return q.Get(ref)
      })

      return client.query(data).then((ret) => {
        let data = {
          after: res.after,
          before: res.before,
          resources: ret
        }

        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(data)
        }
      })
    })
    .catch((err) => {
      console.log(chalk.red('Error getting all Resources:', err))
      return {
        statusCode: 400,
        body: JSON.stringify(err)
      }
    })
}
