import { Op } from 'sequelize'
import { AccountModel } from '../database/models'
import { AccountAttributes } from '../database/attributes'


export async function updateAccount (account: AccountAttributes): Promise<void> {
  const { account_id, account_uuid } = account
  await AccountModel.update(
    account,
    { where: { [Op.and]: [{ account_id: account_id, account_uuid: account_uuid }] } }
  )
}

export async function findOneAccount (account_id: number, account_uuid: string): Promise<AccountAttributes> {
  let where: any = {}

  where = {
    [Op.and]: [{ account_id: account_id, account_uuid: account_uuid }]
  }

  return await AccountModel.findOne({
    where: { ...where }
  })
}
