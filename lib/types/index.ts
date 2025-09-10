// 結婚式招待サイト共通型定義

// フォームから送信されるRSVPデータの型定義
export interface RSVPFormData {
  status: 1 | 2; // 1: 出席, 2: 欠席
  guest_side: 0 | 1; // 0: 新郎側, 1: 新婦側
  jpn_family_name: string;
  jpn_first_name: string;
  kana_family_name: string;
  kana_first_name: string;
  rom_family_name: string;
  rom_first_name: string;
  email: string;
  phone_number: string;
  zipcode: string;
  address: string;
  address2: string;
  allergy_flag: 0 | 1; // 0: アレルギーなし, 1: アレルギーあり
  allergy: string[];
  guest_message: string;
}

// Firestoreに保存するRSVPデータの型定義
export interface FirestoreRSVPData {
  id?: string;
  status: 1 | 2;
  guest_side: 0 | 1;
  jpn_family_name: string;
  jpn_first_name: string;
  kana_family_name: string;
  kana_first_name: string;
  rom_family_name: string;
  rom_first_name: string;
  email: string;
  phone_number: string;
  zipcode: string;
  address: string;
  address2: string;
  allergy_flag: 0 | 1;
  allergy: string[];
  guest_message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WeddingInfo {
  coupleNames: {
    groom: string;
    bride: string;
  };
  weddingDate: Date;
  venues: {
    ceremony: {
      name: string;
      address: string;
      time: string;
      coordinates?: {
        lat: number;
        lng: number;
      };
    };
    reception: {
      name: string;
      address: string;
      time: string;
      coordinates?: {
        lat: number;
        lng: number;
      };
    };
  };
  dressCode?: string;
  rsvpDeadline: Date;
}

export interface AdminSettings {
  admins: string[];
  settings: WeddingInfo;
  notifications: {
    emailEnabled: boolean;
    adminEmail: string;
  };
}

export interface LoadingState {
  isLoading: boolean;
  progress?: number;
  message?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
}
