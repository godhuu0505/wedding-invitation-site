/**
 * 人物情報の型定義（内部使用）
 */
interface PersonInfo {
  nameFullJp: string;
  nameFullEn: string;
  familyNameJp: string;
  firstNameJp: string;
  familyNameEn: string;
  firstNameEn: string;
  birthDate: string;
  birthPlace: string;
  bloodType: string;
  occupation: string;
  hobby: string;
  message: string;
}

/**
 * 人物の名前情報の型定義
 */
export interface PersonNameInfo {
  en: string; // 下位互換性のため（firstNameEn相当）
  jp: string; // 下位互換性のため（familyNameJp + firstNameJp）
  fullJp: string;
  fullEn: string;
  familyNameJp: string;
  firstNameJp: string;
  familyNameEn: string;
  firstNameEn: string;
}

/**
 * 名前の部品情報の型定義
 */
export interface NameParts {
  familyName: string;
  firstName: string;
  familyNameEn: string;
  firstNameEn: string;
}

/**
 * ローマ字専用の名前情報の型定義
 */
export interface NamePartsEn {
  familyName: string;
  firstName: string;
}

/**
 * 結婚式日時情報の型定義
 */
export interface WeddingDateInfo {
  date: Date;
  display: string;
  jp: string;
  dayJp: string;
}

/**
 * カップル組み合わせ情報の型定義
 */
export interface CombinedInfo {
  en: string;
  jp: string;
  fullEn: string;
  fullJp: string;
  shortEn: string;
}

/**
 * 結婚式環境変数の型定義（既存互換性を保持）
 */
export interface WeddingEnvironment {
  // 新郎情報
  groomNameFullJp: string;
  groomNameFullEn: string;
  groomFamilyNameJp: string;
  groomFirstNameJp: string;
  groomFamilyNameEn: string;
  groomFirstNameEn: string;
  groomBirthDate: string;
  groomBirthPlace: string;
  groomBloodType: string;
  groomOccupation: string;
  groomHobby: string;
  groomMessage: string;

  // 新婦情報
  brideNameFullJp: string;
  brideNameFullEn: string;
  brideFamilyNameJp: string;
  brideFirstNameJp: string;
  brideFamilyNameEn: string;
  brideFirstNameEn: string;
  brideBirthDate: string;
  brideBirthPlace: string;
  brideBloodType: string;
  brideOccupation: string;
  brideHobby: string;
  brideMessage: string;

  // 結婚式情報
  weddingDate: string;
  weddingDateDisplay: string;
  weddingDateJp: string;
  weddingDayJp: string;
  ceremonyTime: string;
  ceremonyTimeDisplay: string;
  receptionTime: string;
  receptionTimeDisplay: string;

  // 会場情報
  venueName: string;
  venueAddress: string;
  venueWebSite: string;
  venueLat: string;
  venueLng: string;

  // 連絡先情報
  lineOfficialUrl: string;

  // メタデータ
  siteTitle: string;
  siteDescription: string;
}

/**
 * デフォルト値の定義
 */
const DEFAULT_VALUES = {
  groom: {
    nameFullJp: '伊藤 尚人',
    nameFullEn: 'Naoto Ito',
    familyNameJp: '伊藤',
    firstNameJp: '尚人',
    familyNameEn: 'Ito',
    firstNameEn: 'Naoto',
    birthDate: '1995年3月1日',
    birthPlace: '東京都',
    bloodType: 'A型',
    occupation: '会社員',
    hobby: 'アウトドア',
    message: '当日皆様にお会いできることを楽しみにしております',
  },
  bride: {
    nameFullJp: '小林 結衣',
    nameFullEn: 'Yui Kobayashi',
    familyNameJp: '小林',
    firstNameJp: '結衣',
    familyNameEn: 'Kobayashi',
    firstNameEn: 'Yui',
    birthDate: '1995年6月5日',
    birthPlace: '東京都',
    bloodType: 'B型',
    occupation: '保育士',
    hobby: '子どもと猫',
    message: '当日皆様にお会いできることを楽しみにしております',
  },
  wedding: {
    date: '2100-12-31T10:00:00+09:00',
    dateDisplay: '2100.12.31',
    dateJp: '2100年12月31日',
    dayJp: '金曜日',
    ceremonyTime: '10:00',
    ceremonyTimeDisplay: '午前10時',
    receptionTime: '11:00',
    receptionTimeDisplay: '午前11時',
  },
  venue: {
    name: 'サンプルホテル',
    address: '東京都港区北青山３丁目５－１５',
    webSite: 'https://example-venue.com',
    lat: '35.6762',
    lng: '139.6503',
  },
  metadata: {
    siteTitle: 'Wedding Invitation',
    siteDescription: '結婚式招待サイト',
  },
} as const;

/**
 * 環境変数から値を安全に取得するヘルパー関数
 */
const getEnvValue = (key: string, defaultValue: string): string => {
  // Next.jsのクライアントサイドでは process.env は ビルド時に置換される
  // そのため、undefinedの場合はデフォルト値を使用
  const value = process.env[key];
  return value || defaultValue;
};

/**
 * 環境変数のキャッシュ（ハイドレーションエラー対策）
 */
let envCache: WeddingEnvironment | null = null;

/**
 * 結婚式環境変数を取得する関数（リファクタリング版・ハイドレーション対応）
 */
export const getWeddingEnv = (): WeddingEnvironment => {
  // キャッシュがある場合はそれを返す（一貫性確保）
  if (envCache) {
    return envCache;
  }

  envCache = {
    // 新郎情報
    groomNameFullJp: '田中 瑚大',
    groomNameFullEn: 'Tanaka Godai',
    groomFamilyNameJp: '田中',
    groomFirstNameJp: '瑚大',
    groomFamilyNameEn: 'Tanaka',
    groomFirstNameEn: 'Godai',
    groomBirthDate: '1993年5月5日',
    groomBirthPlace: '埼玉県',
    groomBloodType: 'B型のINFP(仲介者)',
    groomOccupation: '会社員',
    groomHobby: '週末は外に出かけることが多く、サッカー・キャンプ・ゴルフなどにハマっています！犬が好きな犬顔ですが犬アレルギー持ちで困ってます',
    groomMessage: '美味しい料理・お酒を用意してお待ちしております\n当日皆様にお会いできることを楽しみにしております',

    // 新婦情報
    brideNameFullJp: '與口 花菜',
    brideNameFullEn: 'Yoguchi Kana',
    brideFamilyNameJp: '與口',
    brideFirstNameJp: '花菜',
    brideFamilyNameEn: 'Yoguchi',
    brideFirstNameEn: 'Kana',
    brideBirthDate: '1994年11月5日',
    brideBirthPlace: '東京都',
    brideBloodType: 'O型のISTJ(管理者)',
    brideOccupation: '会社員',
    brideHobby: 'キャリアアドバイザーから人事労務に職種チェンジし プライベートでは超多趣味なので3人分くらいの人生を謳歌するつもりで生きています',
    brideMessage: '皆さんが存分に楽しめる宴になるよう鋭意準備中です\nご参列心よりお待ちしております',

    // 結婚式情報
    weddingDate: process.env.NEXT_PUBLIC_WEDDING_DATE || '2100年12月31日',
    weddingDateDisplay: process.env.NEXT_PUBLIC_WEDDING_DATE_DISPLAY || '2025年11月3日',
    weddingDateJp: process.env.NEXT_PUBLIC_WEDDING_DATE_JP || '2025年11月3日',
    weddingDayJp: process.env.NEXT_PUBLIC_WEDDING_DAY_JP || '月曜日',
    ceremonyTime: process.env.NEXT_PUBLIC_CEREMONY_TIME || '14:00',
    ceremonyTimeDisplay: process.env.NEXT_PUBLIC_CEREMONY_TIME_DISPLAY || '14:00',
    receptionTime: process.env.NEXT_PUBLIC_RECEPTION_TIME || '17:00',
    receptionTimeDisplay: process.env.NEXT_PUBLIC_RECEPTION_TIME_DISPLAY || '17:00',

    // 会場情報
    venueName: process.env.NEXT_PUBLIC_VENUE_NAME || '例の会場',
    venueAddress: process.env.NEXT_PUBLIC_VENUE_ADDRESS || '東京都千代田区1-1-1',
    venueWebSite: process.env.NEXT_PUBLIC_WEB_SITE || 'https://example-venue.com',
    venueLat: process.env.NEXT_PUBLIC_VENUE_LAT || '35.6895',
    venueLng: process.env.NEXT_PUBLIC_VENUE_LNG || '139.6917',

    // 連絡先情報
    lineOfficialUrl: process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL || '',

    // メタデータ
    siteTitle: process.env.NEXT_PUBLIC_SITE_TITLE || '瑚大 & 花菜 結婚式招待サイト',
    siteDescription: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || '結婚式の招待状です',
  };

  return envCache;
};

/**
 * 人物の名前情報を統一的に取得する汎用関数
 */
const getPersonNameInfo = (env: WeddingEnvironment, prefix: 'groom' | 'bride'): PersonNameInfo => {
  const familyNameJp = prefix === 'groom' ? env.groomFamilyNameJp : env.brideFamilyNameJp;
  const firstNameJp = prefix === 'groom' ? env.groomFirstNameJp : env.brideFirstNameJp;
  const familyNameEn = prefix === 'groom' ? env.groomFamilyNameEn : env.brideFamilyNameEn;
  const firstNameEn = prefix === 'groom' ? env.groomFirstNameEn : env.brideFirstNameEn;
  const fullJp = prefix === 'groom' ? env.groomNameFullJp : env.brideNameFullJp;
  const fullEn = prefix === 'groom' ? env.groomNameFullEn : env.brideNameFullEn;

  return {
    // 下位互換性のため
    en: firstNameEn,
    jp: familyNameJp + firstNameJp,
    
    // 完全な名前情報
    fullJp,
    fullEn,
    familyNameJp,
    firstNameJp,
    familyNameEn,
    firstNameEn,
  };
};

/**
 * 新郎の名前情報を取得
 */
export const getGroomName = (): PersonNameInfo => {
  const env = getWeddingEnv();
  return getPersonNameInfo(env, 'groom');
};

/**
 * 新婦の名前情報を取得
 */
export const getBrideName = (): PersonNameInfo => {
  const env = getWeddingEnv();
  return getPersonNameInfo(env, 'bride');
};

/**
 * カップルの名前情報を組み合わせて取得
 */
export const getCoupleNames = () => {
  const groom = getGroomName();
  const bride = getBrideName();
  
  return {
    groom,
    bride,
    combined: {
      en: `${groom.en} & ${bride.en}`,
      jp: `${groom.jp} & ${bride.jp}`,
      fullEn: `${groom.fullEn} & ${bride.fullEn}`,
      fullJp: `${groom.fullJp} & ${bride.fullJp}`,
      shortEn: `${groom.en.charAt(0)} & ${bride.en.charAt(0)}`,
    } as CombinedInfo,
  };
};

/**
 * 名前の部品情報を取得する汎用関数
 */
const getNamePartsFromEnv = (env: WeddingEnvironment, prefix: 'groom' | 'bride'): NameParts => ({
  familyName: prefix === 'groom' ? env.groomFamilyNameJp : env.brideFamilyNameJp,
  firstName: prefix === 'groom' ? env.groomFirstNameJp : env.brideFirstNameJp,
  familyNameEn: prefix === 'groom' ? env.groomFamilyNameEn : env.brideFamilyNameEn,
  firstNameEn: prefix === 'groom' ? env.groomFirstNameEn : env.brideFirstNameEn,
});

/**
 * ローマ字の名前部品を取得する汎用関数
 */
const getNamePartsEnFromEnv = (env: WeddingEnvironment, prefix: 'groom' | 'bride'): NamePartsEn => ({
  familyName: prefix === 'groom' ? env.groomFamilyNameEn : env.brideFamilyNameEn,
  firstName: prefix === 'groom' ? env.groomFirstNameEn : env.brideFirstNameEn,
});

/**
 * 新郎の苗字・名前を取得
 */
export const getGroomNameParts = (): NameParts => {
  const env = getWeddingEnv();
  return getNamePartsFromEnv(env, 'groom');
};

/**
 * 新婦の苗字・名前を取得
 */
export const getBrideNameParts = (): NameParts => {
  const env = getWeddingEnv();
  return getNamePartsFromEnv(env, 'bride');
};

/**
 * カップルの苗字・名前を取得
 */
export const getCoupleNameParts = () => ({
  groom: getGroomNameParts(),
  bride: getBrideNameParts(),
});

/**
 * 新郎のローマ字苗字・名前を取得
 */
export const getGroomNamePartsEn = (): NamePartsEn => {
  const env = getWeddingEnv();
  return getNamePartsEnFromEnv(env, 'groom');
};

/**
 * 新婦のローマ字苗字・名前を取得
 */
export const getBrideNamePartsEn = (): NamePartsEn => {
  const env = getWeddingEnv();
  return getNamePartsEnFromEnv(env, 'bride');
};

/**
 * カップルのローマ字苗字・名前を取得
 */
export const getCoupleNamePartsEn = () => ({
  groom: getGroomNamePartsEn(),
  bride: getBrideNamePartsEn(),
});

/**
 * 結婚式の日時情報を取得
 */
export const getWeddingDate = (): WeddingDateInfo => {
  const env = getWeddingEnv();
  return {
    date: new Date(env.weddingDate),
    display: env.weddingDateDisplay,
    jp: env.weddingDateJp,
    dayJp: env.weddingDayJp,
  };
};
