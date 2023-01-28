// Main server code

import express from "express" // Js framework 
import cors from "cors" //helps with cross origon resource sharing
import reviews from "./api/reviews.route.js" 

const app = express() // Get access to express. Create variable to load express into.

app.use(cors()) // How we use middleware (different programs express uses to change how things work)
app.use(express.json()) // Allows server to accpet json in the body of a request. 

app.use("/api/v1/reviews", reviews) // Specifying initial routes. URL that you access to send and receive information. (, reviews specifies route that will be used from url)
app.use("*", (req, res) => res.status(404).json({error: "not found"})) // Backup route

export default app  //export app as a module, allows us to import app in the file that accesses the database