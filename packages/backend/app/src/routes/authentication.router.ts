import {Router} from 'express';
import { authenticationController } from '../controllers';

/**
 * @constant {express.Router}
 */
const router: Router = Router();


/**
 * POST method route
 * @example http://localhost:PORT/auth/login
 *
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Authenticate user and return token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful.
 *       400:
 *         description: Bad request.
 */
router.post('/', authenticationController.Authentication);

/**
 * @export {express.Router}
 */
export default router;
