export interface Workstation {
  id: string;
  name: string;
  city_id: string;
  phone: string;
  ip: string;
  gateway: string;
  parent_workstation_id?: string;
  child_workstation_ids?: string[];
}

export interface PostCreateWorkstationParams {
  name: string;
  city_id: string;
  phone: string;
  ip: string;
  gateway: string;
  parent_workstation_id?: string;
  child_workstation_ids?: string[];
}

export interface PostCreateWorkstationResponse {
  id: string;
  name: string;
  city_id: string;
  phone: string;
  ip: string;
  gateway: string;
  parent_workstation_id?: string;
  child_workstation_ids?: string[];
}

export interface PutUpdateWorkstationParams {
  workId: string;
  data: {
    id: string;
    name: string;
    city_id: string;
    phone: string;
    ip: string;
    gateway: string;
    parent_workstation_id?: string;
    child_workstation_ids?: string[];
  };
}

export interface PutUpdateWorkstationResponse {
  id: string;
  name: string;
  city_id: string;
  phone: string;
  ip: string;
  gateway: string;
  parent_workstation_id?: string;
  child_workstation_ids?: string[];
}

export interface DeleteWorkstationParams {
  workId: string;
  data: Record<string, string[]>;
}
