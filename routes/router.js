// routes/router.js
const express = require('express');
const ingredientsRouter = require('./ingredients');
const pizzasRouter = require('./pizzas');

const router = express.Router();

router.use('/ingredients', ingredientsRouter)
router.use('/pizzas', pizzasRouter);

module.exports = router;
