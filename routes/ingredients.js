// routes/pizzas.js
const express = require('express');
const { body, param } = require('express-validator');
const ingredientsController = require('../controllers/ingredientsController');

const router = express.Router();

/**
 * @openapi
 * /api/ingredientss:
 *   get:
 *     summary: Retrieve a list of ingredients
 *     responses:
 *       200:
 *         description: A list of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - price
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Jambon"
 *                 price:
 *                   type: number
 *                   example: 3.5
 *   post:
 *     summary: Create a new ingredient
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - price
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Jambon"
 *                 price:
 *                   type: number
 *                   example: 3.5
 *     responses:
 *       201:
 *         description: Ingredient created
 *       400:
 *         description: Invalid input
 */

/**
 * @openapi
 * /api/ingredients/{id}:
 *   get:
 *     summary: Get an ingredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ingredient object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - price
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Jambon"
 *                 price:
 *                   type: number
 *                   example: 3.5
 *       404:
 *         description: Ingredient not found
 *   put:
 *     summary: Update an Ingredient by ID
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
 *                 - name
 *                 - price
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Jambon"
 *                 price:
 *                   type: number
 *                   example: 3.5
 *     responses:
 *       200:
 *         description: Ingredient updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Ingredient not found
 *   delete:
 *     summary: Delete an ingredient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Ingredient deleted
 *       404:
 *         description: Ingredient not found
 */

/**
 * Validation rules
 */
const createAndUpdateValidations = [
    body('name').isString().notEmpty().withMessage('name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('price must be a positive number'),
];

router.get('/', ingredientsController.findAll);
router.post('/', createAndUpdateValidations, ingredientsController.create);
router.get('/:id', [param('id').isInt().withMessage('id must be an integer')], ingredientsController.findOne);
router.put('/:id', [param('id').isInt().withMessage('id must be an integer'), ...createAndUpdateValidations], ingredientsController.update);
router.delete('/:id', [param('id').isInt().withMessage('id must be an integer')], ingredientsController.delete);

module.exports = router;
