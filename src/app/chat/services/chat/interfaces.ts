/**
 * Dj Chat
 */

import { TypeRoomMethods, TypeMessageMethods } from './utils';

/**
 *
 */
export interface ChatRoom {
  id: number;
  name: string;
  updated: string;
  timestamp: string;
}

/**
 *
 */
export interface ChatRoomCreate {
  name: string;
}

/**
 *
 */
export interface DeleteMultipleRoom {
  pk_list: number[];
}

/**
 *
 */
export interface ChatMessage {
  id: number;
  text: string;
  updated: string;
  timestamp: string;
  room_id: number;
}

/**
 *
 */
export interface ChatMessageCreate {
  text: string;
  room_id: number;
}

/**
 *
 */
export interface ChatMessageDelete {
  message_id: number;
}

/**
 *
 */
export interface RequestChat {
  token: string;
}

/**
 *
 */
export interface RequestRoom extends RequestChat {
  method: TypeRoomMethods;
  values: ChatRoomCreate | DeleteMultipleRoom;
}

/**
 *
 */
export interface RequestMessage extends RequestChat {
  method: TypeMessageMethods;
  values: ChatMessageCreate | ChatMessageDelete;
}
