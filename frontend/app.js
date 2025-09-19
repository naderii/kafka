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

// ارسال stream نوتیفیکیشن‌ها به کلاینت
app.get('/notifications/stream', (req, res) => {
  // تنظیم هدرهای مناسب برای SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // ارسال پیام اولیه برای تست اتصال
  res.write('data: {"message": "اتصال برقرار شد"}\n\n');
  
  // ایجاد یک interval برای بررسی نوتیفیکیشن‌های جدید
  let lastCount = 0;
  const checkInterval = setInterval(async () => {
    try {
      const response = await axios.get('http://notification-service:5001/notifications');
      const notifications = response.data;
      
      // اگر نوتیفیکیشن جدیدی اضافه شده
      if (notifications.length > lastCount) {
        const newNotifications = notifications.slice(lastCount);
        lastCount = notifications.length;
        
        newNotifications.forEach(notification => {
          res.write(`data: ${JSON.stringify(notification)}\n\n`);
        });
      }
    } catch (error) {
      console.error('Error checking notifications:', error);
    }
  }, 1000); // بررسی هر 1 ثانیه
  
  // مدیریت قطع اتصال
  req.on('close', () => {
    clearInterval(checkInterval);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});