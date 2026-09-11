// routes/pizzas.js
const express = require('express');
const { body, param } = require('express-validator');
const pizzasController = require('../controllers/pizzasController');

const router = express.Router();

/**
 * @openapi
 * /api/pizzas:
 *   get:
 *     summary: Retrieve a list of pizzas
 *     responses:
 *       200:
 *         description: A list of pizzas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - price
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Margherita"
 *                 image:
 *                   type: string
 *                   example: null
 *                 ingredients:
 *                   type: [string]
 *                   example: ["Tomato", "Mozarella", "Basil"]
 *                 price:
 *                   type: number
 *                   example: 8.5
 *   post:
 *     summary: Create a new pizza
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - price
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Margherita"
 *                 image:
 *                   type: string
 *                   example: null
 *                 ingredients:
 *                   type: [string]
 *                   example: ["Tomato", "Mozarella", "Basil"]
 *                 price:
 *                   type: number
 *                   example: 8.5
 *     responses:
 *       201:
 *         description: Pizza created
 *       400:
 *         description: Invalid input
 */

/**
 * @openapi
 * /api/pizzas/{id}:
 *   get:
 *     summary: Get a pizza by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pizza object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - price
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Margherita"
 *                 image:
 *                   type: string
 *                   example: null
 *                 ingredients:
 *                   type: [string]
 *                   example: ["Tomato", "Mozarella", "Basil"]
 *                 price:
 *                   type: number
 *                   example: 8.5
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update a Pizza by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - price
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Margherita"
 *                 image:
 *                   type: string
 *                   example: null
 *                 ingredients:
 *                   type: [string]
 *                   example: ["Tomato", "Mozarella", "Basil"]
 *                 price:
 *                   type: number
 *                   example: 8.5
 *     responses:
 *       200:
 *         description: Pizza updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Pizza not found
 *   delete:
 *     summary: Delete a pizza
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pizza deleted
 *       404:
 *         description: Pizza not found
 */

/**
 * Validation rules
 */
const createAndUpdateValidations = [
    body('title').isString().notEmpty().withMessage('name is required'),
    body('image').optional().isString().isURL().withMessage('imageUrl must be a valid URL'),
    body('ingredients').optional().isString().isArray({min: 0}),
    body('price').isFloat({ gt: 0 }).withMessage('price must be a positive number'),
];

router.get('/', pizzasController.findAll);
router.post('/', createAndUpdateValidations, pizzasController.create);
router.get('/:id', [param('id').isInt().withMessage('id must be an integer')], pizzasController.findOne);
router.put('/:id', [param('id').isInt().withMessage('id must be an integer'), ...createAndUpdateValidations], pizzasController.update);
router.delete('/:id', [param('id').isInt().withMessage('id must be an integer')], pizzasController.delete);

module.exports = router;
