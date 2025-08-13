import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { RSVPData } from './types';

// コレクション名定数
export const COLLECTIONS = {
  RSVPS: 'rsvps',
  ADMIN: 'admin',
} as const;

/**
 * RSVP データを作成
 */
export async function createRSVP(rsvpData: Omit<RSVPData, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const now = new Date();
    const dataToSave = {
      ...rsvpData,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    };

    const docRef = await addDoc(collection(db, COLLECTIONS.RSVPS), dataToSave);
    return { id: docRef.id, ...dataToSave };
  } catch (error) {
    console.error('RSVP作成エラー:', error);
    throw new Error('出欠確認の送信に失敗しました');
  }
}

/**
 * 全てのRSVPデータを取得
 */
export async function getAllRSVPs() {
  try {
    const q = query(
      collection(db, COLLECTIONS.RSVPS),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const rsvps: RSVPData[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      rsvps.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as RSVPData);
    });
    
    return rsvps;
  } catch (error) {
    console.error('RSVP取得エラー:', error);
    throw new Error('出欠確認データの取得に失敗しました');
  }
}

/**
 * 特定のRSVPデータを取得
 */
export async function getRSVPById(id: string) {
  try {
    const docRef = doc(db, COLLECTIONS.RSVPS, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as RSVPData;
    } else {
      throw new Error('該当するデータが見つかりません');
    }
  } catch (error) {
    console.error('RSVP取得エラー:', error);
    throw new Error('出欠確認データの取得に失敗しました');
  }
}

/**
 * RSVPデータを更新
 */
export async function updateRSVP(id: string, updateData: Partial<Omit<RSVPData, 'id' | 'createdAt' | 'updatedAt'>>) {
  try {
    const docRef = doc(db, COLLECTIONS.RSVPS, id);
    const dataToUpdate = {
      ...updateData,
      updatedAt: Timestamp.fromDate(new Date()),
    };
    
    await updateDoc(docRef, dataToUpdate);
    return true;
  } catch (error) {
    console.error('RSVP更新エラー:', error);
    throw new Error('出欠確認の更新に失敗しました');
  }
}

/**
 * RSVPデータを削除
 */
export async function deleteRSVP(id: string) {
  try {
    const docRef = doc(db, COLLECTIONS.RSVPS, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('RSVP削除エラー:', error);
    throw new Error('出欠確認の削除に失敗しました');
  }
}

/**
 * 出席予定者数を取得
 */
export async function getRSVPStats() {
  try {
    const attendingQuery = query(
      collection(db, COLLECTIONS.RSVPS),
      where('attendance', '==', 'attending')
    );
    
    const notAttendingQuery = query(
      collection(db, COLLECTIONS.RSVPS),
      where('attendance', '==', 'not-attending')
    );
    
    const tentativeQuery = query(
      collection(db, COLLECTIONS.RSVPS),
      where('attendance', '==', 'tentative')
    );

    const [attendingSnap, notAttendingSnap, tentativeSnap] = await Promise.all([
      getDocs(attendingQuery),
      getDocs(notAttendingQuery),
      getDocs(tentativeQuery),
    ]);

    let totalAttending = 0;
    attendingSnap.forEach((doc) => {
      const data = doc.data();
      totalAttending += data.guestCount || 1;
    });

    return {
      attending: attendingSnap.size,
      notAttending: notAttendingSnap.size,
      tentative: tentativeSnap.size,
      totalGuests: totalAttending,
    };
  } catch (error) {
    console.error('RSVP統計取得エラー:', error);
    throw new Error('出欠統計の取得に失敗しました');
  }
}

/**
 * メールアドレスで重複チェック
 */
export async function checkDuplicateEmail(email: string) {
  try {
    const q = query(
      collection(db, COLLECTIONS.RSVPS),
      where('email', '==', email),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('重複チェックエラー:', error);
    return false;
  }
}
