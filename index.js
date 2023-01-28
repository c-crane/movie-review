// database code
// Create environment variables (used for passwords(Only stored in environement, Don't leave passwords in code))

import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js" // (DAO) Data Access Object - seperates a data resource client interface from its data acccess mechanisms 

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME']
const mongo_password = process.env['MONGO_PASSWORD']
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.6b08e9n.mongodb.net/?retryWrites=true&w=majority`

const port = 8000

// Connect to database
MongoClient.connect(
  uri,
  {
    maxPoolSize: 50, // Amount of people that can be connected at one time
    wtimeoutMS: 2500, // How long a connection can try to connect before it times out
    useNewUrlParser: true
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  }) // catches errors that could happen 
  .then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })