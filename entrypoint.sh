#!/bin/bash
set -e


echo "Checking database connection..."
until bin/rails db:version > /dev/null 2>&1; do
  echo "Database is not ready. Retrying in 5 seconds..."
  sleep 5
done
echo "Database is ready."


echo "Running database setup..."
bin/rails db:prepare


if [ ! -d public/assets ]; then
  echo "Assets not found. Precompiling..."
  bin/rails assets:precompile
else
  echo "Assets already precompiled. Skipping."
fi


echo "Starting Rails server..."
exec "$@"
