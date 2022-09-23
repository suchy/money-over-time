import admin, { ServiceAccount } from 'firebase-admin';

let firebaseClient: typeof admin;

export const FirebaseClientFactory = () => {
  const hasInitializedApps = !!admin.apps.length;

  if (hasInitializedApps) {
    firebaseClient = admin;
    return firebaseClient;
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_KEY environment variable is required to do auth'
    );
  }

  const serviceAccount = serviceAccountKey as ServiceAccount;

  const credential = admin.credential.cert(serviceAccount);

  admin.initializeApp({ credential });

  firebaseClient = admin;

  return firebaseClient;
};
