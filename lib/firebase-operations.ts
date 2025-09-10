import { 
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { RSVPFormData, FirestoreRSVPData } from './types';

// コレクション名定数
export const COLLECTIONS = {
  WEDDING_RSVPS: 'wedding_rsvps',
  ADMIN: 'admin',
} as const;

/**
 * RSVPデータを作成
 */
export async function createRSVP(formData: RSVPFormData) {
  try {
    const now = new Date();
    
    // フォームデータをFirestore用データに変換
    const firestoreData: Omit<FirestoreRSVPData, 'id'> = {
      status: formData.status,
      guest_side: formData.guest_side,
      jpn_family_name: formData.jpn_family_name,
      jpn_first_name: formData.jpn_first_name,
      kana_family_name: formData.kana_family_name || '',
      kana_first_name: formData.kana_first_name || '',
      rom_family_name: formData.rom_family_name,
      rom_first_name: formData.rom_first_name,
      email: formData.email,
      phone_number: formData.phone_number || '',
      zipcode: formData.zipcode || '',
      address: formData.address || '',
      address2: formData.address2 || '',
      allergy_flag: formData.allergy_flag,
      allergy: formData.allergy || [],
      guest_message: formData.guest_message || '',
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(db, COLLECTIONS.WEDDING_RSVPS), {
      ...firestoreData,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    });

    console.log('RSVP保存成功:', {
      id: docRef.id,
      email: formData.email,
      status: formData.status === 1 ? '出席' : '欠席',
      guest_side: formData.guest_side === 0 ? '新郎側' : '新婦側',
    });

    return { 
      id: docRef.id, 
      ...firestoreData 
    };
  } catch (error) {
    console.error('RSVP作成エラー:', error);
    
    throw new Error('出欠確認の送信に失敗しました。再度お試しください。');
  }
}

/**
 * RSVPデータの重複チェック（メールアドレス）
 */
export async function checkRSVPDuplicate(email: string) {
  try {
    const q = query(
      collection(db, COLLECTIONS.WEDDING_RSVPS),
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

/**
 * 全てのRSVPデータを取得
 */
export async function getAllRSVPs() {
  try {
    const q = query(
      collection(db, COLLECTIONS.WEDDING_RSVPS),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const rsvps: FirestoreRSVPData[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      rsvps.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as FirestoreRSVPData);
    });
    
    return rsvps;
  } catch (error) {
    console.error('RSVP取得エラー:', error);
    throw new Error('出欠確認データの取得に失敗しました');
  }
}

/**
 * RSVP統計を取得
 */
export async function getRSVPStats() {
  try {
    const attendingQuery = query(
      collection(db, COLLECTIONS.WEDDING_RSVPS),
      where('status', '==', 1) // 出席
    );
    
    const notAttendingQuery = query(
      collection(db, COLLECTIONS.WEDDING_RSVPS),
      where('status', '==', 2) // 欠席
    );
    
    const groomSideQuery = query(
      collection(db, COLLECTIONS.WEDDING_RSVPS),
      where('guest_side', '==', 0),
      where('status', '==', 1)
    );
    
    const brideSideQuery = query(
      collection(db, COLLECTIONS.WEDDING_RSVPS),
      where('guest_side', '==', 1),
      where('status', '==', 1)
    );

    const [attendingSnap, notAttendingSnap, groomSideSnap, brideSideSnap] = await Promise.all([
      getDocs(attendingQuery),
      getDocs(notAttendingQuery),
      getDocs(groomSideQuery),
      getDocs(brideSideQuery),
    ]);

    return {
      attending: attendingSnap.size,
      notAttending: notAttendingSnap.size,
      groomSideAttending: groomSideSnap.size,
      brideSideAttending: brideSideSnap.size,
      total: attendingSnap.size + notAttendingSnap.size,
    };
  } catch (error) {
    console.error('RSVP統計取得エラー:', error);
    throw new Error('出欠統計の取得に失敗しました');
  }
}
