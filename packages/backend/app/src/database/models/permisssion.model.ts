
import { Model, STRING, ENUM, UUID, BOOLEAN } from 'sequelize'
import sequelize from '../sequelizeConnection';
import { PermissionAttributes } from '../attributes';
import { EPermissionType } from '../attributes/Permission';

/**
 * Class that control ...N user types login
 */
export class Permission extends Model implements PermissionAttributes {
    id?:number;
    user_uuid?: string;
    type: EPermissionType;
    email: string;
    isActive?: boolean;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}

Permission.init(
    {
        user_uuid: {
            type: UUID,
            primaryKey: false,
        },
        type: {
            type: ENUM('PRO', 'USER', 'ADMIN'),
            defaultValue: 'USER'
        },
        email: STRING(50),
        password: STRING(100),
        isActive: {
            type: BOOLEAN,
            defaultValue: true
        }
    },
    { 
        sequelize, 
        modelName: 'Permission',
        indexes: [
            {
                unique: true,
                fields: ['email', 'type']
            }
        ] 
    }
);