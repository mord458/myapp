const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Убедитесь, что эта библиотека установлена: npm install node-fetch@2

// Ваши OAuth данные
const CLIENT_ID = 'your-client-id'; // Замените на ваш client_id
const CLIENT_SECRET = 'your-client-secret'; // Замените на ваш client_secret
const REDIRECT_URI = 'http://localhost:3000/callback'; // Убедитесь, что он совпадает с зарегистрированным redirect URI

// Инициализация приложения Express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Маршрут для получения кода от Yandex OAuth
app.post('/exchange_code', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    // Запрос к Yandex OAuth API для обмена кода на access_token
    const response = await fetch('https://oauth.yandex.ru/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: 5dc83c9dc8b34cff982c2775311a9419,
        client_secret: 0a3de2b01b68413b816f620edb1e167d,
        redirect_uri: https://mord458.github.io/myapp/callback.html,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Успешно получили access_token
      res.json(data);
    } else {
      // Обработка ошибок от Yandex API
      res.status(400).json({ error: data.error, error_description: data.error_description });
    }
  } catch (err) {
    console.error('Error exchanging code:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
