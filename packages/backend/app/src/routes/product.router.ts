import {Router} from 'express';
import { productController } from '../controllers';
import { isAuthenticated } from '../services/jwtAuth'

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/* Note: these routes already have '/reasons' part on them */

/**
 * @swagger
 * /api/v1/products/:
 *   get:
 *      description: Get all reasons
 *      tags: ["Products"]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: number
 *          description: page number
 *        - in: query
 *          name: pageSize
 *          schema:
 *              type: number
 *          description: page size
 *        - in: query
 *          name: patient_id
 *          schema:
 *              type: integer
 *          description: The id of patient
 *        - in: query
 *          name: startDate
 *          schema:
 *              type: string
 *          description: createdAt start (from) Ex 2020-12-01
 *        - in: query
 *          name: endDate
 *          schema:
 *              type: string
 *          description: createdAt end (to) Ex 2020-12-01
 *      security:
 *       - bearerAuth: []
 *      responses:
 *        201:
 *          description: return created feeling
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: ''
 */
router.get('/', isAuthenticated, productController.getAll); // Retrieves a list of reasons

/**
 * @swagger
 * /api/v1/products/{product_id}:
 *   get:
 *     summary: Retrieve a single product by its ID
 *     description: Endpoint to fetch details of a specific product
 *     tags: ["Products"]
 *     parameters:
 *       - in: path
 *         name: product_id
 *         schema:
 *             type: integer
 *         required: true
 *         description: ID of the product to retrieve
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Details of the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_id:
 *                   type: integer
 *                   example: 1
 *                 account_id:
 *                   type: integer
 *                   example: 1001
 *                 product_uuid:
 *                   type: string
 *                   format: uuid
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 product_url_thumbnail:
 *                   type: string
 *                   example: "https://example.com/thumbnail.jpg"
 *                 product_name:
 *                   type: string
 *                   example: "Example Product"
 *                 product_description:
 *                   type: string
 *                   example: "This is an example product."
 *                 product_price:
 *                   type: number
 *                   format: float
 *                   example: 99.99
 *                 is_active:
 *                   type: boolean
 *                   example: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-09-02T10:00:00Z"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Nenhum produto encontrado!"
 *       400:
 *         description: Bad request (e.g. ID not provided)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "O ID não foi informado"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */

router.get('/:product_id', isAuthenticated, productController.getOne); // Retrieves a specific feeling

/**
 * @swagger
 * /api/v1/products/:
 *   post:
 *      description: Create new feeling
 *      summary: Create a new feeling
 *      tags: ["Products"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: feeling creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: ''
 *            example:
 *              title: Check feeling a scheduling (appointment)
 *              description: Ut vitae aliquet enim, vitae pulvinar augue. Aenean ultrices odio ac sem aliquam tincidunt. Nam semper est in leo vulputate egestas. Nullam in magna laoreet, fringilla orci in, convallis eros. Ut scelerisque, tortor quis ultrices pulvinar, massa felis pretium odio, in consequat risus urna at augue. Proin interdum fermentum neque, id aliquet neque fermentum quis.
 *      responses:
 *        201:
 *          description: return created feeling
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: ''
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: ''
 */
 router.post('/', isAuthenticated,  productController.create); // Bulk create products

 /**
 * @swagger
 * /api/v1/products/{product_id}:
 *   put:
 *      description: Update a product by ID
 *      tags: ["Products"]
 *      parameters:
 *        - in: path
 *          name: product_id
 *          required: true
 *          schema:
 *              type: integer
 *          description: ID of the product to update
 *        - in: body
 *          name: product
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              product_url_thumbnail:
 *                type: string
 *                description: URL of the product's thumbnail
 *              product_name:
 *                type: string
 *                description: Name of the product
 *                required: true
 *              product_description:
 *                type: string
 *                description: Description of the product
 *              product_price:
 *                type: number
 *                description: Price of the product
 *      security:
 *       - bearerAuth: []
 *      responses:
 *        200:
 *          description: Product updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: number
 *                  message:
 *                    type: object
 *                    properties:
 *                      product_id:
 *                        type: integer
 *                      product_uuid:
 *                        type: string
 *                      account_id:
 *                        type: integer
 *                      product_url_thumbnail:
 *                        type: string
 *                      product_name:
 *                        type: string
 *                      product_description:
 *                        type: string
 *                      product_price:
 *                        type: number
 *                      is_active:
 *                        type: boolean
 *                      updatedAt:
 *                        type: string
 *                        format: date-time
 *        400:
 *          description: Bad request, e.g. missing required fields or validation errors
 *        404:
 *          description: Product not found
 *        500:
 *          description: Internal server error
 */
router.put('/:product_id', isAuthenticated,  productController.update); // Create a new feeling
 
/**
 * @swagger
 * /api/v1/products/:
 *   post:
 *     summary: Create a new product
 *     description: Endpoint to create a new product
 *     tags: ["Products"]
 *     requestBody:
 *       description: Product data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_url_thumbnail:
 *                 type: string
 *                 description: Product thumbnail URL
 *                 example: "https://example.com/thumbnail.jpg"
 *               product_name:
 *                 type: string
 *                 description: Product name
 *                 example: "Example Product"
 *               product_description:
 *                 type: string
 *                 description: Product description
 *                 example: "This is an example product."
 *               product_price:
 *                 type: number
 *                 format: float
 *                 description: Product price
 *                 example: 99.99
 *             required:
 *               - product_name
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                       example: 1
 *                     product_uuid:
 *                       type: string
 *                       format: uuid
 *                       example: "550e8400-e29b-41d4-a716-446655440000"
 *                     account_id:
 *                       type: integer
 *                       example: 1001
 *                     product_url_thumbnail:
 *                       type: string
 *                       example: "https://example.com/thumbnail.jpg"
 *                     product_name:
 *                       type: string
 *                       example: "Example Product"
 *                     product_description:
 *                       type: string
 *                       example: "This is an example product."
 *                     product_price:
 *                       type: number
 *                       format: float
 *                       example: 99.99
 *                     is_active:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-09-02T10:00:00Z"
 *       400:
 *         description: Bad request (required fields missing or validation error)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Product name is required"
 *                 httpError:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       example: 400
 *                     message:
 *                       type: string
 *                       example: "Product name is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 httpError:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: "Internal Server Error"
 */
router.post('/', isAuthenticated,  productController.create); // Create a new feeling

// Todo: improve swagger doc!
/**
 * @swagger
 * /api/v1/products/{product_id}/active-status:
 *   patch:
 *      description: Update the active status of a product by ID
 *      tags: ["Products"]
 *      parameters:
 *        - in: path
 *          name: product_id
 *          required: true
 *          schema:
 *              type: integer
 *          description: ID of the product to update
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                is_active:
 *                  type: boolean
 *                  description: Active status of the product
 *      security:
 *       - bearerAuth: []
 *      responses:
 *        200:
 *          description: Product active status updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: number
 *                  message:
 *                    type: object
 *                    properties:
 *                      product_id:
 *                        type: integer
 *                      is_active:
 *                        type: boolean
 *        400:
 *          description: Bad request, e.g. invalid ID or invalid is_active property provided
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: number
 *                  message:
 *                    type: string
 *        500:
 *          description: Internal server error
 */
router.patch('/:product_id/change-status', productController.patchActiveStatus); // Partial update for one feeling

// // Todo: improve swagger doc!
/**
 * @swagger
 * /api/v1/products/{product_id}:
 *   delete:
 *      description: Delete a product by ID
 *      tags: ["Products"]
 *      parameters:
 *        - in: path
 *          name: product_id
 *          required: true
 *          schema:
 *              type: integer
 *          description: ID of the product to delete
 *      security:
 *       - bearerAuth: []
 *      responses:
 *        200:
 *          description: Product deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: number
 *                  message:
 *                    type: object
 *                    properties:
 *                      product_id:
 *                        type: integer
 *        400:
 *          description: Bad request, e.g. invalid ID provided or other issues
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: number
 *                  message:
 *                    type: string
 *        500:
 *          description: Internal server error
 */

router.delete('/:product_id', isAuthenticated, productController.deleteOne); // Delete feeling


/**
 * @export {express.Router}
 */
export default router;
