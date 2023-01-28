export interface Workstation {
  id: string;
  name: string;
  city: City;
  phone: string;
  ip: string;
  is_regional: boolean;
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
  is_regional: boolean;
  parent_workstation_id?: string | null;
  child_workstation_ids?: string[] | null;
}

export interface PostCreateWorkstationResponse {
  id: string;
  name: string;
  city: City;
  phone: string;
  ip: string;
  gateway: string;
  is_regional: boolean;
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
    is_regional: boolean;
    parent_workstation_id?: string | null;
    child_workstation_ids?: string[] | null;
  };
}

export interface PutUpdateWorkstationResponse {
  id: string;
  name: string;
  city: City;
  phone: string;
  ip: string;
  gateway: string;
  is_regional: boolean;
  parent_workstation?: Workstation;
  child_workstations?: Workstation[];
}

export interface DeleteWorkstationParams {
  workstationId: string;
  data: {
    destinationId: string;
    reallocatedId: string;
  }[];
}
