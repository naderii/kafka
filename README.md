# Apache Kafka Docker Compose

یک راه‌اندازی سریع و آپاچی کافکا با استفاده از داکر کامپوز برای محیط‌های توسعه و تست.

## 🚀 ویژگی‌ها

- ✅ Apache Kafka (با Confluent image)
- ✅ Apache Zookeeper
- ✅ Kafka UI (مدیریت و مانیتورینگ بصری)
- ✅ پیکربندی بهینه برای توسعه
- ✅ پشتیبانی از اتصال داخلی و خارجی

## 📋 پیش‌نیازها

- [Docker](https://docs.docker.com/get-docker/) (ورژن 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (ورژن 2.0+)

## 🛠️ راه‌اندازی

1. **کلون یا دانلود پروژه**:
‍‍‍```bash
git clone <https://github.com/naderii/kafka>
cd kafka-docker-compose
‍‍‍```

2. **اجرای سرویس‌ها**:
‍‍‍```bash
docker-compose up -d
‍‍‍```

3. **بررسی وضعیت سرویس‌ها**:
‍‍‍```bash
docker-compose ps
‍‍‍```

## 🌐 دسترسی به سرویس‌ها

| سرویس        | پورت    | دسترسی              | توضیحات                     |
|-------------|---------|---------------------|----------------------------|
| **Kafka**   | 9092    | داخلی (داخل داکر)   | برای برنامه‌های داخل شبکه داکر |
| **Kafka**   | 9093    | خارجی (میزبان)      | برای برنامه‌های خارج از داکر  |
| **Zookeeper** | 2181   | داخلی/خارجی         | مدیریت کلستر کافکا          |
| **Kafka UI** | 8080   | خارجی               | رابط وب مدیریت کافکا        |

## 🔌 اتصال به کافکا

### برای برنامه‌های داخل شبکه داکر:
‍‍‍```bash
bootstrap.servers=kafka:9092
‍‍‍```

### برای برنامه‌های خارج از داکر (روی میزبان):
‍‍‍```bash
bootstrap.servers=localhost:9093
‍‍‍```

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
‍‍‍```bash
docker exec -it kafka kafka-topics \
  --create \
  --topic test-topic \
  --bootstrap-server kafka:9092 \
  --partitions 1 \
  --replication-factor 1
‍‍‍```

### تولید پیام:
‍‍‍```bash
docker exec -it kafka kafka-console-producer \
  --topic test-topic \
  --bootstrap-server kafka:9092
‍‍‍```

### مصرف پیام:
‍‍‍```bash
docker exec -it kafka kafka-console-consumer \
  --topic test-topic \
  --bootstrap-server kafka:9092 \
  --from-beginning
‍‍‍```

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
‍‍‍```

## 📁 ساختار پروژه

‍‍‍
kafka-docker-compose/
├── docker-compose.yml    # فایل اصلی داکر کامپوز
├── .env                  # متغیرهای محیطی (اختیاری)
└── README.md            # این فایل
‍‍‍

## ⚠️ نکات مهم

- این تنظیمات فقط برای **توسعه و تست** مناسب است
- برای production باید امنیت و پیکربندی پیشرفته اضافه شود
- داده‌ها به صورت persistent ذخیره نمی‌شوند مگر volume تعریف شود

## 🤝 مشارکت

اگر پیشنهادی دارید خوشحال می‌شوم:
1. Fork کنید
2. Branch ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. Commit کنید (`git commit -m 'Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request ایجاد کنید

## 📜 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

---

**توسعه داده شده با ❤️ برای جامعه توسعه‌دهندگان**