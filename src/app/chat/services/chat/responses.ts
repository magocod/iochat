/**
 * Chat websockets response
 */

import { IChatRoom, IChatMessage } from './interfaces';
import { TypeChatMethods } from './utils';

/**
 *
 */
export interface ISocketResponse {
  method: TypeChatMethods;
}

/**
 *
 */
export interface IChatSocketResponse<T> extends ISocketResponse {
  data: T;
}

/**
 *
 */
export interface ISocketExceptionResponse {
  exception: string;
}

/**
 *
 */
export interface ISocketErrorResponse {
  errors: any[] | ISocketExceptionResponse;
}

/**
 *
 */
export interface IJoinRoomResponse {
  join: number;
  name: string;
}

/**
 *
 */
export interface IMessageGroupResponse {
  room: number;
  username: string;
}

/**
 *
 */
export interface ILeaveRoomResponse {
  leave: number;
}

/**
 *
 */
export interface IDeleteRoomsResponse {
  count: number;
  pk_list: number[];
}
