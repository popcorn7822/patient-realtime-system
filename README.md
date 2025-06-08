# Patient Realtime Form System
🗂️ โครงสร้างโฟลเดอร์และคำอธิบาย
patient-realtime-system/
├── src/
│   ├── pages/
│   │   ├── _app.tsx              # ไฟล์หลักของ Next.js สำหรับห่อหุ้มทุกหน้า เช่น ใส่ layout, theme หรือ provider ต่าง ๆ
│   │   ├── index.tsx             # หน้าแรกของเว็บ (root path "/") ซึ่งมักจะแสดงฟอร์มหรือหน้าเริ่มต้น
│   │   ├── patient.tsx           # หน้าสำหรับกรอกฟอร์มผู้ป่วย (PatientForm) โดยเฉพาะ
│   │   └── staff.tsx             # หน้าสำหรับเจ้าหน้าที่ดูข้อมูลแบบเรียลไทม์ (StaffView)
│   ├── components/
│   │   ├── PatientForm.tsx       # คอมโพเนนต์ฟอร์มกรอกข้อมูลผู้ป่วย พร้อมการตรวจสอบและการส่งข้อมูลผ่าน WebSocket
│   │   └── StaffView.tsx         # คอมโพเนนต์สำหรับเจ้าหน้าที่ที่แสดงข้อมูลฟอร์มแบบเรียลไทม์ และสถานะการพิมพ์หรือส่งข้อมูล
│   └── styles/
│       └── globals.css           # ไฟล์ CSS แบบ global สำหรับตั้งค่าสี ฟอนต์ และสไตล์ทั่วทั้งแอป
├── server.js                    # เซิร์ฟเวอร์ Socket.IO ที่รัน Next.js และดูแล WebSocket สำหรับส่งข้อมูลแบบเรียลไทม์
├── package.json                 # รายละเอียดแพ็กเกจและสคริปต์สำหรับติดตั้งและรันโปรเจกต์ (dependencies, scripts ฯลฯ)
└── README.md                   # เอกสารแนะนำโปรเจกต์ วิธีติดตั้งใช้งาน และข้อมูลต่าง ๆ ที่เกี่ยวข้อง

📁 รายละเอียดโฟลเดอร์และไฟล์
src/pages/
_app.tsx

ใช้ใน Next.js สำหรับห่อทุกหน้า (เช่น layout, theme, หรือ provider)

เหมาะสำหรับการ import CSS ทั่วไป หรือครอบด้วย context เช่น SocketProvider, ThemeProvider

index.tsx

หน้าแรก (/) ของเว็บไซต์

อาจใช้ redirect ไปหน้า /patient หรือแสดง landing page แบบ simple

patient.tsx

แสดงหน้าฟอร์มกรอกข้อมูลผู้ป่วย โดยใช้คอมโพเนนต์ <PatientForm />

มีการเชื่อมต่อ WebSocket เพื่อส่งข้อมูลแบบ real-time

staff.tsx

แสดงหน้าสำหรับเจ้าหน้าที่ที่ต้องการดูข้อมูลจากผู้ป่วยที่พิมพ์/ส่งเข้ามาแบบเรียลไทม์

ใช้คอมโพเนนต์ <StaffView />

src/components/
PatientForm.tsx

ฟอร์มกรอกข้อมูลผู้ป่วย

มีฟิลด์จำเป็น เช่น ชื่อ, วันเกิด, เพศ, ภาษา ฯลฯ

ส่งข้อมูลผ่าน WebSocket (typing, submitForm)

มีฟังก์ชันตรวจสอบข้อมูลก่อนส่ง (validation)

มี UX ที่เหมาะกับผู้ใช้งาน เช่น placeholder สีอ่อน, drop-down, input บังคับ ฯลฯ

StaffView.tsx

ใช้แสดงข้อมูลที่ผู้ป่วยกำลังกรอกหรือกดส่งแบบเรียลไทม์

มีการแสดงสถานะ Inactive, Typing..., Submitted

ใช้ animation เพื่อบอก visual feedback ให้กับเจ้าหน้าที่

src/styles/
globals.css

กำหนด theme, สี, spacing หรือ font ทั่วไปของโปรเจกต์

อาจรวมการตั้งค่า Tailwind CSS, reset styles หรือ custom class

server.js
Express + Socket.IO Server

เซิร์ฟเวอร์หลักที่ใช้รัน Next.js app

รวม WebSocket สำหรับส่งข้อมูลฟอร์มแบบ real-time

ใช้ process.env.PORT || 3000 เพื่อรองรับ Deploy บน Platform ต่าง ๆ

package.json
ไฟล์ที่เก็บ dependencies เช่น React, Next.js, Tailwind CSS, socket.io

มี script เช่น dev, build, start

ตัวอย่าง:

json
Copy
Edit
"scripts": {
  "dev": "node server.js",
  "build": "next build",
  "start": "NODE_ENV=production node server.js"
}

A real-time patient information form using **Next.js**, **Tailwind CSS**, and **Socket.IO**.  
Designed to work across devices with real-time updates reflected instantly on the staff dashboard.

## 🚀 Features
- Real-time data synchronization between the form and staff view
- Clean and responsive UI using Tailwind CSS
- Required field validation with red asterisks
- Dropdowns for `Gender` and `Preferred Language` with conditional inputs
- Typing status with animated "bouncing dots" display
- Clear dashboard preview for staff with structured view

---

## 📦 Project Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
node server.js
```
Then go to: [http://localhost:3000](http://localhost:3000)

---
# 🧩 Component Architecture

## `PatientForm.tsx`
Handles:
- Form data input and validation
- Real-time emit of typing and form submission events

## `StaffView.tsx`
Handles:
- Receiving data from socket events
- Animated typing indicator
- Structured preview of submitted/typing form data
# 🔄 Real-Time Synchronization Flow

## 1. Typing
- On any form input change in `PatientForm`, emits `typing` event via socket
- `StaffView` listens to `typing` and updates view + starts dot animation

## 2. Submit
- On form submit, emits `submitForm` event via socket
- `StaffView` displays form as submitted, stops animation

## 3. Timeout
- If no update in 10 seconds, status resets to `Inactive`

# 🎨 UI/UX Design Considerations

## ✅ Responsive Layout
- Mobile-first with full-width input fields on smaller devices
- 2-column layout for larger screens (e.g. Emergency contact fields side by side)
- Clear focus and spacing with consistent padding using Tailwind

## ✅ Accessibility
- Placeholder text in muted gray for better form usability
- Clear label associations and required field markings

## 🧠 Bonus Features
- Bouncing dot animation on "Typing..." status
- Conditional input for "Other Language"
- Responsive layout for form inputs
