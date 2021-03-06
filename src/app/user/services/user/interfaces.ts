/**
 * Django auth user
 */

/**
 *
 */
export interface DjangoUser {
  id: number;
  username: string;
  is_superuser: boolean;
  is_staff: boolean;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  user_permissions: any[];
}

/**
 *
 */
export interface DjangoUserADD {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
}
