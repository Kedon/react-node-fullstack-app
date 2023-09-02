import { Op, Sequelize } from 'sequelize'
import { AccountModel } from '../database/models'
import { AccountAttributes } from '../database/attributes'
import { Response } from '../interfaces/response.interface'


// export async function updateAccount (account: AccountAttributes): Promise<void> {
//   const { account_id, account_uuid } = account
//   await AccountModel.update(
//     account,
//     { where: { [Op.and]: [{ account_id: account_id, account_uuid: account_uuid }] } }
//   )
// }

// export async function findOneAccount (account_id: number, account_uuid: string): Promise<AccountAttributes> {
//   let where: any = {}

//   where = {
//     [Op.and]: [{ account_id: account_id, account_uuid: account_uuid }]
//   }

//   return await AccountModel.findOne({
//     where: { ...where }
//   })
// }

export async function findAll(Params:any): Promise<Response> {
  const orderingColumns = ['account_id', 'fisrt_name', 'last_name', 'email', 'phone_number', 'is_active', 'createdAt']
  const orderingColumnsDirection = ['asc', 'desc']
  let order: any = []
  //Order By
  if(orderingColumns.includes(Params.orderBy)){
    order.push(Params.orderBy)
  } else {
    order.push('createdAt')
  }

  //Order by direction
  if(orderingColumnsDirection.includes(Params.orderByDirection)){
    order.push(Params.orderByDirection)
  } else {
    order.push('asc')
  }

  // Create offset
  let offset = 0 + (Params.currentPage - 1) * Params.pageSize;
  // WHERE clausure
  let where: any = {};

  /**
   * Filter by patient_id
   */
  if (Params.account_id && Params.account_id !== undefined) {
    where.account_id = Params.account_id
  }
  /**
   * Filter by date range
   */
  if (Params.startDate && Params.endDate) {
    where.createdAt = {
      [Op.between]: [`${Params.startDate}T00:00:00.000Z`, `${Params.endDate}T23:59:59.000Z`]
    }
  }

  /** Filter by search term */
  if (Params.searchTerm) {
    
    where = {
      [Op.or]: [
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Product.fisrt_name')), 'LIKE', '%' + Params.searchTerm + '%'),
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Product.last_name')), 'LIKE', '%' + Params.searchTerm + '%'),
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Product.email')), 'LIKE', '%' + Params.searchTerm + '%'),
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Product.phone_number')), 'LIKE', '%' + Params.searchTerm + '%')
    ]
    }
  }


  /**
   * Execute Query
   */
  const { rows: result, count: total } = await AccountModel.findAndCountAll({
    limit: Params.pageSize,
    offset: offset,
    where: { ...where },
    order: [order]
  })



  let totalPages = Math.ceil(total / Params.pageSize);
  return { 
      orderingColumns,
      orderingBy: order,
      result, 
      total, 
      pageSize: Params.pageSize, 
      offset, 
      currentPage: Number(Params.currentPage), 
      totalPages,
      prevPage: Number(Params.currentPage) > 1 ? Number(Params.currentPage) - 1 : null,
      nextPage: totalPages > Number(Params.currentPage) ? Number(Params.currentPage) + 1 : null
    }
}

