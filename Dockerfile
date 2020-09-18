# It uses Yarn, Forever
# Bind to build_n_run.sh in current directory

FROM node:10
RUN npm install -g yarn; npm install forever -g;
COPY package.json /src/package.json
RUN  cd /src; yarn install;
COPY . /src
EXPOSE 3000
WORKDIR /src

CMD yarn start