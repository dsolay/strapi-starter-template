#! /bin/bash

set -e

cli_help() {
  cli_name=${0##*/}
  echo "
$cli_name
dump/restore moviapp databases
Version: 1.0.0
Usage: $cli_name [command]
Commands:
  local
  dev
  stagign
  *
"
  exit 1
}

dump() {
  pg_dump \
    --host "$DB_HOST" \
    --username "$DB_USER" \
    --port "$DB_PORT" \
    --format=c \
    "$DB_DATABASE" \
    > moviapp-db-full_"$1"_"$(date +%F)".pgsql
}

dump-data() {
  pg_dump \
    --host "$DB_HOST" \
    --username "$DB_USER" \
    --port "$DB_PORT" \
    --format=c \
    --data-only \
    "$DB_DATABASE" \
    > moviapp-db-data_"$1"_"$(date +%F)".pgsql
}


dump-schema() {
  pg_dump \
    --host "$DB_HOST" \
    --username "$DB_USER" \
    --port "$DB_PORT" \
    --format=c \
    --schema-only \
    "$DB_DATABASE" \
    > moviapp-db-schema_"$1"_"$(date +%F)".pgsql
}

restore() {
  pg_restore \
    -U "$DB_USER" \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -d "$DB_DATABASE" \
    --jobs 4 \
    "$1"
}

case "$2" in
  dev)
    set -o allexport; source .env.moviapp-db.dev; set +o allexport
    ;;
  staging)
    set -o allexport; source .env.moviapp-db.staging; set +o allexport
    ;;
  local)
    set -o allexport; source .env.moviapp-db.local; set +o allexport
    ;;
  *)
    echo "enviroment dosen't exists"
    exit 1
    ;;
esac

case "$1" in
  --dump-schema)
      dump-schema "$2"
    ;;
  --dump-data)
      dump-data "$2"
    ;;
  --full-dump)
      dump "$2"
    ;;
  --restore)
      restore "$3"
    ;;
  *)
    cli_help
    ;;
esac
