export interface Workstation {
  id: string;
  name: string;
  city: City;
  phone: string;
  ip: string;
  gateway: string;
  parent_workstation?: Workstation;
  child_workstations?: Workstation[];
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
  city: City;
  phone: string;
  ip: string;
  gateway: string;
  parent_workstation?: Workstation;
  child_workstations?: Workstation[];
}

export interface PutUpdateWorkstationParams {
  workstationId: string;
  data: {
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
  city: City;
  phone: string;
  ip: string;
  gateway: string;
  parent_workstation?: Workstation;
  child_workstations?: Workstation[];
}

export interface DeleteWorkstationParams {
  workstationId: string;
  data: Record<string, string[]>;
}
