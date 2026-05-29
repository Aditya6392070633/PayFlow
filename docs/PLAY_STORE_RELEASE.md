# Play Store Release Checklist

1. Create Google Play Console developer account.
2. Update app package in `apps/mobile/app.json`: `android.package`.
3. Add real app icon, splash screen, privacy policy URL.
4. Build Android App Bundle:
```bash
cd apps/mobile
npm install
npx eas build:configure
npx eas build -p android --profile production
```
5. Download `.aab` from Expo dashboard.
6. Upload `.aab` to Play Console.
7. Complete Data Safety, privacy policy, screenshots, content rating.
8. For real payment app: add compliance documents, KYC/payment partner approvals, secure backend, fraud controls.
