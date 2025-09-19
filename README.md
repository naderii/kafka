# Apache Kafka Docker Compose

یک راه‌اندازی سریع با آپاچی کافکا به وسیله داکر کامپوز برای محیط‌های توسعه و تست.

🚀 ویژگی‌ها
✅ Apache Kafka (با Confluent image)

✅ Apache Zookeeper

✅ Kafka UI (مدیریت و مانیتورینگ بصری)

✅ سرویس رزرو نوبت Real-time

✅ سیستم نوتیفیکیشن آنلاین

✅ پیکربندی بهینه برای توسعه

✅ پشتیبانی از اتصال داخلی و خارجی

## 📋 پیش‌نیازها

- [Docker](https://docs.docker.com/get-docker/) (ورژن 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (ورژن 2.0+)

## 🛠️ راه‌اندازی

1. **کلون یا دانلود پروژه**:

```bash
git clone https://github.com/naderii/kafka
cd kafka-docker-compose
```

2. **اجرای سرویس‌ها**:

```bash
docker-compose up -d
```

3. **بررسی وضعیت سرویس‌ها**:

```bash
docker ps
```
## 🌐 دسترسی به سرویس‌ها

| سرویس               | پورت  | دسترسی       | توضیحات                       |
|---------------------|-------|--------------|--------------------------------|
| Kafka (داخلی)       | 9092  | داخل Docker  | ارتباط بین سرویس‌های داخلی شبکه Docker |
| Kafka (خارجی)       | 9093  | روی میزبان   | ارتباط با برنامه‌های خارج از Docker    |
| Zookeeper           | 2181  | داخلی/خارجی  | مدیریت Kafka Cluster            |
| Kafka UI            | 8080  | روی میزبان   | رابط گرافیکی برای مدیریت Kafka |
| Frontend            | 3000  | روی میزبان   | رابط کاربری سیستم رزرو         |
| Booking Service     | 5000  | داخلی        | Backend سیستم رزرو              |
| Notification Service| 5001  | داخلی        | سرویس ارسال نوتیفیکیشن لحظه‌ای |

---

## 📊 مدیریت Kafka با Kafka UI

به رابط مدیریتی Kafka دسترسی پیدا کنید:  
🌐 **http://localhost:8080**

امکانات:
- مشاهده **Topic**‌ها و **Partition**‌ها
- مانیتورینگ پیام‌ها و **Consumer Group**‌ها
- مدیریت Kafka Cluster
- بررسی **Metrics** و آمار سیستم

---

## 🎯 دسترسی به سیستم رزرو

رابط کاربری سیستم رزرو از آدرس زیر قابل دسترس است:  
🌐 **http://localhost:3000**

امکانات:
- رزرو نوبت آنلاین
- مشاهده نوتیفیکیشن‌های لحظه‌ای
- مدیریت خدمات مختلف

---

### برای برنامه‌های داخل شبکه داکر:

```bash
bootstrap.servers=kafka:9092
```

### برای برنامه‌های خارج از داکر (روی میزبان):

```bash
bootstrap.servers=localhost:9093
```

## 📊 مدیریت با Kafka UI

به رابط مدیریتی کافکا دسترسی پیدا کنید:  
🌐 **http://localhost:8080**

امکانات:
- مشاهده تاپیک‌ها و پارتیشن‌ها
- مانیتورینگ پیام‌ها
- مدیریت consumer groups
- بررسی metrics و آمار

## 🧪 تست سریع

### ایجاد تاپیک تست:

```bash
docker exec -it kafka kafka-topics \
  --create \
  --topic test-topic \
  --bootstrap-server kafka:9092 \
  --partitions 1 \
  --replication-factor \
  ```

### تولید پیام:

```bash
docker exec -it kafka kafka-console-producer \
  --topic test-topic \
  --bootstrap-server kafka:9092
  ```

### مصرف پیام:
```bash
docker exec -it kafka kafka-console-consumer \
  --topic test-topic \
  --bootstrap-server kafka:9092 \
  --from-beginning
  ```

## ⚙️ پیکربندی

### متغیرهای محیطی مهم کافکا:

| متغیر | مقدار پیش‌فرض | توضیحات |
|-------|---------------|---------|
| `KAFKA_BROKER_ID` | 1 | شناسه بروکر |
| `KAFKA_ZOOKEEPER_CONNECT` | zookeeper:2181 | آدرس زوکیپر |
| `KAFKA_ADVERTISED_LISTENERS` | INTERNAL://kafka:9092,EXTERNAL://localhost:9093 | لیست‌کننده‌ها |

## 🛑 توقف سرویس‌ها


# توقف با حفظ داده‌ها

```bash
docker-compose down
```
# توقف با حذف کامل داده‌ها

```bash
docker-compose down -v
```

## 📁 ساختار پروژه

```bash
kafka-booking-system/
|-- docker-compose.yml          # فایل اصلی Docker Compose
|-- booking-service/            # سرویس رزرو نوبت
|   |-- Dockerfile
|   |-- requirements.txt
|   └── app.py
|-- notification-service/       # سرویس نوتیفیکیشن
|   |-- Dockerfile
|   |-- requirements.txt
|   └── app.py
|-- frontend/                   # رابط کاربری سیستم
|   |-- Dockerfile
|   |-- package.json
|   |-- app.js
|   └── public/
|       └── index.html
└── README.md                   # مستندات پروژه

```

## ⚠️ نکات مهم

- این تنظیمات فقط برای **توسعه و تست** مناسب است
- برای production باید امنیت و پیکربندی پیشرفته اضافه شود
- داده‌ها به صورت persistent ذخیره نمی‌شوند مگر volume تعریف شود


---

** ایجاد و توسعه جهت درس برنامه نویسی سمت سرور دکتر باباولیان**