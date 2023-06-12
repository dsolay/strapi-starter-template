#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER db_user;
	CREATE DATABASE db_name;
	GRANT ALL PRIVILEGES ON DATABASE db_name TO db_user;
EOSQL
