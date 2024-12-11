#!/bin/bash
set -e

# Prepara la base de datos si es necesario
echo "Checking database setup..."
bin/rails db:prepare

# Inicia el servidor de Rails
echo "Starting Rails server..."
exec "$@"
