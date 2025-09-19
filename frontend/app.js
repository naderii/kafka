const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// صفحه اصلی
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ایجاد رزرو جدید
app.post('/book', async (req, res) => {
  try {
    const response = await axios.post('http://booking-service:5000/book', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// دریافت نوتیفیکیشن‌ها
app.get('/notifications', async (req, res) => {
  try {
    const response = await axios.get('http://notification-service:5001/notifications');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});