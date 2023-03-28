build:
	docker-compose build

start:
	docker-compose up -d

stop:
	docker-compose down

fresh:
	docker-compose down && docker-compose up -d --build

ps:
	docker-compose ps

web:
	docker-compose exec web sh

api:
	docker-compose exec api sh