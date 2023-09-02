import {Router} from 'express'
import { accountController } from '../controllers';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/* Note: these routes already have 'admins' part on them */

/**
 * @swagger
 * /api/v1/admins/:
 *   post:
 *     summary: Create a new account.
 *     tags:
 *       - Account
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
 *     responses:
 *       200:
 *         description: Account successfully created.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.post('/', accountController.Create); // Retrieves a list of admins


/**
 * @export {express.Router}
 */
export default router;
