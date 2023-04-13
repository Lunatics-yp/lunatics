<div align='center'>

# Лунатики

<!-- https://shields.io/ -->

![lerna](https://img.shields.io/badge/lerna-5.4.3-blue)
![vite](https://img.shields.io/badge/vite-3.2.5-blue)
![typescript](https://img.shields.io/badge/typescript-4.9.5-blue)
[![Authors](https://img.shields.io/badge/Authors-Lunatics-blue)](https://github.com/orgs/Lunatics-yp/people?query=role%3Aowner)

</div>

Реализация игры "Лунатики", основанной на правилах игры "Морской бой".

Проект создан в учебных целях в рамках курса [Мидл фронтенд разработчик](https://practicum.yandex.ru/middle-frontend/) от Яндекс Практикума.

---

## Демо проекта

- https://lunatics-git-dev-lunatics-yp.vercel.app

## Документация проекта

- https://github.com/FrontHeads/tanchiki/tree/dev/docs

- - - - -

### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
4. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
5. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента\
```yarn lerna add {your_dep} --scope client```

Для сервера\
```yarn lerna add {your_dep} --scope server```

И для клиента, и для сервера\
```yarn lerna add {your_dep}```

Чтобы добавить **dev** зависимость, используйте флаг `--dev` (или `-D`)\
```yarn lerna add {your_dep} --dev --scope server```

Чтобы добавить **exact** зависимость, используйте флаг `--exact`\
```yarn lerna add {your_dep} --exact --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint``` - eslint\
```yarn stylelint``` - stylelint

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть, что получилось

`yarn preview --scope client`\
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`


`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`
