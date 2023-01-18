interface Workstation {
  id: string;
  name: string;
  city: City;
  phone: string;
  ip: string;
  gateway: string;
  parent_workstation?: Workstation;
  child_workstations?: Workstation[];
}

interface WorkstationPayload {
  name: string;
  city_id: string;
  phone: string;
  ip: string;
  gateway: string;
  parent_workstation_id?: string;
  child_workstation_ids?: string[];
}
