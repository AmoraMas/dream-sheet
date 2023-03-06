
const { Pool } = require('pg');
const dbConn = require('./dbConn');
const pool = dbConn.getPool();

// establish a connection we can close with a callback
function runSeeder(pool, callback){
    // connect to DB
    pool.connect((err, client, done) => {
        if (err) {
            console.log("Failed to connect to the database");
            console.error(err);
            return done();
        }
        // Seed data into tables
        pool.query(`SELECT COUNT(*) FROM locations`, (err, data) => {
            if (data.rows[0].count == 0) {
                pool.query(`INSERT INTO locations (country, state, city, lat-long, notes) VALUES
                ('United States', 'Colorado', 'Colorado Springs', (38.857747, -104.773865), 'Center of Colorado.'),
                ('United States', 'Colorado', 'Denver', (39.784127, -104.985352), 'Capital of Colorado. Biggest city in the state.'),
                ('United States', 'Nevada', 'Las Vegas', (36.173209, -115.176544), 'USA gambling center. Beware what you spend here.'),
                ('United States', 'Tennessee', 'Nashville', (36.158796, -86.776886), 'Country Music Stars live here.'),
                ('United States', 'Tennessee', 'Gatlinburg', (35.714174, -83.509827), 'Some pretty amazing attractions are here.'),
                ('United States', 'Washington D.C.', 'Washington D.C.', (38.891959, -77.047119), 'Some really cool things to see here. And politicians talk about stuff here.'),
                ('United States', 'New York', 'New York City', (40.788305, -73.960304), 'City that never sleeps. Crazy things to see here.'),
                ('The Bahamas', '', 'Nassau', (25.055082, -77.327271), 'Clear blue ocean everywhere.'),
                ('Gibraltar', '', 'Gibraltar', (36.130628, -5.346909), 'Best view of the Mediteranean Sea.'),
                ('France', '', 'Paris', (48.852849, 2.352448), 'Cafes galore and the Eiffel Tower.'),
                ('United Kingdom', 'Great Brittain', 'London', (51.503386, -0.118103), 'Who wants a spot of tea?'),
                ('Ireland', '', 'Dublin', (53.347163, -6.266327), 'Ireland is such a beautiful country.'),
                ('Italy', '', 'Napoli', (40.904656, 14.260254), 'Italy at it\'s best.'),
                ('Italy', '', 'Roma', (41.891782, 12.477722), 'Roma wasn\'t built in a day.'),
                ('Austrailia', '', 'Sydney', (-33.880145, 151.051025), 'Who wants shimp on the barbee?'),
                ('New Zealand', '', 'Auckland', (-36.855596, 174.765015));`,
                    (err, data) => {
                        if (err){
                            console.log("INSERT INTO locations failed");
                            console.log(err);
                        } else {
                            console.log("INSERT INTO locations successful");
                        }
                    }
                );
            }
        });

        pool.query(`SELECT COUNT(*) FROM accounts`, (err, data) => {
            if (data.rows[0].count == 0) {
                pool.query(`INSERT INTO accounts (name, email, location_id, is_admin) VALUES 
                    ('AmoraMas', 'amoramas1984@gmail.com', 1, true),
                    ('Joan', 'joan@nonsense.com', 1, false),
                    ('Nick', 'nick@nonsense.com', 1, false),
                    ('Seth', 'seth@nonsense.com', 1, false);`,
                    (err, data) => {
                        if (err){
                            console.log("INSERT INTO accounts failed");
                            console.log(err);
                        } else {
                            console.log("INSERT INTO accounts successful");
                        }
                    }
                );
            }
        });

        pool.query(`SELECT COUNT(*) FROM types`, (err, data) => {
            if (data.rows[0].count == 0) {
                pool.query(`INSERT INTO types (type, description) VALUES 
                    ('Restaurant', 'Short getaway to eat great food.'),
                    ('Hotel', 'Room to rent for the night, weekend, or week.'),
                    ('Vacation', 'Time to really get away and try someplace brand new.'),
                    ('Beach', 'Visit the water.'),
                    ('City', 'Visit a city you\'ve never been and explore.')
                    ('Attraction', 'Come and see something amazing and new.');`,
                    (err, data) => {
                        if (err){
                            console.log("INSERT INTO types failed");
                            console.log(err);
                        } else {
                            console.log("INSERT INTO types successful");
                        }
                    }
                );
            }
        });

        pool.query(`SELECT COUNT(*) FROM populations`, (err, data) => {
            if (data.rows[0].count == 0) {
                pool.query(`INSERT INTO populations (type, description) VALUES 
                    ('Small', 'Think small town. '),
                    ('Middle', 'Somewhere in between. You\'re not alone, but you\'re also not bumping into people.'),
                    ('High', 'Very dense. Think big city.');`,
                    (err, data) => {
                        if (err){
                            console.log("INSERT INTO populations failed");
                            console.log(err);
                        } else {
                            console.log("INSERT INTO populations successful");
                        }
                    }
                );
            }
        });

        pool.query(`SELECT COUNT(*) FROM climates`, (err, data) => {
            if (data.rows[0].count == 0) {
                pool.query(`INSERT INTO climates (type, description) VALUES 
                    ('Tropical', 'Hot and humid. The average temperatures are greater than 64°F (18°C) year-round and there is more than 59 inches of precipitation each year.'),
                    ('Dry', 'Very dry with very little precipitation.'),
                    ('Temperate', 'Typically warm and humid summers with thunderstorms and mild winters.'),
                    ('Contintental', 'Warm to cool summers and very cold winters.'),
                    ('Polar', 'Extremely cold. Even in summer, the temperatures here never go higher than 50°F (10°C).');`,
                    (err, data) => {
                        if (err){
                            console.log("INSERT INTO climates failed");
                            console.log(err);
                        } else {
                            console.log("INSERT INTO climates successful");
                        }
                    }
                );
            }
        });

        pool.query(`SELECT COUNT(*) FROM places`, (err, data) => {
            if (data.rows[0].count == 0) {
                pool.query(`INSERT INTO places (name, location_id, lat-long, climate_id, population_id, type_id, thumbnail, link, cost, details) VALUES 
                ('Five Guys', 1, (38.810716, -104.823212), 2, 1, 1, '', '', '1.0', 'Custom burgers and the fries are awesome.'),
                ('Glen Eyrie', 1, (38.891667,-104.884444), 2, 1, 2, '', '', '2.0', 'English style castle built in 1871. Stay overnight and live like English Royalty.'),
                ('Denver Zoo', 2, (39.749316, -104.95029), 2, 2, 6, '', '', '2.0', 'They\'ve got animals and stuff.'),
                ('Wild Bear Falls', 5, (35.73208, -83.51874), 1, 2, 6, '', '', '2.0', 'Huge indoor water park.'),
                ('Eiffel Tower', 10, (48.858222,2.2945), 1, 3, 6, '', '', '5.0'. 'Most romantic place in the world and an amazing piece of architecture.'),
                ('Sydney Opera House', 15, (-33.857213, 151.215144), 1, 3, 6, '', '', '5.0', 'Must see place when you visit Austrailia. Plus they have great music shows.');`, 
                (err, data) => {
                    if (err){
                        console.log("INSERT INTO places failed");
                        console.log(err);
                    } else {
                        console.log("INSERT INTO places succeeded");
                    }
                }
                );
            }
            checkComplete();
        });

        pool.query(`SELECT COUNT(*) FROM dreams`, (err, data) => {
            if (data.rows[0].count == 0) {
                pool.query(`INSERT INTO dreams (account_id, place_id, notes) VALUES 
                    (1, 1, 'Family favorite.'),
                    (2, 1, 'Kids love it here. We go often.'),
                    (3, 1, 'Best burgers in this city. I like their burgers. I like burgers.'),
                    (4, 1, 'Grilled Cheese.'),
                    (2, 2, 'My girlfriend just went and it sounds AMAZING. I wanna go so bad.'),
                    (2, 4, 'I\'ve been trying to get my husband to take me here for forever.'),
                    (1, 6, 'If I\'m going somewhere, let\'s go somewhere amazing.');`,
                    (err, data) => {
                        if (err){
                            console.log("INSERT INTO dreams failed");
                            console.log(err);
                        } else {
                            console.log("INSERT INTO dreams successful");
                        }
                    }
                );
            }
        });

        pool.query(`SELECT COUNT(*) FROM visits`, (err, data) => {
            if (data.rows[0].count == 0) {
                pool.query(`INSERT INTO visits (dreams_id, date-visited, length-visited, rating, notes) VALUES 
                    (1, '14 Feb 2023', '1 hr', '4.0', 'Great Burger. Great Fries. I can't believe he got a grilled cheese again.'),
                    (2, '14 Feb 2023', '1 hr', '5.0', 'We all love this place so much. Dear Seth got a grilled cheese again.'),
                    (3, '14 Feb 2023', '1 hr', '4.0', 'I like burgers.'),
                    (4, '14 Feb 2023', '1 hr', '2.0', 'Grilled cheese, yum. It\'s not like mom\'s though.';`,
                    (err, data) => {
                        if (err){
                            console.log("INSERT INTO visits failed");
                            console.log(err);
                        } else {
                            console.log("INSERT INTO visits successful");
                        }
                    }
                );
            }
        });
    });
}

runSeeder(pool, () => {
    // seeding is done, so we can close the pool
    pool.end();
})