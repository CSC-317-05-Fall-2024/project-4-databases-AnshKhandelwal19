import express from 'express';
import { createRestaurant, deleteRestaurant, editRestaurant } from '../data/restaurants.js'
import { pool } from '../config/database.js'

const router = express.Router();

// Add routes here

router.post('/restaurants', (req, res) => {
    const newRestaurant = req.body;
    try{
        const restuarant = createRestaurant(newRestaurant);

        //Add restaurant to database

        const insertQuery = `
        INSERT INTO restaurants (name, phone, address, photo)
        VALUES
            ('${restuarant.name}', '${restuarant.phone}', '${restuarant.address}', '${restuarant.photo}')
        `;
        pool.query(insertQuery);
        res.status(200).json(restuarant);
    }catch(error) {
        res.status(500).json({"message": `${error}`});
    };
});

router.patch('/restaurants/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const newData = req.body;
    try{
        const restuarant = editRestaurant(id, newData);
        res.status(200).json(restuarant);
    }catch(error) {
        res.status(500).json({"message": `${error}`});
    };
});

router.delete('/restaurants/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try{
        const restuarant = deleteRestaurant(id);
        res.status(200).json();
    }catch(error) {
        res.status(500).json({"message": `${error}`});
    };
});

export {router as backendRouter};