# Patient Realtime Form System

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