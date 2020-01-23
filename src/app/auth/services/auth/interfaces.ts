/**
 * Django auth
 */

/**
 *
 */
export interface Credentials {
  email: string;
  password: string;
}

/**
 *
 */
export interface DJTokenResponse<T> {
  token: string;
  user: T;
}

/**
 * Requerido en todo mensaje enviado por websocket
 */
export interface WsAuth {
  token: string;
}
