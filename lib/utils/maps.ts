import { Loader } from '@googlemaps/js-api-loader';

// Google Maps APIの型拡張
declare global {
  interface Window {
    google: any; // Phase 3で詳細な型定義を実装
  }
}

/**
 * Google Maps API設定
 */
const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  version: 'weekly',
  libraries: ['places', 'geometry'],
} as const;

let googleMapsLoader: Loader | null = null;

/**
 * Google Maps APIを読み込む
 */
export async function loadGoogleMaps() {
  if (!GOOGLE_MAPS_CONFIG.apiKey) {
    throw new Error('Google Maps API キーが設定されていません');
  }

  if (!googleMapsLoader) {
    googleMapsLoader = new Loader(GOOGLE_MAPS_CONFIG);
  }

  try {
    await googleMapsLoader.load();
    return window.google;
  } catch (error) {
    console.error('Google Maps API読み込みエラー:', error);
    throw new Error('Google Maps APIの読み込みに失敗しました');
  }
}

/**
 * 式場情報の取得
 */
export function getVenueInfo() {
  return {
    name: process.env.NEXT_PUBLIC_VENUE_NAME || '式場名（未定）',
    address: process.env.NEXT_PUBLIC_VENUE_ADDRESS || '東京都（詳細未定）',
    coordinates: {
      lat: parseFloat(process.env.NEXT_PUBLIC_VENUE_LAT || '35.6762'),
      lng: parseFloat(process.env.NEXT_PUBLIC_VENUE_LNG || '139.6503'),
    },
  };
}

/**
 * 地図を初期化する（Phase 3で実装）
 */
export async function initializeMap(mapElement: HTMLElement) {
  try {
    const google = await loadGoogleMaps();
    const venueInfo = getVenueInfo();

    const map = new google.maps.Map(mapElement, {
      center: venueInfo.coordinates,
      zoom: 15,
      styles: [
        // 和風に合わせたマップスタイル（Phase 3で詳細設定）
        {
          featureType: 'all',
          stylers: [{ saturation: -20 }],
        },
      ],
    });

    // マーカーを追加
    new google.maps.Marker({
      position: venueInfo.coordinates,
      map: map,
      title: venueInfo.name,
      icon: {
        url: '/images/venue-marker.png', // Phase 3でカスタムアイコン作成
        scaledSize: new google.maps.Size(40, 40),
      },
    });

    return map;
  } catch (error) {
    console.error('地図初期化エラー:', error);
    throw error;
  }
}

/**
 * 住所から座標を取得する
 */
export async function geocodeAddress(address: string) {
  try {
    const google = await loadGoogleMaps();
    const geocoder = new google.maps.Geocoder();

    return new Promise<any>((resolve, reject) => {
      geocoder.geocode({ address }, (results: any, status: string) => {
        if (status === 'OK' && results && results[0]) {
          resolve(results[0].geometry.location);
        } else {
          reject(new Error(`ジオコーディングに失敗しました: ${status}`));
        }
      });
    });
  } catch (error) {
    console.error('ジオコーディングエラー:', error);
    throw error;
  }
}
