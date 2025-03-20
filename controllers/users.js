import { v4 as uuid } from 'uuid'; //Import the UUID package to create unique IDs
import fs from 'fs'; //Import file system tool to work with files

const filePath = './user.json'; //Set the location of our data file

//This function reads users from the file
const loadUsers = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8'); //Read the file
        return JSON.parse(data); //Convert text to JavaScript objects
    } catch (error) {
        return []; //If file doesn't exist, start with empty list
    }
};

//This function saves users to the file
const saveUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8'); //Save the data to file
};

let users = loadUsers(); //Load all users when the program starts

export const getUsers = (req, res) => {
    res.send(users); //Send all users back to whoever asked
};

export const createUser = (req, res) => {   
    const { name, description, price } = req.body; //Get the info from the request

    if (!name || !description || price === undefined) {
        return res.status(400).send({ message: "Name, description, and price are required" }); //Check if all info is provided
    }

    const newUser = { id: uuid(), name, description, price }; //Create a new user with a random ID
    users.push(newUser); //Add the new user to our list
    saveUsers(users); //Save the updated list to file

    res.sendStatus(201); //201 means "created"
};

export const getUser = (req, res) => {
    const user = users.find((u) => u.id === req.params.id); //Look for user with matching ID

    if (!user) {
        return res.status(404).send({ message: "User not found" }); //If not found, say so
    }

    res.send(user); //Send the user info back
};

export const deleteUser = (req, res) => { 
    const userExists = users.some((user) => user.id === req.params.id); //Check if user exists
    
    if (!userExists) {
        return res.status(404).send({ message: "User not found" }); //If not found
    }

    users = users.filter((user) => user.id !== req.params.id); //Remove the user from list
    saveUsers(users); 

    res.sendStatus(204); //204 means "deleted successfully"
};

export const updateUser = (req, res) => {
    const user = users.find((u) => u.id === req.params.id); //Find the user to update

    if (!user) {
        return res.status(404).send({ message: "User not found" }); 
    }

    user.name = req.body.name || user.name; //Update name if given
    user.description = req.body.description || user.description; //Update description
    user.price = req.body.price || user.price; //Update price 

    saveUsers(users); //Save changes to file

    res.sendStatus(200); //200 means "OK"
};