const express = require('express');
const fetch = require('node-fetch');  // Библиотека для выполнения HTTP-запросов
const bodyParser = require('body-parser');
const cors = require('cors');  // Для CORS, если ваш клиент на другом порту

const app = express();
const port = 3000;

// Конфигурация OAuth
const client_id = '5dc83c9dc8b34cff982c2775311a9419'; // 
const client_secret = '0a3de2b01b68413b816f620edb1e167d'; // 
const redirect_uri = 'https://mord458.github.io/myapp/callback'; // 

// Используем body-parser для обработки JSON-запросов
app.use(bodyParser.json());
app.use(cors());  // Для разрешения кросс-оригинальных запросов

// Маршрут для обмена кода на токен
app.post('/exchange_code', async (req, res) => {
    const { code, state } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }

    // Формируем запрос для обмена кода на токен
    const tokenUrl = 'https://oauth.yandex.ru/token';
    const tokenData = new URLSearchParams();
    tokenData.append('grant_type', 'authorization_code');
    tokenData.append('code', code);
    tokenData.append('client_id', client_id);
    tokenData.append('client_secret', client_secret);
    tokenData.append('redirect_uri', redirect_uri);

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            body: tokenData,
        });

        if (response.ok) {
            const data = await response.json();
            // Перенаправляем в мобильное приложение с токеном
            const redirectToAppUrl = `myapp://callback?code=${data.access_token}`;  // Замените "yourapp" на схему вашего приложения
            res.redirect(redirectToAppUrl);  // Перенаправление на мобильное приложение
        } else {
            const errorData = await response.json();
            res.status(response.status).json(errorData);  // Ошибка от Яндекс API
        }
    } catch (error) {
        console.error('Error during token exchange:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
