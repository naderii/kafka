from kafka import KafkaConsumer
import json
import threading
from flask import Flask, jsonify

app = Flask(__name__)

# تنظیمات کافکا
KAFKA_BOOTSTRAP_SERVERS = 'kafka:9092'
BOOKING_TOPIC = 'bookings'

# ذخیره‌سازی نوتیفیکیشن‌ها
notifications = []

def consume_messages():
    consumer = KafkaConsumer(
        BOOKING_TOPIC,
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        auto_offset_reset='earliest',
        value_deserializer=lambda x: json.loads(x.decode('utf-8'))
    )
    
    print("Notification service started listening for bookings...")
    
    for message in consumer:
        booking_data = message.value
        notification = {
            'type': 'NEW_BOOKING',
            'message': f"New booking created for {booking_data['customer_name']}",
            'booking_details': booking_data,
            'timestamp': message.timestamp
        }
        
        notifications.append(notification)
        print(f"Notification: {notification['message']}")

@app.route('/notifications', methods=['GET'])
def get_notifications():
    return jsonify(notifications)

if __name__ == '__main__':
    # شروع مصرف‌کننده در یک thread جداگانه
    consumer_thread = threading.Thread(target=consume_messages, daemon=True)
    consumer_thread.start()
    
    # اجرای سرور Flask
    app.run(host='0.0.0.0', port=5001, debug=True)