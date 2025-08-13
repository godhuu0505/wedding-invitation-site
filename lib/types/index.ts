// 結婚式招待サイト共通型定義

export interface RSVPData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  attendance: 'attending' | 'not-attending' | 'tentative';
  guestCount: number;
  dietaryRestrictions?: string;
  message?: string;
  side: 'bride' | 'groom';
  allergies?: {
    hasAllergies: boolean;
    details?: string;
  };
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
