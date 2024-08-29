import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const getDB = () => {
  const firebaseConfig = {
    projectId: 'noti-sound',
    databaseURL: `${process.env.REACT_APP_FIREBASE_END_POINT || ''}`,
  };
  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
};

// Get a list of cities from your database
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNotification = (id: string, callback: (data: any) => void) => {
  const db = getDB();
  const notificationRef = ref(db, `notifications/${id}`);
  onValue(notificationRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

const FireBaseConnector = {
  getNotification,
};

export default FireBaseConnector;
