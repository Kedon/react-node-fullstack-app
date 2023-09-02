#==================================================
# DEVELOPMENT ENVIRONMENT VARIABLES
#==================================================

# Configuration file for setting up environment variables for development environment.
# These variables configure server settings, database connections, and other app-specific settings.


#==================================================
# ENVIRONMENT SETUP
#==================================================
# Determines the application environment.
# Can be 'development' for development purposes or 'production' for live deployment.
export NODE_ENV=development

#==================================================
# SERVER CONFIGURATION
#==================================================
# Determines if HTTPS is to be used for the server.
export USE_HTTPS=false
# The port number on which the server should listen.
export PORT=3002
# Base URL for the application. Typically the domain followed by any base path.
export URL=https://localhost:3002/api/v1

#==================================================
# DATABASE CONFIGURATION
#==================================================
# Specifies which database dialect is being used, e.g., postgres, mysql, etc.
export DB_DIALECT=postgres
# Hostname or IP address for the database server.
export DB_HOST=localhost
# Port number on which the database server is running.
export DB_PORT=5432
# Username for connecting to the database.
export DB_USER=''
# Password associated with the above username for the database.
export DB_PASSWORD=''
# Name of the database to connect to.
export DB_DATABASE=node_sample_project
# Maximum number of database connections in the pool.
export DB_MAX_POOL=10
# Minimum number of database connections in the pool.
export DB_MIN_POOL=1
# Maximum time, in milliseconds, that a connection can be idle before being released.
export DB_IDLE=10000


#==================================================
# SEQUELIZE CONFIGURATION
#==================================================
# Determines if Sequelize ORM should log database queries.
export SEQ_LOGGING=false

#==================================================
# JWT (JSON WEB TOKEN) CONFIGURATION
#==================================================
# Secret key used for encrypting JWTs.
export JWT_SECRET=8fa410b58360fd97f3e15a752fd2d6281fc7c0f8
# Duration for which the JWT remains valid.
export JWT_EXPIRE=60m

#==================================================
# IF YOU NEED TO ADD MORE ENVIRONMENT VARIABLES,
# SUCH AS EMAIL SERVER CONFIGURATION AND 
# AMAZON S3 BUCKET CONFIGURATION, AMONT OTHERS.
#==================================================
