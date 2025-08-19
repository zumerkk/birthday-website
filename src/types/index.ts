export interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

export interface PoemLine {
  letter: string;
  text: string;
  delay: number;
}

export interface GiftBoxState {
  isOpened: boolean;
  isAnimating: boolean;
}