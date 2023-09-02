module.exports = {
    up: async (queryInterface, DataTypes) => {
      await queryInterface.createTable('Products', {
        product_id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
        account_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'Account', // Make sure this refers to the correct table name, usually pluralized
            key: 'account_id'
          }
        },
        product_uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1
        },
        url_thumbnail: {
          type: DataTypes.STRING(300),
          allowNull: true
        },
        product_name: {
          type: DataTypes.STRING(200),
          allowNull: false
        },
        description: {
          type: DataTypes.STRING(1000),
          allowNull: true
        },
        ncm: {
          type: DataTypes.STRING,
          allowNull: true
        },
        migration: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gtin: {
          type: DataTypes.STRING,
          allowNull: true
        },
        sku: {
          type: DataTypes.STRING,
          allowNull: true
        },
        ean: {
          type: DataTypes.STRING,
          allowNull: true
        },
        weight: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        height: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        width: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        depth: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        emphasis: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        },
        deleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        }
      });
    },
  
    down: async (queryInterface, DataTypes) => {
      await queryInterface.dropTable('Products');
    }
  };
  