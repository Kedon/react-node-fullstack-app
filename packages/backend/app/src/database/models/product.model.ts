import { Model, BIGINT, UUIDV1, DataTypes } from 'sequelize';
import { AccountModel } from '.';
import sequelize from '../sequelizeConnection';
import { ProductAttributes } from '../attributes';

export class Product extends Model implements ProductAttributes {
  public product_id!: number
  public account_id!: number
  public product_uuid!: string
  public product_url_thumbnail: string
  public product_name: string
  public product_description: string
  public is_active!: boolean
  public deleted!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Product.init({
  product_id: {
    type: BIGINT(),
    primaryKey: true,
    autoIncrement: true
  },
  account_id: {
    type: BIGINT(),
    allowNull: false,
    references: {
      model: AccountModel,
      key: 'account_id'
    }
  },
  product_uuid: {
    type: DataTypes.UUID,
    defaultValue: UUIDV1
  },
  product_url_thumbnail: {
    type: DataTypes.STRING(300),
    allowNull: true
  },
  product_name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notNull: { msg: 'The product product_name is required!' },
      len: {
        args: [3, 200],
        msg: 'Name must be atleast 3 characters in length and max 200'
      }
    }
  },
  product_description: {
    type: DataTypes.STRING(1000)
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'Product',
  paranoid: true, //inclusão do soft delete
  indexes: [{ unique: true, fields: ['product_id'] }]
})

AccountModel.hasMany(Product, { foreignKey: 'account_id', as: 'account_product' })
Product.belongsTo(AccountModel, { foreignKey: 'account_id', targetKey: 'account_id', as: 'account_product' })

export default Product
