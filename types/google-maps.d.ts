// Google Maps JavaScript API type declarations
declare global {
  namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: Element | null, opts?: MapOptions);
        setCenter(latlng: LatLng | LatLngLiteral): void;
        setZoom(zoom: number): void;
        getCenter(): LatLng;
        getZoom(): number;
      }

      class Marker {
        constructor(opts?: MarkerOptions);
        setPosition(latlng: LatLng | LatLngLiteral): void;
        setMap(map: Map | null): void;
        setTitle(title: string): void;
        addListener(eventName: string, handler: () => void): void;
      }

      class InfoWindow {
        constructor(opts?: InfoWindowOptions);
        open(map?: Map, anchor?: Marker): void;
        close(): void;
        setContent(content: string | Element): void;
      }

      class Geocoder {
        constructor();
        geocode(
          request: GeocoderRequest,
          callback: (results: GeocoderResult[], status: GeocoderStatus) => void
        ): void;
      }

      class LatLng {
        constructor(lat: number, lng: number);
        lat(): number;
        lng(): number;
      }

      interface LatLngLiteral {
        lat: number;
        lng: number;
      }

      interface MapOptions {
        center?: LatLng | LatLngLiteral;
        zoom?: number;
        mapTypeId?: MapTypeId;
        styles?: MapTypeStyle[];
        disableDefaultUI?: boolean;
        mapTypeControl?: boolean;
        streetViewControl?: boolean;
        fullscreenControl?: boolean;
        zoomControl?: boolean;
        gestureHandling?: string;
      }

      interface MarkerOptions {
        position?: LatLng | LatLngLiteral;
        map?: Map;
        title?: string;
        icon?: string | Icon | Symbol;
        animation?: Animation;
      }

      interface InfoWindowOptions {
        content?: string | Element;
        maxWidth?: number;
      }

      interface Icon {
        url: string;
        scaledSize?: Size;
        origin?: Point;
        anchor?: Point;
      }

      interface Symbol {
        path: string | SymbolPath;
        fillColor?: string;
        fillOpacity?: number;
        strokeColor?: string;
        strokeWeight?: number;
        scale?: number;
      }

      interface Size {
        constructor(width: number, height: number): Size;
        width: number;
        height: number;
      }

      interface Point {
        constructor(x: number, y: number): Point;
        x: number;
        y: number;
      }

      interface MapTypeStyle {
        featureType?: string;
        elementType?: string;
        stylers?: any[];
      }

      interface GeocoderRequest {
        address?: string;
        location?: LatLng | LatLngLiteral;
        placeId?: string;
      }

      interface GeocoderResult {
        geometry: {
          location: LatLng;
          bounds?: LatLngBounds;
        };
        formatted_address: string;
        place_id: string;
      }

      interface LatLngBounds {
        contains(latLng: LatLng | LatLngLiteral): boolean;
        extend(point: LatLng | LatLngLiteral): LatLngBounds;
      }

      type GeocoderStatus = string;
      type MapTypeId = string;

      enum Animation {
        BOUNCE = 1,
        DROP = 2
      }

      enum SymbolPath {
        CIRCLE = 'circle',
        BACKWARD_CLOSED_ARROW = 'backward_closed_arrow',
        BACKWARD_OPEN_ARROW = 'backward_open_arrow',
        FORWARD_CLOSED_ARROW = 'forward_closed_arrow',
        FORWARD_OPEN_ARROW = 'forward_open_arrow'
      }
    }
  }
}

export {};
