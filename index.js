import express from "express"; //Import Express web framework
import bodyParser from "body-parser"; //Import tool to process JSON data
import usersRoutes from "./routes/users.js"; //Import own user routes

const app = express(); //Create a new app
const PORT = 8000; //Set the port number

app.use(bodyParser.json()); //Set up app to understand JSON data

//Connects your /users route
app.use('/users', usersRoutes); //Connect all user routes to /users path

//Add a route for the homepage
app.get('/', (req, res) => {
    res.send('hello from homepage'); //Output this message when accessing the homepage
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`)); //Start the server