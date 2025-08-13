// 環境変数の型定義
export interface WeddingEnvironment {
  // 新郎情報
  groomNameEn: string;
  groomNameJp: string;
  groomNameFullJp: string;
  groomBirthDate: string;
  groomBirthPlace: string;
  groomBloodType: string;
  groomOccupation: string;
  groomHobby: string;
  groomMessage: string;

  // 新婦情報
  brideNameEn: string;
  brideNameJp: string;
  brideNameFullJp: string;
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
  venueLat: string;
  venueLng: string;

  // メタデータ
  siteTitle: string;
  siteDescription: string;
}

// 環境変数を取得する関数
export const getWeddingEnv = (): WeddingEnvironment => {
  return {
    // 新郎情報
    groomNameEn: process.env.NEXT_PUBLIC_GROOM_NAME_EN || 'Naoto',
    groomNameJp: process.env.NEXT_PUBLIC_GROOM_NAME_JP || '伊藤尚人',
    groomNameFullJp: process.env.NEXT_PUBLIC_GROOM_NAME_FULL_JP || '伊藤 尚人',
    groomBirthDate: process.env.NEXT_PUBLIC_GROOM_BIRTH_DATE || '1995年3月1日',
    groomBirthPlace: process.env.NEXT_PUBLIC_GROOM_BIRTH_PLACE || '東京都',
    groomBloodType: process.env.NEXT_PUBLIC_GROOM_BLOOD_TYPE || 'A型',
    groomOccupation: process.env.NEXT_PUBLIC_GROOM_OCCUPATION || '会社員',
    groomHobby: process.env.NEXT_PUBLIC_GROOM_HOBBY || 'アウトドア',
    groomMessage: process.env.NEXT_PUBLIC_GROOM_MESSAGE || '当日皆様にお会いできることを楽しみにしております',

    // 新婦情報
    brideNameEn: process.env.NEXT_PUBLIC_BRIDE_NAME_EN || 'Yui',
    brideNameJp: process.env.NEXT_PUBLIC_BRIDE_NAME_JP || '小林結衣',
    brideNameFullJp: process.env.NEXT_PUBLIC_BRIDE_NAME_FULL_JP || '小林 結衣',
    brideBirthDate: process.env.NEXT_PUBLIC_BRIDE_BIRTH_DATE || '1995年6月5日',
    brideBirthPlace: process.env.NEXT_PUBLIC_BRIDE_BIRTH_PLACE || '東京都',
    brideBloodType: process.env.NEXT_PUBLIC_BRIDE_BLOOD_TYPE || 'B型',
    brideOccupation: process.env.NEXT_PUBLIC_BRIDE_OCCUPATION || '保育士',
    brideHobby: process.env.NEXT_PUBLIC_BRIDE_HOBBY || '子どもと猫',
    brideMessage: process.env.NEXT_PUBLIC_BRIDE_MESSAGE || '当日皆様にお会いできることを楽しみにしております',

    // 結婚式情報
    weddingDate: process.env.NEXT_PUBLIC_WEDDING_DATE || '2100-12-31T10:00:00+09:00',
    weddingDateDisplay: process.env.NEXT_PUBLIC_WEDDING_DATE_DISPLAY || '2100.12.31',
    weddingDateJp: process.env.NEXT_PUBLIC_WEDDING_DATE_JP || '2100年12月31日',
    weddingDayJp: process.env.NEXT_PUBLIC_WEDDING_DAY_JP || '金曜日',
    ceremonyTime: process.env.NEXT_PUBLIC_CEREMONY_TIME || '10:00',
    ceremonyTimeDisplay: process.env.NEXT_PUBLIC_CEREMONY_TIME_DISPLAY || '午前10時',
    receptionTime: process.env.NEXT_PUBLIC_RECEPTION_TIME || '11:00',
    receptionTimeDisplay: process.env.NEXT_PUBLIC_RECEPTION_TIME_DISPLAY || '午前11時',

    // 会場情報
    venueName: process.env.NEXT_PUBLIC_VENUE_NAME || 'サンプルホテル',
    venueAddress: process.env.NEXT_PUBLIC_VENUE_ADDRESS || '東京都港区北青山３丁目５－１５',
    venueLat: process.env.NEXT_PUBLIC_VENUE_LAT || '35.6762',
    venueLng: process.env.NEXT_PUBLIC_VENUE_LNG || '139.6503',

    // メタデータ
    siteTitle: process.env.NEXT_PUBLIC_SITE_TITLE || 'Wedding Invitation',
    siteDescription: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || '結婚式招待サイト',
  };
};

// 便利な個別取得関数
export const getGroomName = () => ({
  en: process.env.NEXT_PUBLIC_GROOM_NAME_EN || 'Naoto',
  jp: process.env.NEXT_PUBLIC_GROOM_NAME_JP || '伊藤尚人',
  fullJp: process.env.NEXT_PUBLIC_GROOM_NAME_FULL_JP || '伊藤 尚人',
});

export const getBrideName = () => ({
  en: process.env.NEXT_PUBLIC_BRIDE_NAME_EN || 'Yui',
  jp: process.env.NEXT_PUBLIC_BRIDE_NAME_JP || '小林結衣',
  fullJp: process.env.NEXT_PUBLIC_BRIDE_NAME_FULL_JP || '小林 結衣',
});

export const getCoupleNames = () => ({
  groom: getGroomName(),
  bride: getBrideName(),
  combined: {
    en: `${getGroomName().en} & ${getBrideName().en}`,
    jp: `${getGroomName().jp} ♡ ${getBrideName().jp}`,
    shortEn: `${getGroomName().en.charAt(0)} & ${getBrideName().en.charAt(0)}`,
  },
});

export const getWeddingDate = () => {
  const date = new Date(process.env.NEXT_PUBLIC_WEDDING_DATE || '2100-12-31T10:00:00+09:00');
  return {
    date,
    display: process.env.NEXT_PUBLIC_WEDDING_DATE_DISPLAY || '2100.12.31',
    jp: process.env.NEXT_PUBLIC_WEDDING_DATE_JP || '2100年12月31日',
    dayJp: process.env.NEXT_PUBLIC_WEDDING_DAY_JP || '金曜日',
  };
};
