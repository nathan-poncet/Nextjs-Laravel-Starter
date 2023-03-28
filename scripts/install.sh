cd ..

cp .env.example .env
cp server/.env.example server/.env

cd client

yarn install

cd ..

cd server

composer install

cd ..

docker-compose up -d

docker compose exec laravel php artisan migrate