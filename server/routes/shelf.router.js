const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get("/", (req, res) => {
  console.log("/shelf GET route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

  // Checking if the user is logged in, and is a valid user.
  // Will also check their access level.
  if (req.isAuthenticated()) {
    // ! Scope this query to only return the appropriate pets for the specific user.

    let queryText = `
              SELECT * FROM "item";
          `;
    // ! User data from user object to customize query
    // let queryParams = [req.user.id]
    pool
      .query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", (req, res) => {
  // endpoint functionality
  console.log("/shelf POST route", req.body);
  console.log("is authenticate?", req.isAuthenticated());
  console.log("user", req.user);
  if (req.isAuthenticated()) {
    // ! Scope this query to only return the appropriate pets for the specific user.

    let queryText = `
            INSERT INTO "item" ("description", "image_url", "user_id")
            VALUES ($1, $2, $3);
        `;
    let queryParams = [req.body.description, req.body.image_url, req.user.id];
    // ! User data from user object to customize query
    // let queryParams = [req.user.id]
    pool
      .query(queryText, queryParams)
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete("/:id", (req, res) => {
  console.log("/shel/:id", req.params.id);
  console.log("req.user", req.user);
  // endpoint functionality
  if (req.isAuthenticated()) {
    let queryText = `
        DELETE FROM "item"
        WHERE id = $1 AND user_id = $2;
    `;
    let queryParams = [req.params.id, req.user.id];
    pool
      .query(queryText, queryParams)
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * Update an item if it's something the logged in user added
 */
router.put("/:id", (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get("/count", (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get("/:id", (req, res) => {
  // endpoint functionality
});

module.exports = router;
