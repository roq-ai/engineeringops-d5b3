import { AssetInterface } from 'interfaces/asset';
import { MetricInterface } from 'interfaces/metric';
import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ProjectInterface {
  id?: string;
  name: string;
  description?: string;
  organization_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  asset?: AssetInterface[];
  metric?: MetricInterface[];
  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {
    asset?: number;
    metric?: number;
  };
}

export interface ProjectGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  organization_id?: string;
  user_id?: string;
}
