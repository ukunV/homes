FROM mysql:5.7
## The maintainer name and email
LABEL zinirun <github.com/zinirun>
# database = test and password for root = password
ENV MYSQL_DATABASE=homes-db \
    MYSQL_ROOT_PASSWORD=homesdb-5177
# when container will be started, we'll have `test` database created with this schema
COPY ./homes-db-init.sql /docker-entrypoint-initdb.d/