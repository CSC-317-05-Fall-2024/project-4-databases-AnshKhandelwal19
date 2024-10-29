import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRestaurants, getRestaurant, getReviewsForRestaurant } from './data/restaurants.js'
import { backendRouter } from './routes/api.js';

//create express app and port variable
const app = express();
const PORT = process.env.PORT || 3000;

//create variables for paths to files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

//Mount api
app.use(express.json());
app.use('/api', backendRouter);

//App GET requests => Return html file for get requests to the different web pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

app.get('/new-restaurant', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'new-restaurant.html'));
});

//Create an ejs view within the express app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Render restaurant ejs file with imported data
app.get('/restaurants', async (req, res) => {
    const restaurantData = await getRestaurants();
    res.render('restaurants', { restaurantData });
});

//Render restaurant-details ejs file with specific restaurant id
app.get('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const restaurant = await getRestaurant(id);
    const reviews = await getReviewsForRestaurant(id);
    if(!restaurant) {
        res.render('404', {id});
    }
    else {
        res.render('restaurant-details', { restaurant, reviews });
    }
});

//Start listening on the port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});