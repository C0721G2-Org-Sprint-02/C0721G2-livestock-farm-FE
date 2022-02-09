import {AppUser} from './app-user';

export interface Role {
  id?: string;
  name?: string;
  appUsers: AppUser;
}
