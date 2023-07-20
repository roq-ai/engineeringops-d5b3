import { ProjectInterface } from 'interfaces/project';
import { GetQueryInterface } from 'interfaces';

export interface MetricInterface {
  id?: string;
  type: string;
  value: number;
  project_id?: string;
  created_at?: any;
  updated_at?: any;

  project?: ProjectInterface;
  _count?: {};
}

export interface MetricGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  project_id?: string;
}
