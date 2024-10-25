/* Initialize the data in the DB */
import { pool } from './database.js';

const dropTables = async () => {
    try {
        const dropTablesQuery = `
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
    } catch (error) {
        console.log(error)
    }
}

const createTables = async () => {
    try {
        const createTablesQuery = `
            CREATE TABLE IF NOT EXISTS restaurants (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                address TEXT NOT NULL,
                photo TEXT NOT NULL
            );
        `;
        await pool.query(createTablesQuery);
    } catch (error) {
        console.log(error)
    }
}

const insertData = async () => {
    try {
        const insertQuery = `
        INSERT INTO restaurants (name, phone, address, photo)
        VALUES
            ('Tofuya-Ukai', '03-3436-1028', '4 Chome-4-13 Shibakoen, Minato City, Tokyo 105-0011, Japan', 'images/tofuya-ukai.JPG'),
            ('Sushi Dai', '81 3-6633-0042', '6 Chome-5-1 Toyosu, Koto City, Tokyo 135-0061, Japan', 'images/SushiDai.jpg'),
            ('Kawashima Tōfu', '81 955-72-2423', '1775 Kyomachi, Karatsu, Saga 847-0045, Japan', 'images/KawashimaTōfu.jpg'),
            ('Menya Saimi', '81 11-820-6511', '5 Chome-3-12 Misono 10 Jo, Toyohira Ward, Sapporo, Hokkaido 062-0010, Japan', 'images/MenyaSaimi.jpg'),
            ('Asakusa Imahan', '81 3-3841-1114', '3 Chome-1-12 Nishiasakusa, Taito City, Tokyo 111-0035, Japan', 'images/AsakusaImahan.jpg'),
            ('Kozue', '03-5323-3460', '40th fl, Park Hyatt Tokyo, 3-7-1-2 Nishi-Shinjuku, Shinjuku-ku', 'images/Kozue.jpg');
        `;
        await pool.query(insertQuery);
    } catch (error) {
        console.log(error)
    }
}

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
}

setup();
