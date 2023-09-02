import * as bcrypt from 'bcryptjs';
import { AccountModel } from '../database/models';
import { AccountAttributes } from '../database/attributes';
import { accountRepo } from '../repos/index'
import { Request, Response, NextFunction } from 'express';
import { getJwtPayloadUserDetails } from "../utils/authUtils";
import { Query } from '../interfaces/query.interface';

function emailValidation(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
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
      res.statusCode = 400;
      throw new Error('The field [First Name] is required.');
    }

    if (account.last_name === null) {
      res.statusCode = 400;
      throw new Error('The field [Last Name] is required.');
    }

    if (account.phone_number === null) {
      res.statusCode = 400;
      throw new Error('The field [Phone Number] is required.');
    }

    if (account.email === null) {
      res.statusCode = 400;
      throw new Error('The field [Email] is required.');
    }

    if (!emailValidation(account.email)) {
      res.statusCode = 400;
      throw new Error('Invalid email.');
    }

    const findOneEmail: AccountAttributes = await AccountModel.findOne({
      where: {
        email: account.email
      },
      order: [['createdAt', 'DESC']]
    }) as AccountAttributes;

    if (findOneEmail) {
      res.statusCode = 400;
      throw new Error('Email already registered.');
    }

    if (password === undefined || password === '') {
      res.statusCode = 400;
      throw new Error('The field [Password] is required.');
    }

    if (password.length < 6) {
      res.statusCode = 400;
      throw new Error('The field [Password] must be at least 6 characters long.');
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

/**
 * Update an existing account.
 * @param {Request} req - Incoming request.
 * @param {Response} res - Outgoing response.
 * @param {NextFunction} next - Next middleware.
 * @returns {Promise<void>}
 */
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const account_id = req.params.account_id;

    if (!account_id) {
      throw new Error('Account ID is missing.');
    }

    const existingAccount = await AccountModel.findOne({ where: { account_id: account_id } });

    if (!existingAccount) {
      res.statusCode = 404;
      throw new Error('Account not found.');
    }

    const {
      fisrt_name,
      last_name,
      email,
      phone_number,
      password
    } = req.body;

    // Only hash the password if it's provided in the request
    const encrypted = password ? await bcrypt.hash(password, 10) : existingAccount.password;

    const accountToUpdate: Partial<AccountAttributes> = {
      fisrt_name: fisrt_name || null,
      last_name: last_name || null,
      phone_number: phone_number || null,
      email: email || null,
      password: encrypted
    };

    if (accountToUpdate.fisrt_name === null) {
      throw new Error('The field [ First Name ] is required.');
    }

    if (accountToUpdate.last_name === null) {
      throw new Error('The field [ Last Name ] is required.');
    }

    if (accountToUpdate.phone_number === null) {
      throw new Error('The field [ Phone Number ] is required.');
    }

    if (accountToUpdate.email !== existingAccount.email) {
      const emailExists = await AccountModel.findOne({ where: { email: accountToUpdate.email } });

      if (emailExists) {
        throw new Error('Email already registered!');
      }
    }

    if (password && password.length < 6) {
      throw new Error('The field [ Password ] must have at least 6 digits.');
    }

    const updatedAccount = await existingAccount.update(accountToUpdate);

    // Convert the Sequelize instance to a plain JavaScript object
    const accountData = updatedAccount.get({ plain: true }) as AccountAttributes;
    delete accountData.password;

    res.json({
      account: accountData,
      statusCode: res.statusCode
    });
  } catch (error) {
    res.json({
      message: error.message
    });
  }
}

/**
 * Retrieve all accounts.
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

    const progressQuery = <Query>{
      currentPage: currentPage,
      pageSize: Number(pageSize),
      orderBy: orderBy,
      orderByDirection: orderByDirection,
      startDate: startDate || null,
      endDate: endDate || null,
      searchTerm: searchTerm || null
    }

    const accounts = await accountRepo.findAll({
      currentPage: progressQuery.currentPage,
      pageSize: progressQuery.pageSize,
      orderBy: progressQuery.orderBy,
      orderByDirection: progressQuery.orderByDirection,
      startDate: progressQuery.startDate,
      searchTerm: progressQuery.searchTerm,
      endDate: progressQuery.endDate
    })


    res.json({
      statusCode: 200,
      accounts: accounts
    });
  } catch (error) {
    res.json({
      statusCode: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
}

/**
 * Retrieve a specific account by ID.
 * @param {Request} req - Incoming request.
 * @param {Response} res - Outgoing response.
 * @param {NextFunction} next - Next middleware.
 * @returns {Promise<void>}
 */
export async function getAccountById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const account_id = Number(req.params.account_id);

    if (isNaN(account_id)) {
      res.statusCode = 400;
      throw new Error('Invalid account ID format');
    }

    const account: AccountAttributes | null = await AccountModel.findByPk(account_id);

    if (!account) {
      res.statusCode = 404;
      throw new Error('Account not found');
    }

    res.json({
      statusCode: 200,
      account: account
    });
  } catch (error) {
    res.json({
      statusCode: error.statusCode || 500,
      message: error.message
    });
  }
}

/**
 * Disable an account by setting the is_active property to false.
 * @param {Request} req - Incoming request.
 * @param {Response} res - Outgoing response.
 * @param {NextFunction} next - Next middleware.
 * @returns {Promise<void>}
 */
export async function patchActiveStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const account_id = Number(req.params.account_id);

    if (isNaN(account_id)) {
      res.statusCode = 400;
      throw new Error('Invalid account ID format');
    }

    const account = await AccountModel.findByPk(account_id);

    if (!account) {
      res.statusCode = 404;
      throw new Error('Account not found');
    }

    account.is_active = !account.is_active;
    await account.save();

    res.json({
      statusCode: 200,
      message: 'Account status successfully changed',
      data: { account_id: account.account_id, is_active: account.is_active }
    });
  } catch (error) {
    res.json({
      statusCode: error.statusCode || 500,
      message: error.message
    });
  }
}

/**
 * Delete a specific account by ID.
 * @param {Request} req - Incoming request.
 * @param {Response} res - Outgoing response.
 * @param {NextFunction} next - Next middleware.
 * @returns {Promise<void>}
 */
export async function deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const account_id = Number(req.params.account_id);

    if (isNaN(account_id)) {
      res.statusCode = 400;
      throw new Error('Invalid account ID format');
    }

    const account = await AccountModel.findByPk(account_id);

    if (!account_id || !account) {
      res.statusCode = 404;
      throw new Error('Account not found');
    }

    if (account.email === 'admin@admin.com') {
      res.statusCode = 400;
      throw new Error('You cannot delete this account');
    }

    await account.destroy();

    res.json({
      statusCode: 200,
      message: 'Account successfully deleted'
    });
  } catch (error) {
    res.json({
      statusCode: error.statusCode || 500,
      message: error.message
    });
  }
}
