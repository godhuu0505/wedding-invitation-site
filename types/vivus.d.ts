declare module 'vivus' {
  interface VivusOptions {
    type?: 'delayed' | 'sync' | 'oneByOne' | 'script' | 'scenario';
    duration?: number;
    start?: 'inViewport' | 'manual' | 'autostart';
    dashGap?: number;
    forceRender?: boolean;
    animTimingFunction?: 'EASE' | 'EASE_OUT' | 'EASE_OUT_BOUNCE' | ((t: number) => number);
    pathTimingFunction?: 'EASE' | 'EASE_OUT' | 'EASE_OUT_BOUNCE' | ((t: number) => number);
    reverseStack?: boolean;
    selfDestroy?: boolean;
    onReady?: () => void;
    file?: string;
  }

  class Vivus {
    static EASE: string;
    static EASE_OUT: string;
    static EASE_OUT_BOUNCE: string;

    constructor(
      element: string | HTMLElement,
      options?: VivusOptions,
      callback?: () => void
    );

    play(speed?: number): this;
    stop(): this;
    reset(): this;
    finish(): this;
    setFrameProgress(progress: number): this;
    getStatus(): number;
    destroy(): void;
  }

  export default Vivus;
}
