const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Инициализация приложения Express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Маршрут для получения кода от Yandex OAuth
app.post('/exchange_code', (req, res) => {
  const { code } = req.body;

  // Здесь вам нужно будет реализовать логику получения access_token
  // Например, с использованием вашего Yandex OAuth client_id и client_secret

  // Пример ответа с access_token (замените 'your-access-token' на реальный токен)
  const accessToken = 'your-access-token';
  res.json({ access_token });
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
