import { Loader } from '@googlemaps/js-api-loader';

// Google Maps APIの型拡張
declare global {
  interface Window {
    google: typeof google;
    initGoogleMap?: () => void;
  }
}

/**
 * Google Maps API設定
 */
const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  version: 'weekly' as const,
  libraries: ['places', 'geometry'] as ('places' | 'geometry')[],
  language: 'ja',
  region: 'JP'
};

let googleMapsLoader: Loader | null = null;
let isLoaded = false;
let loadPromise: Promise<typeof google> | null = null;

/**
 * Google Maps APIを読み込む（改良版）
 */
export async function loadGoogleMaps(): Promise<typeof google> {
  const apiKey = GOOGLE_MAPS_CONFIG.apiKey;
  
  if (!apiKey) {
    throw new Error('Google Maps API キーが設定されていません。環境変数 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY を確認してください。');
  }

  // 既に読み込み済みの場合
  if (isLoaded && window.google?.maps) {
    return window.google;
  }

  // 読み込み中の場合は同じPromiseを返す
  if (loadPromise) {
    return loadPromise;
  }

  // 新規読み込み
  loadPromise = new Promise(async (resolve, reject) => {
    try {
      if (!googleMapsLoader) {
        googleMapsLoader = new Loader(GOOGLE_MAPS_CONFIG);
      }

      await googleMapsLoader.load();
      
      if (window.google?.maps) {
        isLoaded = true;
        resolve(window.google);
      } else {
        throw new Error('Google Maps API の読み込みは完了しましたが、オブジェクトが見つかりません');
      }
    } catch (error) {
      console.error('❌ Google Maps API読み込みエラー:', error);
      loadPromise = null; // エラー時はPromiseをリセット
      
      // エラーの詳細化
      if (error instanceof Error) {
        if (error.message.includes('RefererNotAllowedMapError')) {
          reject(new Error('Google Maps API: ドメインが許可されていません。Google Cloud Console でAPIキーの制限を確認してください。'));
        } else if (error.message.includes('InvalidKeyMapError')) {
          reject(new Error('Google Maps API: 無効なAPIキーです。APIキーを確認してください。'));
        } else if (error.message.includes('ApiNotActivatedMapError')) {
          reject(new Error('Google Maps API: APIが有効化されていません。Google Cloud Console で Maps JavaScript API を有効にしてください。'));
        } else if (error.message.includes('QuotaExceededError')) {
          reject(new Error('Google Maps API: 利用制限を超過しました。'));
        } else {
          reject(new Error(`Google Maps API エラー: ${error.message}`));
        }
      } else {
        reject(new Error('Google Maps APIの読み込みに失敗しました'));
      }
    }
  });

  return loadPromise;
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
export async function geocodeAddress(address: string): Promise<google.maps.LatLng> {
  try {
    const google = await loadGoogleMaps();
    const geocoder = new google.maps.Geocoder();

    return new Promise<google.maps.LatLng>((resolve, reject) => {
      geocoder.geocode({ address }, (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
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
