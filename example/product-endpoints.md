**Add a product**
POST /api/product/add
Body:
{
  "title": "Smart Home Wi-Fi Plug",
  "desc": "Remotely control your home appliances and save energy with this smart plug.",
  "img": "https://example.com/images/smart_home_plug.jpg",
  "category": "electronic",
  "size": "Universal",
  "price": 24.99,
  "stock": 120
}

**Add multiple products**
POST /api/product/add-multiple
Body:
[
  {
    "title": "Smartphone Fast Charger",
    "desc": "18W quick charge adapter for faster and safer charging of your devices.",
    "img": "https://example.com/images/smartphone_fast_charger.jpg",
    "category": "electronic",
    "size": "One Size",
    "price": 19.99,
    "stock": 300
  },
  {
    "title": "1080p HD Webcam",
    "desc": "High-definition webcam with built-in microphone for clear video calls and streaming.",
    "img": "https://example.com/images/1080p_hd_webcam.jpg",
    "category": "electronic",
    "size": "One Size",
    "price": 39.99,
    "stock": 150
  },
  {
    "title": "Portable Bluetooth Speaker",
    "desc": "Compact wireless speaker with rich bass and waterproof design.",
    "img": "https://example.com/images/portable_bluetooth_speaker.jpg",
    "category": "electronic",
    "size": "One Size",
    "price": 59.99,
    "stock": 120
  },
  {
    "title": "Smart Home WiFi Plug",
    "desc": "Control your devices remotely with this smart plug compatible with Alexa and Google Home.",
    "img": "https://example.com/images/smart_home_wifi_plug.jpg",
    "category": "electronic",
    "size": "One Size",
    "price": 14.99,
    "stock": 350
  },
  {
    "title": "Wireless Gaming Mouse",
    "desc": "Ergonomic design and precision tracking for seamless gaming experience.",
    "img": "https://example.com/images/wireless_gaming_mouse.jpg",
    "category": "electronic",
    "size": "One Size",
    "price": 29.99,
    "stock": 180
  },
  {
    "title": "4-Port USB Hub",
    "desc": "Expand your USB connectivity with this lightweight and durable hub.",
    "img": "https://example.com/images/4_port_usb_hub.jpg",
    "category": "electronic",
    "size": "One Size",
    "price": 12.99,
    "stock": 250
  },
  {
    "title": "Smart Fitness Tracker",
    "desc": "Track your steps, heart rate, and sleep with this waterproof fitness tracker.",
    "img": "https://example.com/images/smart_fitness_tracker.jpg",
    "category": "electronic",
    "size": "One Size",
    "price": 49.99,
    "stock": 100
  },
  {
    "title": "1080p Portable Projector",
    "desc": "Portable projector with full HD resolution for home theater and presentations.",
    "img": "https://example.com/images/1080p_portable_projector.jpg",
    "category": "electronic",
    "size": "One Size",
    "price": 99.99,
    "stock": 70
  },
  {
    "title": "Noise Cancelling Headphones",
    "desc": "Over-ear headphones with active noise cancellation and superior comfort.",
    "img": "https://example.com/images/noise_cancelling_headphones.jpg",
    "category": "electronic",
    "size": "One Size",
    "price": 89.99,
    "stock": 90
  }
]

**Update a product by ID:**
PUT /api/product/:id 
Body:
{
    "price": 16.99
}