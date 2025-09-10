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
export async function createRSVP(formData: RSVPFormData): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    // データベース接続情報を確認
    const isProduction = process.env.NODE_ENV === 'production';
    const useEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    
    console.log('🔍 Firebase設定情報:', {
      isProduction,
      useEmulator,
      projectId,
      currentApp: db.app.name,
      databaseId: 'wedding-invitation-site' // 明示的にデータベースIDを表示
    });

    const rsvpData: FirestoreRSVPData = {
      status: formData.status,
      guest_side: formData.guest_side,
      jpn_family_name: formData.jpn_family_name,
      jpn_first_name: formData.jpn_first_name,
      kana_family_name: formData.kana_family_name,
      kana_first_name: formData.kana_first_name,
      rom_family_name: formData.rom_family_name,
      rom_first_name: formData.rom_first_name,
      email: formData.email,
      phone_number: formData.phone_number,
      zipcode: formData.zipcode,
      address: formData.address,
      address2: formData.address2,
      allergy_flag: formData.allergy_flag,
      allergy: formData.allergy,
      guest_message: formData.guest_message,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('📝 送信データ:', JSON.stringify(rsvpData, null, 2));

    const docRef = await addDoc(collection(db, 'wedding_rsvps'), rsvpData);

    console.log('✅ RSVP作成成功:', docRef.id);

    return {
      success: true,
      message: 'RSVPが正常に登録されました',
      data: { id: docRef.id, ...rsvpData }
    };
  } catch (error) {
    console.error('❌ RSVP作成エラー詳細:', {
      error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorCode: (error as any)?.code || 'no-code',
      errorDetails: (error as any)?.details || 'no-details'
    });
    
    return {
      success: false,
      message: error instanceof Error ? `エラー: ${error.message}` : 'RSVPの登録に失敗しました',
    };
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
