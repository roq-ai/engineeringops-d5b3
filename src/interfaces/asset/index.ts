import { ProjectInterface } from 'interfaces/project';
import { GetQueryInterface } from 'interfaces';

export interface AssetInterface {
  id?: string;
  type: string;
  project_id?: string;
  created_at?: any;
  updated_at?: any;

  project?: ProjectInterface;
  _count?: {};
}

export interface AssetGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  project_id?: string;
}
