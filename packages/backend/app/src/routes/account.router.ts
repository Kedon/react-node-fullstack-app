import {Router} from 'express'
import { accountController } from '../controllers';
import { isAuthenticated } from '../services/jwtAuth'

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/* Note: these routes already have 'accounts' part on them */

/**
 * @swagger
 * /api/v1/accounts/:
 *   post:
 *     summary: Create a new account.
 *     tags:
 *       - Accounts
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fisrt_name
 *               - last_name
 *               - email
 *               - phone_number
 *               - password
 *             properties:
 *               fisrt_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone_number:
 *                 type: string
 *               password:
 *                 type: string
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account successfully created.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.post('/', isAuthenticated, accountController.create); // Retrieves a list of accounts

/**
 * @swagger
 * /api/v1/accounts/{account_id}:
 *   put:
 *     summary: Update an existing account.
 *     tags:
 *       - Accounts
 *     parameters:
 *       - in: path
 *         name: account_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the account to update.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fisrt_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone_number:
 *                 type: string
 *               password:
 *                 type: string
 *               description: Password is optional. If provided, the system will update the password. If not, the password remains the same.
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account successfully updated.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:account_id', isAuthenticated, accountController.update); // Retrieves a list of accounts

/**
 * @swagger
 * /api/v1/accounts/:
 *   get:
 *     summary: Retrieve a list of all accounts.
 *     tags:
 *       - Accounts
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of accounts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 *       500:
 *         description: Internal server error.
 */
router.get('/', isAuthenticated, accountController.getAll); // Retrieves a list of accounts

/**
 * @swagger
 * /api/v1/accounts/{id}:
 *   get:
 *     summary: Retrieve a specific account by ID.
 *     tags:
 *       - Accounts
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Account ID.
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: A specific account.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       400:
 *         description: Invalid account ID format.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:account_id', isAuthenticated, accountController.getAccountById); // Retrieves a list of accounts

/**
 * @swagger
 * /api/v1/accounts/{id}/disable:
 *   patch:
 *     summary: Toggle status of a specific account by ID.
 *     tags:
 *       - Accounts
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Account ID.
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account status successfully changed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid account ID format.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:account_id/change-status', isAuthenticated, accountController.patchActiveStatus); // Retrieves a list of accounts

/**
 * @swagger
 * /api/v1/accounts/{id}:
 *   delete:
 *     summary: Delete a specific account by ID.
 *     tags:
 *       - Accounts
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Account ID.
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid account ID format.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:account_id', isAuthenticated, accountController.deleteAccount); // Retrieves a list of accounts


/**
 * @export {express.Router}
 */
export default router;
