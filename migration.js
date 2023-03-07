
const { Pool } = require('pg');
const dbConn = require('./dbConn');
const pool = dbConn.getPool();

// establish a connection we can close with a callback
function runMigrations(pool, callback){
    // connect to DB
    pool.connect((err, client, done) => {
        if (err) {
            console.log("Failed to connect to the database");
            console.error(err);
            return done();
        }

        pool.query(`CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY NOT NULL,
            country VARCHAR(25),
            state VARCHAR(25),
            city VARCHAR(25),
            lat_long POINT,
            location_notes TEXT)`,
            (err, data) => {
                if (err){
                    console.log("CREATE TABLE locations failed");
                    console.log(err);
                } else {
                    console.log("CREATE TABLE locations sucessful");
                }
            }
        );

        pool.query(`CREATE TABLE IF NOT EXISTS accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            name varchar(50),
            email varchar(100),
            location_id integer NOT NULL,
            pw_salt varchar(100),
            pw_hash varchar(100),
            is_admin BOOLEAN NOT NULL DEFAULT FALSE)`,
            (err, data) => {
                if (err){
                    console.log("CREATE TABLE accounts failed");
                    console.log(err);
                } else {
                    console.log("CREATE TABLE accounts successful");
                }
            }
        );

        pool.query(`CREATE TABLE IF NOT EXISTS types (
            id SERIAL PRIMARY KEY NOT NULL,
            ttype VARCHAR(20),
            tdescription VARCHAR(200))`,
            (err, data) => {
                if (err){
                    console.log("CREATE TABLE types failed");
                    console.log(err);
                } else {
                    console.log("CREATE TABLE types successful");
                }
            }
        );

        pool.query(`CREATE TABLE IF NOT EXISTS populations (
            id SERIAL PRIMARY KEY NOT NULL,
            ptype VARCHAR(10),
            pdescription VARCHAR(200))`,
            (err, data) => {
                if (err){
                    console.log("CREATE TABLE populations failed");
                    console.log(err);
                } else {
                    console.log("CREATE TABLE populations successful");
                }
            }
        );

        pool.query(`CREATE TABLE IF NOT EXISTS climates (
            id SERIAL PRIMARY KEY NOT NULL,
            ctype VARCHAR(15),
            cdescription VARCHAR(200))`,
            (err, data) => {
                if (err){
                    console.log("CREATE TABLE climates failed");
                    console.log(err);
                } else {
                    console.log("CREATE TABLE climates successful");
                }
            }
        );

        pool.query(`CREATE TABLE IF NOT EXISTS places (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(50) NOT NULL,
            location_id INTEGER NOT NULL,
            lat_long point,
            climate_id INTEGER,
            population_id INTEGER,
            type_id INTEGER,
            thumbnail VARCHAR(200),
            link VARCHAR(200),
            cost DECIMAL(2,1),
            details TEXT)`,
            (err, data) => {
                if (err){
                    console.log("CREATE TABLE places failed");
                    console.log(err);
                } else {
                    console.log("CREATE TABLE places successful");
                }
            }
        );

        pool.query(`CREATE TABLE IF NOT EXISTS dreams (
            id SERIAL PRIMARY KEY NOT NULL,
            account_id INTEGER NOT NULL,
            place_id INTEGER NOT NULL,
            dream_notes TEXT)`,
            (err, data) => {
                if (err){
                    console.log("CREATE TABLE dreams failed");
                    console.log(err);
                } else {
                    console.log("CREATE TABLE dreams successful");
                }
            }
        );

        pool.query(`CREATE TABLE IF NOT EXISTS visits (
            id SERIAL PRIMARY KEY NOT NULL,
            dream_id INTEGER NOT NULL,
            date_visited DATE,
            length_visited VARCHAR(10),
            rating DECIMAL(2,1),
            visit_notes TEXT)`,
            (err, data) => {
                if (err){
                    console.log("CREATE TABLE visits failed");
                    console.log(err);
                } else {
                    console.log("CREATE TABLE visits successful");
                }
            }
        );
    });
}


runMigrations(pool, () => {
    // migrations are complete, we can close the pools
    done();
    pool.end();
})