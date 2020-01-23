/**
 * Django auth
 */

/**
 *
 */
export interface ICredentials {
  email: string;
  password: string;
}

/**
 *
 */
export interface IDJTokenResponse<T> {
  token: string;
  user: T;
}

/**
 * Requerido en todo mensaje enviado por websocket
 */
export interface IWsAuth {
  token: string;
}
