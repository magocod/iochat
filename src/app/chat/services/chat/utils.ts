/**
 * Chat methods
 */

/**
 *
 */
export enum RoomMethods {
  UPSERT = 'U',
  DELETE = 'D',
  READ = 'R',
}

/**
 * [TypeRoomMethods description]
 */
export type TypeRoomMethods = 'U' | 'D' | 'R';

/**
 *
 */
export enum MessageMethods {
  CREATE = 'C',
  DELETE = 'D',
  READ = 'R',
  EXIT = 'E', // room
  JOIN = 'J', // room
}

/**
 * [TypeMessageMethods description]
 */
export type TypeMessageGroupMethods = 'E' | 'J';

/**
 * [TypeMessageMethods description]
 */
export type TypeMessageBasicMethods = 'C' | 'D' | 'R';

/**
 * [TypeMessageMethods description]
 */
export type TypeMessageMethods = TypeMessageGroupMethods | TypeMessageBasicMethods;

/**
 * [TypeChatMethods description]
 */
export type TypeChatMethods = TypeRoomMethods | TypeMessageMethods;
