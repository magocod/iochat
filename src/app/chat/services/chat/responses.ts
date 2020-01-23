/**
 * Chat websockets response
 */

import { ChatRoom, ChatMessage } from './interfaces';
import { TypeChatMethods } from './utils';

/**
 *
 */
export interface SocketResponse {
  method: TypeChatMethods;
}

/**
 *
 */
export interface ChatSocketResponse<T> extends SocketResponse {
  data: T;
}

/**
 *
 */
export interface SocketExceptionResponse {
  exception: string;
}

/**
 *
 */
export interface SocketErrorResponse {
  errors: any[] | SocketExceptionResponse;
}

/**
 *
 */
export interface JoinRoomResponse {
  join: number;
  name: string;
}

/**
 *
 */
export interface MessageGroupResponse {
  room: number;
  username: string;
}

/**
 *
 */
export interface LeaveRoomResponse {
  leave: number;
}

/**
 *
 */
export interface DeleteRoomsResponse {
  count: number;
  pk_list: number[];
}
