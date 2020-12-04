### API запросы 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.postman.co/run-collection/6b72df552b9f1a2613bb)


----
- [Post] http://localhost:5000/api/auth/register - регистрация 
- [Post] http://localhost:5000/api/auth/login - вход
---
- [Get] http://localhost:5000/api/order - получение заказа
- [Post] http://localhost:5000/api/order - добавление заказа
----
- [Get] http://localhost:5000/api/category - получение категории 
- [Get] http://localhost:5000/api/category/id - получение категории по ID
- [Post] http://localhost:5000/api/category - добавление категории 
- [Delete] http://localhost:5000/api/category/id - удаление категории 
- [Patch]  http://localhost:5000/api/category/id - изменение категории 
---
- [Get] http://localhost:5000/api/analytics/overview - для аналитики и отрисовки графиков  (страница обзор)
- [Get] http://localhost:5000/api/analytics/analytics - для аналитики и отрисовки графиков (страница аналитики) 
--- 
- [Get] http://localhost:5000/api/position/:category  - долучение позиций по категории 
- [Post] http://localhost:5000/api/position - добавление позиций
- [Patch] http://localhost:5000/api/position/id - изменение позиции
- [Delete] http://localhost:5000/api/position/id - удалении позиции 
