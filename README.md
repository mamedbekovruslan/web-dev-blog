Области хранения данных:
- база данных на json-server
- BFF
- redux store

Сущности приложения:
- Пользователь: БД (список пользователей), BFF (сессия текущего пользователя), store (отображения в браузере)
- Роль пользователя: БД (список ролей), BFF (сессия пользователя, с ролью), store (использование на клиенте)
- Статья: БД (список статей), store (отображение в браузере)
- Комментарий: БД (список комментариев), store (отображение в браузере)

Таблицы БД:
- Пользователи - user: id / login / password / registered_at / role_id
- Роли - role: id / name
- Статьи - posts: id / title / image_url / content / published_at
- Комментарии - comments: id / author_id / post_id / content

Схема состояния на BFF:

- Сессия текущего пользователя: login / password / role

Схема для redux store (на клиенте):

- user: id / login / roleId
- posts: массив post: id / title / imageUrl / publishedAt / commentsCount
- posts: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
- users: массив user: id / login / registeredA
