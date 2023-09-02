// External libraries
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

// Internal modules
import {  AccountAttributes } from "../database/attributes";
import { AccountModel } from '../database/models'

// Environmental variables
const { JWT_SECRET, JWT_EXPIRE } = process.env;


interface LoginInterface {
    email: string
    password: string
  }
  
  export async function Authentication (req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

  
        if (!email || !password) {
            return sendErrorResponse(res, 400, 'Informe E-mail e Senha para efetuar o login!');
        }

        console.log(email, password)

        const account = await AccountModel.findOne({
            where: { email },
            order: [['createdAt', 'DESC']]
        });

        console.log(account)

        if (!account) {
            return sendErrorResponse(res, 400, 'E-mail não encontrado');
        }

        const isValidPassword = await bcrypt.compare(password, account.password);
        if (!isValidPassword) {
            return sendErrorResponse(res, 400, 'E-mail ou Senha incorreto');
        }

      const tokenPayload: AccountAttributes = <AccountAttributes>{
        account_id: account.account_id,
        account_uuid: account.account_uuid,
        fisrt_name: account.fisrt_name,
        last_name: account.last_name,
        phone_number: account.phone_number,
        is_active: account.is_active,
        email: account.email,
        uuid: account.account_uuid,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
        // password: findOneAccount.password
    
      }
  
      const token: string = jwt.sign(tokenPayload, JWT_SECRET, {
        expiresIn: JWT_EXPIRE
      })
  
      res.json({
        account: tokenPayload,
        statusCode: res.statusCode,
        token
      })
    } catch (error) {
      res.json({
        message: error.message
      })
    }
  }
  
  /**
 * Sends an error response with the given status code and message.
 *
 * @param res - Express response object.
 * @param statusCode - HTTP status code.
 * @param message - Error message.
 */
function sendErrorResponse(res: Response, statusCode: number, message: string): void {
  res.status(statusCode).json({
      message
  });
}
