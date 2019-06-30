# 概要

Vue.js製のマストドンクライアントです。 
特徴的な機能として「マルチアカウント機能」、「お絵かき機能」があります。

[動作イメージ](https://nagai-galaxy.com/screenshot/vuejs-ginga-mammoth.gif)

## Dockerでの開発手順

```sh
docker-compose up -d 
docker-compose run app yarn install
docker-compose run --service-ports app yarn run serve
```

- [http://localhost:8080/](http://localhost:8080/)にアクセス

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Run your unit tests
```
yarn run test:unit
```
