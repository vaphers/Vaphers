import admin from 'firebase-admin';

let serviceAccount: admin.ServiceAccount = {} as admin.ServiceAccount;

try {
  if (process.env.GOOGLE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
  }
} catch (e) {
  console.error('Error parsing GOOGLE_SERVICE_ACCOUNT JSON:', e);
}

if (!admin.apps.length) {
  try {
    if (serviceAccount && Object.keys(serviceAccount).length > 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      admin.initializeApp();
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

export const db = admin.firestore();
export { admin };
