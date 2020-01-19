/**
 * Dj Chat
 */

import { TypeRoomMethods, TypeMessageMethods } from './utils';

/**
 *
 */
export interface IChatRoom {
  id: number;
  name: string;
  updated: string;
  timestamp: string;
}

/**
 *
 */
export interface IChatRoomCreate {
  name: string;
}

/**
 *
 */
export interface IDeleteMultipleRoom {
  pk_list: number[];
}

/**
 *
 */
export interface IChatMessage {
  id: number;
  text: string;
  updated: string;
  timestamp: string;
  room_id: number;
}

/**
 *
 */
export interface IChatMessageCreate {
  text: string;
  room_id: number;
}

/**
 *
 */
export interface IChatMessageDelete {
  message_id: number;
}

/**
 *
 */
export interface IRequestChat {
  token: string;
}

/**
 *
 */
export interface IRequestRoom extends IRequestChat {
  method: TypeRoomMethods;
  values: IChatRoomCreate | IDeleteMultipleRoom;
}

/**
 *
 */
export interface IRequestMessage extends IRequestChat {
  method: TypeMessageMethods;
  values: IChatMessageCreate | IChatMessageDelete;
}
