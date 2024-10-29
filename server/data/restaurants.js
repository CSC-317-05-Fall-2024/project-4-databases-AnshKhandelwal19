import { pool } from "../config/database.js";

// Get a list of restaurants
const getRestaurants = async () => {
    const result = await pool.query(`SELECT * FROM restaurants`);
    return result.rows;
};

// Get a restaurant by id
const getRestaurant = async (id) => {
    const result = await pool.query(`SELECT name, phone, address, photo FROM restaurants WHERE id = ${id}`);
    const restaurant = result.rows[0];
    const ret = {
        ...restaurant
    }
    console.log(restaurant);
    return ret;
};

// Create a new restaurant entry
const createRestaurant = async (newRestaurant) => {
    let restaurant = {
        photo: "images/no_image.png",
        ...newRestaurant
    };
    await pool.query(`
        INSERT INTO restaurants (name, phone, address, photo)
        VALUES ('${restaurant.name}', '${restaurant.phone}', '${restaurant.address}', '${restaurant.photo}')
        `
    );
    await update();
    return restaurant;
};

// Delete a restaurant by id
const deleteRestaurant = async (id) => {
    const length = (await getRestaurants()).length;
    await pool.query(`DELETE FROM restaurants WHERE id=${id}`);
    await pool.query(`DELETE FROM reviews WHERE restaurant_id=${id}`);
    const newLength = (await getRestaurants()).length;
    if(newLength === length)
        console.log(`Restaurant ${id} not found`);
};

export { getRestaurants, getRestaurant, createRestaurant, editRestaurant, deleteRestaurant };