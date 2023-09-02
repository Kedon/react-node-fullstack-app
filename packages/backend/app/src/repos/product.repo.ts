import { Op, Sequelize } from 'sequelize';
import { ProductModel } from '../database/models';
import { ProductAttributes } from '../database/attributes';
import { Response } from '../interfaces/response.interface'

export async function create(product: ProductAttributes): Promise<ProductAttributes> {
  return ProductModel.create(product);
}

export async function update(product_id: number, product: ProductAttributes): Promise<ProductModel> {
  const where = {product_id: product_id, account_id: product.account_id}

  return ProductModel.update(
    product,
    { where: { [Op.and]: [where] } }
  )
  .then(function () {
    const prod = ProductModel.findOne({where: where})
    return prod
  });
}

export async function updateProductStatus(product_id: number, account_id: number, isActive: boolean): Promise<ProductModel | null> {
  const where = { product_id: product_id, account_id: account_id };

  return ProductModel.update(
    { is_active: isActive },
    { where: { [Op.and]: [where] } }
  )
  .then(function () {
    return ProductModel.findOne({ where: where });
  });
}


export async function findAll(Params:any): Promise<Response> {
  const orderingColumns = ['product_id', 'product_name', 'description', 'is_active', 'createdAt']
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
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Product.product_name')), 'LIKE', '%' + Params.searchTerm + '%'),
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Product.product_description')), 'LIKE', '%' + Params.searchTerm + '%')
    ]
    }
  }


  /**
   * Execute Query
   */
  const { rows: result, count: total } = await ProductModel.findAndCountAll({
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

export function findOne(product_id: number, account_id: number): Promise<ProductAttributes> {
  return ProductModel.findOne({
      where: {
        product_id: product_id,
        account_id: account_id
      }
  })
}

export async function deleteOne(product_id: number, account_id: number): Promise<boolean> {
  return ProductModel.destroy({
      where: {
        product_id: product_id,
        account_id: account_id
      }
  }).then( res => {
    return res === 0 ? false : true
  })
}
