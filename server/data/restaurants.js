import { pool } from "../config/database.js";

// Get a list of restaurants
const getRestaurants = async () => {
    try {
        const result = await pool.query(`SELECT * FROM restaurants`);
        return result.rows;
    } catch (error) {
        console.error( error.message )
    }
};

// Get a restaurant by id
const getRestaurant = async (id) => {
    try {
        const result = await pool.query(`SELECT name, phone, address, photo FROM restaurants WHERE id=$1`, [id]);
        return result.rows[0];
    } catch (error) {
        console.error( error.message )
    }
};

// Create a new restaurant entry
const createRestaurant = async (newRestaurant) => {
    const {name, phone, address, photo} = newRestaurant;
    if(!photo) photo = "images/no_image.png";
    try {
        const result = await pool.query(`
            INSERT INTO restaurants (name, phone, address, photo)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `, [name, phone, address, photo]
        );
        return result.rows[0];
    } catch (error) {
        console.error( error.message )
    }
};

const getReviewsForRestaurant = async(id) => {
    try {
        const result = await pool.query(`SELECT * FROM reviews WHERE restaurant_id=$1`, [id]);
        return result.rows;
    } catch (error) {
        console.error( error.message )
    }
};

// Delete a restaurant by id
const deleteRestaurant = async (id) => {
    try {
        const length = (await getRestaurants()).length;
        await pool.query(`DELETE FROM reviews WHERE restaurant_id=$1`,[id]);
        await pool.query(`DELETE FROM restaurants WHERE id=$1`,[id]);
        const newLength = (await getRestaurants()).length;
        if(newLength === length)
            console.log(`Restaurant ${id} not found`);
    } catch (error) {
        console.error( error.message )
    }
};

export { getRestaurants, getRestaurant, createRestaurant, getReviewsForRestaurant, deleteRestaurant };