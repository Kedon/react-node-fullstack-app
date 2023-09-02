import { Model, DataTypes, BIGINT, UUIDV1 } from 'sequelize'
import * as bcrypt from 'bcryptjs';
import sequelize from '../sequelizeConnection';
import { AccountAttributes } from '../attributes';

export class Account extends Model implements AccountAttributes {
    public account_id!: number
    public account_uuid!: string
    public fisrt_name: string
    public last_name: string
    public email: string
    public phone_number: string
    public password: string
    public is_active!: boolean
    public readonly createdAt!: Date
    public readonly updatedAt!: Date  
}

const enum Genre {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    UNDEFINED = 'UNDEFINED'
}

Account.init({
    account_id: {
        type: BIGINT(),
        primaryKey: true,
        autoIncrement: true
    },
    account_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV1
    },
    fisrt_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notNull: { msg: 'The fisrt_name field is required!' },
            len: {
                args: [2, 200],
                msg: 'Name must be atleast 2 characters in length and max 200'
            }
        }
    },
    last_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notNull: { msg: 'The last_name field is required!' },
            len: {
                args: [2, 200],
                msg: 'Name must be atleast 2 characters in length and max 200'
            }
        }
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: 'This e-mail already exist!',
        validate: {
             notNull: { msg: 'The email is required!' }, 
             isEmail: { msg: 'Email address must be valid' }
        }
    },
    phone_number: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: { notNull: { msg: 'The phone_number is required!' } }
    },    
    password: {
        type: DataTypes.STRING(256),
        allowNull: false,
        validate: { notNull: { msg: 'The password is required!' } }
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
    modelName: 'Account', 
    paranoid: true, //inclusão do soft delete
    indexes: [{ unique: true, fields: ['email'] }] })


async function createAccount(){
    Account.sync({force: false}).then( async () =>{
        try {
            const salt: string = await bcrypt.genSalt(10);
            const account: any = await Account.create({
                fisrt_name: "Admin",
                last_name: "Master",
                email: "admin@admin.com",
                phone_number: "(11)99999-9999",
                password: await bcrypt.hash('123456', salt),
                isActive: true
            })

        } catch(error) {
            console.log(error)
        }
    })
}
// createAccount()
