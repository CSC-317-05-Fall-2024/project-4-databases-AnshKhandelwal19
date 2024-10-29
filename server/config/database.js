/* Establish the DB connection pool here. */
import pg from 'pg';
import dotenv from 'dotenv';

//Configure dotenv and initialize config using connection string
dotenv.config();

const config = {
    connectionString: process.env.CONNECTION_STRING
};

//Initialize pool with the config variable and export
const pool = new pg.Pool(config);

export { pool };