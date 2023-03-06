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

// return all entries for table location
app.get("/api/location", (req, res, next) => {
  const result = pool.query('SELECT * FROM location;', (err, data) => {
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

// return all entries for table type
app.get("/api/type", (req, res, next) => {
  const result = pool.query('SELECT * FROM type;', (err, data) => {
    if (err) {
      return next ({ status: 500, message: err });
    }
    res.send(data.rows);
  })
});

// return all entries for table population
app.get("/api/population", (req, res, next) => {
  const result = pool.query('SELECT * FROM population;', (err, data) => {
    if (err) {
      return next ({ status: 500, message: err });
    }
    res.send(data.rows);
  })
});

// return all entries for table climate
app.get("/api/climate", (req, res, next) => {
  const result = pool.query('SELECT * FROM climate;', (err, data) => {
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
  const result = pool.query(`SELECT * FROM accounts WHERE id = $1;`, [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: `Please enter a valid account id` });
    }
    else {
      res.send(data.rows[0]);
    }
  });
});

// retun only the dreams entries for account
app.get("/api/account/:id/dreams", (req, res, next) => {
  let id = parseInt(req.params.accountid);
    if (!Number.isInteger(id)) {
    return next({ status: 404, message: "Please enter an account id" });
  }
  const result = pool.query(`SELECT * FROM dreams WHERE account_id = $1;`, [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: `Please enter a valid account id` });
    }
    else {
      res.send(data.rows[0]);
    }
  });
});

// retun only the place entries for id
app.get("/api/place/:id", (req, res, next) => {
  let id = parseInt(req.params.accountid);
    if (!Number.isInteger(id)) {
    return next({ status: 404, message: "Please enter an dream id" });
  }
  const result = pool.query(`SELECT * FROM places WHERE id = $1;`, [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: `Please enter a valid account id` });
    }
    else {
      res.send(data.rows[0]);
    }
  });
});

// retun only the location entries for id
app.get("/api/location/:id", (req, res, next) => {
  let id = parseInt(req.params.accountid);
    if (!Number.isInteger(id)) {
    return next({ status: 404, message: "Please enter an location id" });
  }
  const result = pool.query(`SELECT * FROM locations WHERE id = $1;`, [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: `Please enter a valid location id` });
    }
    else {
      res.send(data.rows[0]);
    }
  });
});

// retun only the visit entries for id
app.get("/api/visit/:id", (req, res, next) => {
  let id = parseInt(req.params.accountid);
    if (!Number.isInteger(id)) {
    return next({ status: 404, message: "Please enter an visit id" });
  }
  const result = pool.query(`SELECT * FROM visits WHERE id = $1;`, [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: `Please enter a valid visit id` });
    }
    else {
      res.send(data.rows[0]);
    }
  });
});

// retun only the type entries for id
app.get("/api/type/:id", (req, res, next) => {
  let id = parseInt(req.params.accountid);
    if (!Number.isInteger(id)) {
    return next({ status: 404, message: "Please enter an type id" });
  }
  const result = pool.query(`SELECT * FROM types WHERE id = $1;`, [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: `Please enter a valid type id` });
    }
    else {
      res.send(data.rows[0]);
    }
  });
});

// retun only the population entries for id
app.get("/api/population/:id", (req, res, next) => {
  let id = parseInt(req.params.accountid);
    if (!Number.isInteger(id)) {
    return next({ status: 404, message: "Please enter an population id" });
  }
  const result = pool.query(`SELECT * FROM populations WHERE id = $1;`, [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: `Please enter a valid population id` });
    }
    else {
      res.send(data.rows[0]);
    }
  });
});

// retun only the climate entries for id
app.get("/api/climate/:id", (req, res, next) => {
  let id = parseInt(req.params.accountid);
    if (!Number.isInteger(id)) {
    return next({ status: 404, message: "Please enter an climate id" });
  }
  const result = pool.query(`SELECT * FROM climates WHERE id = $1;`, [id], (err, data) => {
    if (err) {
      return next({ status: 500, message: err});
    }
    else if (data.rowCount == 0) {
      return next({ status: 404, message: `Please enter a valid climate id` });
    }
    else {
      res.send(data.rows[0]);
    }
  });
});















// Adds new rows to table 1
app.post("/table1", (req, res, next) => {
    // TODO: DO SOMETHING HERE
});

// Changes/replaces information in row id of Table 1
app.patch("/table1/:id", (req, res, next) => {
  const idAcc = parseInt(req.params.idAcc);
  const idDep = parseInt(req.params.idDep);
  const request = req.body;

  const result1 = pool.query(`SELECT * FROM accounts WHERE id = $1;`, [idAcc], (readError, data) => {
    if (readError) {
      return next({ status: 500, message: readError});
    }
    else if (data.rowCount == 0) {
      return next({status: 404, message: `Account ${idAcc} does not exist.`});
    }
    const result2 = pool.query(`SELECT * FROM deposits WHERE id = $1 AND account_id = $2;`, [idDep, idAcc], (readError, data) => {
      if (readError) {
      return next({ status: 500, message: readError});
      }
      else if (data.rowCount == 0) {
        return next({status: 404, message: `Deposit ${idDep} from Account ${idAcc} does not exist.`});
      }
    })
    // for loop allows for changing more than one value at a time
    for (let key in request){
      if (key == 'amount' && !Number(request[key])) {
        return next({stutus: 400, message: `Submitted amount is not a number.`})
      }
      else if (key == 'amount') {
        const result = pool.query(`UPDATE deposits SET amount=$1 WHERE id = $2;`, [request[key], idDep], (writeError, data)=> {
          if (writeError) {
            return next({status: 500, message: writeError});
          }
        });
      }
      else if (key == 'who') {
        const result = pool.query(`UPDATE deposits SET who=$1 WHERE id = $2;`, [request[key], idDep], (writeError, data)=> {
          if (writeError) {
            return next({status: 500, message: writeError});
          }
        });
      }
      else if (key == 'date') {
        const result = pool.query(`UPDATE deposits SET date=$1 WHERE id = $2;`, [request[key], idDep], (writeError, data) => {
          if (writeError) {
            return next({status: 500, message: writeError});
          }
        });
      }
      else if (key == 'note') {
        const result = pool.query(`UPDATE deposits SET note=$1 WHERE id = $2;`, [request[key], idDep], (writeError, data) => {
          if (writeError) {
            return next({status: 500, message: writeError});
          }
        });
      }
      else if (key == 'account_id') {
        const result = pool.query(`SELECT * FROM accounts WHERE accounts_id = $1;`, [account_id], (readError, data) => {
          if (readError) {
            return next({ status: 500, message: readError});
          }
          else if (data.rowCount == 0) {
            return next({status: 404, message: `Account ${request[key]} to change to does not exist.`});
          }
          const result = pool.query(`UPDATE deposits SET account_id=$1 WHERE id = $2;`, [request[key], idDep], (writeError, data) => {
            if (writeError) {
              return next({status: 500, message: writeError});
            }
          });
        });
      }
      else {
        return next({status: 400, message: `Request was bad. Can only change "amount", "who", "date", and/or "note"`})
      }
    }
    const result = pool.query(`SELECT * FROM deposits WHERE id = $1;`, [idDep], (readError, updatedData) => {
      updatedData = updatedData.rows[0];
      res.send(`Updated: { id: ${updatedData.id}, account_id: ${updatedData.account_id}, amount: ${updatedData.amount}, who: ${updatedData.who}, date: ${updatedData.date}, note: ${updatedData.note} }`);
    });
  });
});

// Deletes an row of id from Table 1
app.delete("/table2/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  // Verify the ID exists
  const result = pool.query(`SELECT * FROM deposits WHERE id = $1;`, [id], (readError, deletedData) => {
    if (readError) {
      return next({ status: 500, message: readError});
    }
    else if (deletedData.rowCount == 0) {
      return next({status: 404, message: `Deposit ${id} does not exist.`});
    }
    // store the data that we are about to delete
    deletedData = deletedData.rows[0];
    //delete the data
    const result = pool.query(`DELETE FROM deposits WHERE id = $1;`, [id], (writeError, data) => {
      if (writeError) {
        return next({ status: 500, message: writeError });
      }
      res.send(`Deleted: { id: ${deletedData.id}, amount: ${deletedData.amount}, who: ${deletedData.who}, date: ${deletedData.date}, note: ${deletedData.note} }`);
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
  // res.status(404).send(`Path Not Found: ${req.url}`);   // Only sends message or JSON, not both
  res.status(404).json({ error: { message: `Path Not Found: ${req.url}` } });
});