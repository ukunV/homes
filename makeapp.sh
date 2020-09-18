docker rm -f homes-server
docker rmi -f heojj97/homes-app:0.1
docker build --tag heojj97/homes-app:0.1 .
docker run -t -d --name homes-server -p 3000:3000 --link homes-database:db -e DATABASE_HOST=db heojj97/homes-app:0.1