#!/bin/bash
#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
        CREATE USER usneaker;
        CREATE DATABASE dbsneaker;
        GRANT ALL PRIVILEGES ON DATABASE dbsneaker TO usneaker;
EOSQL