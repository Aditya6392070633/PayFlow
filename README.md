# PayFlow — Full Stack P2P Payment App

React Native Expo mobile app + Node.js Express API + Prisma PostgreSQL + Redis + BullMQ + Socket.io + FCM-ready notifications.

This project includes V1 and future modules from your screenshots:
- UPI / Bank Linking
- Contacts Sync
- Scheduled Payments
- Spend Analytics
- Payment Requests
- Biometric Auth
- Cashback & Rewards
- Merchant Accounts
- Bill Payments
- Referral Program
- KYC Verification
- Fraud Detection
- Multi-Currency Wallet
- Admin Dashboard API
- Savings Pots
- Disputes & Refunds

## Important Play Store note
This is a strong development starter project. Before Play Store release, connect real regulated payment partners, KYC provider, SMS provider, FCM credentials, privacy policy, security audit, RBI/payment compliance, and real payment gateway. Do not use mock payment movement in production.

## Run locally
```bash
npm install
cp apps/server/.env.example apps/server/.env
docker compose up -d
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

## Android APK/AAB for Play Store
```bash
cd apps/mobile
npm install
npx expo login
npx eas build:configure
npx eas build -p android --profile production
```
Upload the generated `.aab` to Google Play Console.
