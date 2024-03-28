# SPA - космическая бургерная!

[Cсылка на макет](https://www.figma.com/file/zFGN2O5xktHl9VmoOieq5E/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8_external_link?node-id=0%3A1).

## О проекте
Бургерная с возможностью выбора ингредиентов для бургера и отправки заказа. Авторизация пользователя, возможность редактировать данных пользователя и т.п. Просмотром ленты всех и только своих заказов.

### 5 спринт
К предыдущему функционалу добавилось:
* Типизация хранилища данных.
* Экраны «Лента заказов» и «История заказов».
* Страница с данными о конкретном заказе.
* Доработан роутинг в приложении.
* Получение списка заказов по веб-сокету.

### 4 спринт
Проект переведен на typescript(за исключением хранилища данных).

### 3 спринт
К предыдущему функционалу добавилось:
* Страницы авторизации и регистрации.
* Страницы восстановления и сброса пароля.
* Страница профиля пользователя.
* Авторизация и регистрация пользователя, обновление токена.
* Получение и обновление информации о пользователе.
* Настроен роутинг в приложении.


### 2 спринт
* Создано хранилище для хранения данных:
1. Cписок всех полученных ингредиентов.
2. Cписок всех ингредиентов в текущем конструкторе бургера.
3. Объект текущего просматриваемого ингредиента.
4. Объект созданного заказа.

* Создание экшены и редьюсеры следующих фунциональностей:
1. Получение списка ингредиентов от API. Используется в компоненте BurgerIngredients .
2. Получение списка ингредиентов для конструктора бургера. Используется в компоненте BurgerConstructor .
3. Добавление данных о просматриваемом в модальном окне IngredientDetails ингредиенте.
4. Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.
5. Получение и обновление номера заказа в модальном окне OrderDetails .

* Доработан интерфейса навигации по ингредиентам.
* Реализовано перетаскивание ингредиентов.
* Реализована вложенная сортировка ингредиентов в BurgerConstructor.
* Исправлен подсчет стоимости заказа.
* Добавлен новый fetch запрос, который возвращает номер заказа и название бургера.
* Добавлена возможность создавать заказ.
* и т.п.


### 1 спринт
В 1 спринте реализована инфраструктуру проекта и сверстаны несколько компонентов(основной интерфейс бургерной, модальное окно заказа и ингридиента).

## Основные команды

| Команда | Описание |
| --- | --- |
| `npm run start` | Запуск проекта в режиме разработки.|
| `npm run build` | Запуск проекта в режиме продакшена. |
| `npm run eslint` | Запуск линтера. |


### Стек технологий
![html](https://img.shields.io/badge/HTML_5-073502?style=for-the-badge&logo=html5&labelColor=3d3f3d)
![css](https://img.shields.io/badge/CSS_3-073502?style=for-the-badge&logo=css3&labelColor=3d3f3d)
![javascript](https://img.shields.io/badge/javascript-073502?style=for-the-badge&logo=javascript&labelColor=3d3f3d)
![react](https://img.shields.io/badge/react-073502?style=for-the-badge&logo=react&labelColor=3d3f3d)
![reactrouter](https://img.shields.io/badge/react_router-073502?style=for-the-badge&logo=reactrouter&labelColor=3d3f3d)
![nodedotjs](https://img.shields.io/badge/node.js-073502?style=for-the-badge&logo=nodedotjs&labelColor=3d3f3d)
![npm](https://img.shields.io/badge/npm-073502?style=for-the-badge&logo=npm&labelColor=3d3f3d)
![webpack](https://img.shields.io/badge/webpack-073502?style=for-the-badge&logo=webpack&labelColor=3d3f3d)
![vscode](https://img.shields.io/badge/vscode-073502?style=for-the-badge&logo=visualstudiocode&labelColor=3d3f3d)
![figma](https://img.shields.io/badge/figma-073502?style=for-the-badge&logo=figma&labelColor=3d3f3d)
![postman](https://img.shields.io/badge/postman-073502?style=for-the-badge&logo=postman&labelColor=3d3f3d)
![github](https://img.shields.io/badge/github-073502?style=for-the-badge&logo=github&labelColor=3d3f3d)
![json](https://img.shields.io/badge/json-073502?style=for-the-badge&logo=json&labelColor=3d3f3d)
![API](https://img.shields.io/badge/API-API-073502?style=for-the-badge&labelColor=3d3f3d)
![redux](https://img.shields.io/badge/redux-073502?style=for-the-badge&logo=redux&labelColor=3d3f3d)
![typescript](https://img.shields.io/badge/typescript-072f13?style=for-the-badge&logo=typescript&labelColor=3d3f3d)