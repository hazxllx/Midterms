import express from 'express'; // Import Express framework
import { getUsers, createUser, getUser, deleteUser, updateUser } from '../controllers/users.js'; // Import user functions

const router = express.Router(); // Create router

router.get('/', getUsers); // Route to get all users
router.post('/', createUser); // Route to add a new user
router.get('/:id', getUser); // Route to get one user by ID
router.delete('/:id', deleteUser); // Route to remove a user
router.patch('/:id', updateUser); // Route to update a user

export default router; // Export the router