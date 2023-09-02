import {NextFunction, Request, Response} from 'express';
import HttpError from "../services/error";
import * as dotEnv from 'dotenv';
import { productRepo } from '../repos/index'

import {getJwtPayloadUserDetails} from "../utils/authUtils";

import { ProductAttributes } from '../database/attributes'
import { Query } from '../interfaces/query.interface';

/** Porperties specific for products query */
export interface ProductQuery extends Query {
    product_id?: number;
    account_id: number;
}

dotEnv.config();
  
/**
 * Retrieve all products.
 * @param {Request} req - Incoming request.
 * @param {Response} res - Outgoing response.
 * @param {NextFunction} next - Next middleware.
 * @returns {Promise<void>}
 */
export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const payloadUser = await getJwtPayloadUserDetails(req);

         /** Query attributes */
         const { 
            currentPage = 1, 
            pageSize = global.DEFAULT_PAGE_SIZE, 
            orderBy,
            orderByDirection,
            startDate, 
            searchTerm,
            endDate } = req.query;
         
         const progressQuery = <ProductQuery>{
            account_id: Number(payloadUser.account_id) || null,
            currentPage: currentPage,
            pageSize: Number(pageSize),
            orderBy: orderBy,
            orderByDirection: orderByDirection,
            startDate: startDate || null,
            endDate: endDate || null,
            searchTerm: searchTerm || null
         }

        const products = await productRepo.findAll({
            account_id: progressQuery.account_id, 
            currentPage: progressQuery.currentPage, 
            pageSize: progressQuery.pageSize, 
            orderBy: progressQuery.orderBy, 
            orderByDirection: progressQuery.orderByDirection, 
            startDate: progressQuery.startDate, 
            searchTerm: progressQuery.searchTerm, 
            endDate: progressQuery.endDate
        })

        res.json(
            products
        );
    
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: 400,
            message: error.message
        });
    }
}

/**
 * Retrieve a single product by its ID.
 * @param {Request} req - Incoming request.
 * @param {Response} res - Outgoing response.
 * @param {NextFunction} next - Next middleware.
 * @returns {Promise<void>}
 */
export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const payloadUser = await getJwtPayloadUserDetails(req);
        const product_id = Number(req.params.product_id);
        if (product_id === undefined) {
            throw new Error('O ID não foi informado');
        }

        let product = await productRepo.findOne(product_id, payloadUser.account_id)

        if(!product) {
            return next(new HttpError(404,'Nenhum produto encontrado!'));
        }

        res.json(product);
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: 400,
            message: error.message
        });
    }
}

/**
 * Create a new produtct
 * @param {Request} req - Incoming request.
 * @param {Response} res - Outgoing response.
 * @param {NextFunction} next - Next middleware.
 * @returns {Promise<void>}
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const payloadUser = await getJwtPayloadUserDetails(req);

        const { account_id } = payloadUser
        const {
            product_url_thumbnail,
            product_name,
            product_description,
            product_price = null
        } = req.body

        const product = <ProductAttributes>{
            account_id: account_id,
            product_url_thumbnail: product_url_thumbnail,
            product_name: product_name,
            product_description: product_description,
            product_price: product_price,
        }

        if (product.product_name === undefined) {
            res.statusCode = 400;
            throw new Error('Product name is required');
        }

        const savedItem: ProductAttributes = await productRepo.create(product)

        const messageData = {
            product_id: savedItem.product_id,
            product_uuid: savedItem.product_uuid,
            account_id: savedItem.account_id,
            product_url_thumbnail: savedItem.product_url_thumbnail,
            product_name: savedItem.product_name,
            product_description: savedItem.product_description,
            product_price: savedItem.product_price,
            is_active: savedItem.is_active,
            createdAt: savedItem.createdAt
        }
        res.json({
            status: 200,
            message: messageData
            // httpError: new HttpError(res.statusCode || 400, error.message)
        });

    } catch (error) {
        console.log(error)
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: res.statusCode || 400,
            message: error.message,
            httpError: new HttpError(res.statusCode || 400, error.message)
        });
    }
}

/**
 * Update product by its ID.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 * @returns {Promise<void>}
 */
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const payloadUser = await getJwtPayloadUserDetails(req);

        const { account_id } = payloadUser;

        const product_id = Number(req.params.product_id);
        if (!product_id) {
            res.statusCode = 400;
            throw new Error('Product ID is required for updating');
        }

        const {
            product_url_thumbnail,
            product_name,
            product_description,
            product_price = null
        } = req.body;

        const updatedProduct = <ProductAttributes>{
            account_id: account_id,
            product_url_thumbnail: product_url_thumbnail,
            product_name: product_name,
            product_description: product_description,
            product_price: product_price,
        };

        if (updatedProduct.product_name === undefined) {
            res.statusCode = 400;
            throw new Error('Product name is required');
        }

        const savedItem: ProductAttributes = await productRepo.update(product_id, updatedProduct);

        if (!savedItem) {
            res.statusCode = 404;
            throw new Error('Product not found or not updated');
        }

        const messageData = {
            product_id: savedItem.product_id,
            product_uuid: savedItem.product_uuid,
            account_id: savedItem.account_id,
            product_url_thumbnail: savedItem.product_url_thumbnail,
            product_name: savedItem.product_name,
            product_description: savedItem.product_description,
            product_price: savedItem.product_price,
            is_active: savedItem.is_active,
            updatedAt: savedItem.updatedAt  // Note: changed from createdAt to updatedAt
        };
        res.json({
            status: 200,
            message: messageData
            // httpError: new HttpError(res.statusCode || 400, error.message)
        });

    } catch (error) {
        console.log(error);
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: res.statusCode || 400,
            message: error.message,
            httpError: new HttpError(res.statusCode || 400, error.message)
        });
    }
}

/**
 * Update the 'is_active' property of a product by its ID.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 * @returns {Promise<void>}
 */
export async function patchActiveStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const payloadUser = await getJwtPayloadUserDetails(req);
        const { account_id } = payloadUser;
        const product_id = Number(req.params.product_id);
        const { is_active } = req.body;

        const isActiveBoolean = is_active === "true" ? true : is_active === "false" ? false : null;

        if (isNaN(product_id)) {
            next(new HttpError(400, 'O ID não foi informado!'));
            return;
        }

        if (isActiveBoolean === null) {
            next(new HttpError(400, 'is_active property should be a boolean.'));
            return;
        }

        const updatedProduct: any = await productRepo.updateProductStatus(product_id, account_id, isActiveBoolean);
        if(!updatedProduct){
            res.json({
                status: 400,
                message: 'Ocorreu um erro ao atualizar o produto. Contate o administrador do sistema.'
            });
            return;
        } else {
            res.json({
                status: 200,
                message: 'Product status successfully changed',
                data: { product_id: product_id, is_active: is_active }
            });
            return;
        }
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: 400,
            message: error.message
        });
    }
}


/**
 * Delete product by its ID.
 * @param req
 * @param res
 * @param next
 */
export async function deleteOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const payloadUser = await getJwtPayloadUserDetails(req);
        const { account_id } = payloadUser
        const product_id = Number(req.params.product_id);

        console.log(req)

        if (isNaN(product_id)) {
            next(new HttpError(400, 'O ID não foi informado!'))
        }

        const deleteData: any = await productRepo.deleteOne(product_id, account_id);
        if(!deleteData){
            res.json({
                status: 400,
                message: 'Ocorreu um erro ao apagar o item. Contate o administrador do sistema.'
            })
    
        } else {
            res.json({
                status: 200,
                message: { product_id: product_id}
            })
    
        }
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: 400,
            message: error.message
        });
    }
}