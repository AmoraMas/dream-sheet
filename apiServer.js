// define dependencies
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;  // Port that Express listens to for requests

app.use(cors());

app.use(express.json());

// define structure for accessing database
//const { Pool } = require('pg');
const dbConn = require('./dbConn');
const pool = dbConn.getPool();

// serve your css and js as static to work with your .html
app.use(express.static(__dirname));

// listen to the port
app.listen(port, function () {
  console.log(`Server is listening on port ${port}.`);
});

//
// here is where all of your requests with routes go
//

// test request to verify this file is working
app.get("/api/test", (req, res, next) => {
  res.send('Programming is awesome! This page works!');
})

// html page request to send index.html to the user
app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
})
app.get("/index.html", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
})

// ROUTES FOR EVERYTHING IN TABLE
// return all entries for table accounts
app.get("/api/accounts", (req, res, next) => {
  const result = pool.query('SELECT * FROM accounts;', (err, data) => {
    if (err) {
      return next ({ status: 500, message: err });
    }
    res.send(data.rows);
  })
});

// return all entries for table dreams
app.get("/api/dreams", (req, res, next) => {
  const result = pool.query('SELECT * FROM dreams;', (err, data) => {
    if (err) {
      return next ({ status: 500, message: err });
    }
    res.send(data.rows);
  })
});

// return all entries for table places
app.get("/api/places", (req, res, next) => {
  const result = pool.query('SELECT * FROM places;', (err, data) => {
    if (err) {
      return next ({ status: 500, message: err });
    }
    res.send(data.rows);
  })
});

// return all entries for table locations
app.get("/api/locations", (req, res, next) => {
  const result = pool.query('SELECT * FROM locations;', (err, data) => {
    if (err) {
      return next ({ status: 500, message: err });
    }
    res.send(data.rows);
  })
});

// return all entries for table visits
app.get("/api/visits", (req, res, next) => {
  const result = pool.query('SELECT * FROM visits;', (err, data) => {
    if (err) {
      return next ({ status: 500, message: err });
    }
    res.send(data.rows);
  })
});

// return all entries for table types
app.get("/api/types", (req, res, next) => {
  const result = pool.query('SELECT * FROM types;', (err, data) => {
    if (err) {
      return next ({ status: 500, message: err });
    }
    res.send(data.rows);
  })
});

// return all entries for table populations
app.get("/api/populations", (req, res, next) => {
  const result = pool.query('SELECT * FROM populations;', (err, data) => {
    if (err) {
      return next ({ status: 500, message: err });
    }
    res.send(data.rows);
  })
});

// return all entries for table climates
app.get("/api/climates", (req, res, next) => {
  const result = pool.query('SELECT * FROM climates;', (err, data) => {
    if (err) {
      return next ({ status: 500, message: err });
    }
    res.send(data.rows);
  })
});


// ROUTES REQUIRING AN ID

// retun only the requested entries for accounts
app.get("/api/account/:id", (req, res, next) => {
  let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
    return next({ status: 404, message: "Please enter an account id" });
  }
  const result = pool.query('SELECT * FROM accounts WHERE id = $1;', [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: 'Please enter a valid account id' });
    }
    else {
      res.send(data.rows[0]);
    }
  });
});

// retun only the dreams entries for account
app.get("/api/account/:id/dreams", (req, res, next) => {
  let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
    return next({ status: 404, message: "Please enter an account id" });
  }
  const result = pool.query('SELECT * FROM dreams WHERE account_id = $1;', [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: 'Please enter a valid account id' });
    }
    else {
      res.send(data.rows);
    }
  });
});

// retun only the place entries for id
app.get("/api/place/:id", (req, res, next) => {
  let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
    return next({ status: 404, message: "Please enter an place id" });
  }
  const result = pool.query('SELECT * FROM places INNER JOIN locations ON places.location_id = locations.id INNER JOIN climates ON places.climate_id = climates.id INNER JOIN populations ON places.population_id = populations.id INNER JOIN types ON places.type_id = types.id WHERE places.id = $1;', [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: 'Please enter a valid place id' });
    }
    else {
      res.send(data.rows[0]);
    }
  });
});

// retun only the location entries for id
app.get("/api/location/:id", (req, res, next) => {
  let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
    return next({ status: 404, message: "Please enter an location id" });
  }
  const result = pool.query('SELECT * FROM locations WHERE id = $1;', [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: 'Please enter a valid location id' });
    }
    else {
      res.send(data.rows[0]);
    }
  });
});

// retun only the visit entries for id
app.get("/api/visit/:id", (req, res, next) => {
  let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
    return next({ status: 404, message: "Please enter an visit id" });
  }
  const result = pool.query('SELECT * FROM visits WHERE id = $1;', [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: 'Please enter a valid visit id' });
    }
    else {
      res.send(data.rows[0]);
    }
  });
});

// retun only the type entries for id
app.get("/api/type/:id", (req, res, next) => {
  let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
    return next({ status: 404, message: "Please enter an type id" });
  }
  const result = pool.query('SELECT * FROM types WHERE id = $1;', [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: 'Please enter a valid type id' });
    }
    else {
      res.send(data.rows[0]);
    }
  });
});

// retun only the population entries for id
app.get("/api/population/:id", (req, res, next) => {
  let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
    return next({ status: 404, message: "Please enter an population id" });
  }
  const result = pool.query('SELECT * FROM populations WHERE id = $1;', [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: 'Please enter a valid population id' });
    }
    else {
      res.send(data.rows[0]);
    }
  });
});

// retun only the climate entries for id
app.get("/api/climate/:id", (req, res, next) => {
  let id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
    return next({ status: 404, message: "Please enter an climate id" });
  }
  const result = pool.query('SELECT * FROM climates WHERE id = $1;', [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: 'Please enter a valid climate id' });
    }
    else {
      res.send(data.rows[0]);
    }
  });
});

// Adds place to dreams
app.post("/api/dream", (req, res, next) => {
  const { account_id, place_id, notes } = req.body;
  if (!account_id || !place_id) {
    return next({ status: 400, message: `Required information was not provided.` });
  }
  const result = pool.query('INSERT INTO dreams (account_id, place_id, dream_notes) VALUES ($1, $2, $3);', [account_id, place_id, dream_notes], (writeError, data) => {
    if (writeError) {
      return next({ status: 500, message: writeError });
    }
    res.send(`Added: { account_id: ${account_id}, place_id: ${place_id}, dream_notes: ${dream_notes} }`);
  });
});


// Adds new rows to places
app.post("/api/place", (req, res, next) => {
  const { name, location_id, lat_long, climate_id, population_id, type_id, thumbnail, link, cost, details } = req.body;
  if ( !name || !location_id || !lat_long || !climate_id || !population_id || !type_id || !thumbnail || !link || !cost || !details || isNaN(location_id) || isNaN(climate_id) || isNaN(population_id) || isNaN(type_id) ) {
    return next({ status: 400, message: `Submitted information was incorrect.` });
  }
  const result = pool.query(`INSERT INTO places (name, location_id, lat_long, climate_id, population_id, type_id, thumbnail, link, cost, details) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`, [name, Number(location_id), lat_long, Number(climate_id), Number(population_id), Number(type_id), thumbnail, link, cost, details], (writeError, data) => {
    if (writeError) {
      return next({ status: 500, message: writeError });
    }
    res.send(`Added: { name: ${name}, location_id: ${location_id}, lat_long: ${lat_long}, climate_id: ${climate_id}, population_id: ${population_id}, type_id: ${type_id}, thumbnail: ${thumbnail}, link: ${link}, cost: ${cost}, details: ${details} }`);
  });
});


// Changes/replaces information in row id of place
app.patch("/api/place/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  // Check if id in places exist
  const result = pool.query('SELECT * FROM places WHERE id = $1;', [id], (readError, data) => {
    if (readError) {
      return next({ status: 500, message: readError});
    }
    else if (data.rowCount == 0) {
      return next({status: 404, message: `Place ${id} does not exist.`});
    }
    // Check if submitted body has good information
    const result = req.body;
    let list = ['name', 'location_id', 'lat_long', 'climate_id', 'population_id', 'type_id', 'thumbnail', 'link', 'cost', 'details'];
    // Only has expected keys and expected integers are integers
    for (let key of request) {
      if (!list.includes(key)) {
        return next({status: 400, message: 'Bad information provided. Key name. ' + key});
      }
      else if (key.endsWith('_id') && !Number(request[key])) {
        return next({status: 400, message: 'Bad information provided. Key name. ' + key + ' Key Value. ' + request[key]});
      }
    }
    // Perform the update for each key value requested
    for (let key in request) {
      let text = 'UPDATE places SET ' + key + '=$1 WHERE id = $2;'
      const result = pool.query(text, [request[key], id], (writeError, data)=> {
        if (writeError) {
          return next({status: 500, message: writeError});
        }
        res.send(`Added requested information.`);
      });
    }
  });
});


// Deletes an row of id from places
app.delete("/api/place/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  // Verify the ID exists
  const result = pool.query('SELECT * FROM places WHERE id = $1;', [id], (readError, deletedData) => {
    if (readError) {
      return next({ status: 500, message: readError});
    }
    else if (deletedData.rowCount == 0) {
      return next({status: 404, message: `Place ${id} does not exist.`});
    }
    // store the data that we are about to delete
    deletedData = deletedData.rows[0];
    //delete the data
    const result = pool.query('DELETE FROM places WHERE id = $1;', [id], (writeError, data) => {
      if (writeError) {
        return next({ status: 500, message: writeError });
      }
      res.send('Deleted place');
    });
  });
});

// Deletes an row of id from dreams
app.delete("/api/dream/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  // Verify the ID exists
  const result = pool.query('SELECT * FROM dreams WHERE id = $1;', [id], (readError, deletedData) => {
    if (readError) {
      return next({ status: 500, message: readError});
    }
    else if (deletedData.rowCount == 0) {
      return next({status: 404, message: `Dream ${id} does not exist.`});
    }
    // store the data that we are about to delete
    deletedData = deletedData.rows[0];
    //delete the data
    const result = pool.query('DELETE FROM dreams WHERE id = $1;', [id], (writeError, data) => {
      if (writeError) {
        return next({ status: 500, message: writeError });
      }
      res.send('Deleted dream');
    });
  });
});

//
// Below are standard routes -- leave alone
//

// if an error occured  -- Keep next to last
app.use((err, req, res, next) => {
  //console.error("Error Stack: ", err.stack);
  res.status(err.status).send({ error: err });
});

// if requested handle does not exist -- keep last
app.use((req, res, next) => {
  // res.status(404).send('Path Not Found: ${req.url}');   // Only sends message or JSON, not both
  res.status(404).json({ error: { message: `Path Not Found: ${req.url}` } });
});