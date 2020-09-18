# Build N Run DB Container
# 2020. 09. 18 Zini

docker_username="heojj97"
db_image_name="homes-mysql"
db_container_name="homes-database"
db_password="homesdb-5177"
version="0.1"
port=3306

echo "## Automation docker-database build and run ##"

# remove container
echo "=> Remove previous container..."
docker rm -f ${db_container_name}

# remove image
echo "=> Remove previous image..."
docker rmi -f ${docker_username}/${db_image_name}:${version}

# new-build/re-build docker image
echo "=> Build new image..."
docker build --tag ${docker_username}/${db_image_name}:${version} .

# Run container
echo "=> Run container..."
docker run -d -p ${port}:${port} -e MYSQL_ROOT_PASSWORD=${db_password} --name ${db_container_name} ${docker_username}/${db_image_name}:${version} --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
