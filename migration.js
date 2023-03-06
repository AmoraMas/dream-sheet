
const { Pool } = require('pg');
const dbConn = require('./dbConn');
const pool = dbConn.getPool();


// establish a connection we can close with a callback
function runMigrations1(pool, callback){
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
            notes TEXT)`,
            (err, data) => {
                if (err){
                    console.log("CREATE TABLE locations failed");
                    console.log(err);
                } else {
                    console.log("locations table created sucessfully");
                }
            }
        );
    });
}

// establish a connection we can close with a callback
function runMigrations2(pool, callback){
    // connect to DB
    pool.connect((err, client, done) => {
        if (err) {
            console.log("Failed to connect to the database");
            console.error(err);
            return done();
        }

        pool.query(`CREATE TABLE IF NOT EXISTS accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            name varchar(50),
            email varchar(100),
            location_id integer NOT NULL REFERENCES location,
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
            type VARCHAR(20),
            description VARCHAR(200))`,
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
            type VARCHAR(10),
            description VARCHAR(200))`,
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
            type VARCHAR(10),
            description VARCHAR(200))`,
            (err, data) => {
                if (err){
                    console.log("CREATE TABLE climates failed");
                    console.log(err);
                } else {
                    console.log("CREATE TABLE climates successful");
                }
            }
        );
    });
}

// establish a connection we can close with a callback
function runMigrations3(pool, callback){
    // connect to DB
    pool.connect((err, client, done) => {
        if (err) {
            console.log("Failed to connect to the database");
            console.error(err);
            return done();
        }

        pool.query(`CREATE TABLE IF NOT EXISTS places (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(50) NOT NULL,
            location_id INTEGER NOT NULL REFERENCES location,
            lat_long point,
            climate_id INTEGER REFERENCES climate,
            population_id INTEGER REFERENCES population,
            type_id INTEGER REFERENCES type,
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
    });
}

// establish a connection we can close with a callback
function runMigrations4(pool, callback){
    // connect to DB
    pool.connect((err, client, done) => {
        if (err) {
            console.log("Failed to connect to the database");
            console.error(err);
            return done();
        }

        pool.query(`CREATE TABLE IF NOT EXISTS dreams (
            id SERIAL PRIMARY KEY NOT NULL,
            account_id INTEGER NOT NULL REFERENCES accounts,
            place_id INTEGER NOT NULL REFERENCES places,
            notes TEXT)`,
            (err, data) => {
                if (err){
                    console.log("CREATE TABLE dreams failed");
                    console.log(err);
                } else {
                    console.log("CREATE TABLE dreams successful");
                }
            }
        );
    });
}

// establish a connection we can close with a callback
function runMigrations5(pool, callback){
    // connect to DB
    pool.connect((err, client, done) => {
        if (err) {
            console.log("Failed to connect to the database");
            console.error(err);
            return done();
        }

        pool.query(`CREATE TABLE IF NOT EXISTS visits (
            id SERIAL PRIMARY KEY NOT NULL,
            dream_id INTEGER NOT NULL REFERENCES dreams,
            date_visited DATE,
            length_visited VARCHAR(10),
            rating DECIMAL(2,1),
            notes TEXT)`,
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


runMigrations1(pool1, () => {
    runMigrations2(pool2, () => {
        pool1.end();
        runMigrations3(pool3, () => {
            pool2.end();
            runMigrations4(pool4, () => {
                pool3.end();
                runMigrations5(pool5, () => {
                    // migrations are complete, we can close the pools
                    pool4.end();
                    pool5.end();
                })
            })
        })
    })
})