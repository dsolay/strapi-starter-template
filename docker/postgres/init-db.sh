#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER moviapp;
	CREATE DATABASE moviapp;
	GRANT ALL PRIVILEGES ON DATABASE moviapp TO moviapp;
EOSQL
