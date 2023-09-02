import * as bcrypt from 'bcryptjs';
import { AccountModel } from '../database/models';
import { AccountAttributes } from '../database/attributes';
import { Request, Response, NextFunction } from 'express';

function emailValidation (email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}


// export interface AccountInterface {
//     account_id?: number
//     account_uuid?: string
//     fisrt_name?: string
//     last_name?: string
//     email?: string
//     phone_number?: string
//     password?: string
//     is_active?: boolean
//     createdAt?: Date
//     updatedAt?: Date  

// }

export async function Create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const salt: string = await bcrypt.genSalt(10)

    const {
        fisrt_name,
        last_name,
        email,
        phone_number,
        password
    } = req.body

    const encrypted = await bcrypt.hash(password, salt)

    const account = <AccountAttributes>{
        fisrt_name: fisrt_name || null,
        last_name: last_name || null,
        phone_number: phone_number || null,
      email: email || null,
      password: encrypted
    }

    if (account.fisrt_name === null) {
      res.statusCode = 400
      throw new Error('O campo [ Nome ] é obrigatório')
    }

    if (account.last_name === null) {
        res.statusCode = 400
        throw new Error('O campo [ Nome ] é obrigatório')
      }

    if (account.phone_number === null) {
      res.statusCode = 400
      throw new Error('O campo [ Telefone ] é obrigatório')
    }


    if (account.email === null) {
      res.statusCode = 400
      throw new Error('O campo [ E-mail ] é obrigatório')
    }

    if (!emailValidation(account.email)) {
      res.statusCode = 400
      throw new Error('E-mail Inválido')
    }

    const findOneEmail: AccountAttributes = await AccountModel.findOne({
      where: {
        email: account.email
      },
      order: [['createdAt', 'DESC']]
    }) as AccountAttributes

    if (findOneEmail) {
      res.statusCode = 400
      throw new Error('Email já registrado!')
    }

    if (password === undefined || password === '') {
      res.statusCode = 400
      throw new Error('O campo [ Senha ] é obrigatório')
    }

    if (password.length < 6) {
      res.statusCode = 400
      throw new Error('O campo [ Senha ] deve ter ao menos 6 dígitos')
    }

    const created: AccountAttributes = await AccountModel.create(account)
    delete created.password
    res.json({
      account: created,
      statusCode: res.statusCode
    })
  } catch (error) {
    res.json({
      message: error.message
    })
  }
}
