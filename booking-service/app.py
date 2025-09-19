from flask import Flask, request, jsonify
from kafka import KafkaProducer
import json
import logging

app = Flask(__name__)

# تنظیمات کافکا
KAFKA_BOOTSTRAP_SERVERS = 'kafka:9092'
BOOKING_TOPIC = 'bookings'

# ایجاد Kafka Producer
producer = KafkaProducer(
    bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

@app.route('/book', methods=['POST'])
def create_booking():
    try:
        data = request.get_json()
        
        # اطلاعات رزرو
        booking_data = {
            'id': data.get('id'),
            'customer_name': data.get('customer_name'),
            'service': data.get('service'),
            'date': data.get('date'),
            'time': data.get('time'),
            'status': 'confirmed'
        }
        
        # ارسال پیام به کافکا
        producer.send(BOOKING_TOPIC, value=booking_data)
        producer.flush()
        
        return jsonify({
            'message': 'Booking created and notification sent',
            'booking': booking_data
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/bookings', methods=['GET'])
def get_bookings():
    # این endpoint می‌تواند برای نمایش لیست رزروها استفاده شود
    return jsonify({'message': 'List of bookings would be here'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)