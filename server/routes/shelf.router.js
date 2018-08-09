const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    if (req.isAuthenticated) {
    const queryText = `SELECT * FROM item;`;
    pool.query(queryText).then((results) => {
        res.send(results.rows)
        console.log(results.rows);
        
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
} else {
    res.sendStatus(403);
} 
});



router.post('/', (req, res) => {
    console.log('got to post', req.body);
    if (req.isAuthenticated) {
        const newItem = req.body
        const queryText = `INSERT INTO "item" ("description","image_url", "person_id") VALUES ($1,$2,$3)`
        pool.query(queryText, [newItem.description, newItem.imageURL, req.user.id])
            .then(() => {
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log(error);
                res.sendStatus(500)
            })
    } else {
        res.sendStatus(403);
    }
})


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
    if (req.isAuthenticated) {
        const queryText = 'DELETE FROM "item" WHERE id=$1';
        pool.query(queryText, [req.params.id])
          .then(() => { res.sendStatus(200); })
          .catch((err) => {
            console.log('Error deleting', err);
            res.sendStatus(500);
          });
    } else {
        res.sendStatus(403);
    }
});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
    console.log('made it to count GET');
    
    if (req.isAuthenticated) {
        const queryText = 'SELECT count (person_id), username  FROM "item" RIGHT OUTER JOIN "person" ON person.id = item.person_id GROUP BY "username"';
        pool.query(queryText)
          .then((results) => { 
              res.send(results.rows)
            console.log(results.rows);
            
            })
          .catch((err) => {
            console.log('Error counting', err);
            res.sendStatus(500);
          });
    } else {
        res.sendStatus(403);
    }
});



/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;