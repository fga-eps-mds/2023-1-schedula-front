interface Workstation {
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

interface WorkstationPayload {
  name: string;
  city_payload: { label: string; value: string };
  phone: string;
  ip: string;
  gateway: string;
  is_regional: boolean;
  parent_workstation_payload?: { label: string; value: string };
  child_workstation_payload?: { label: string; value: string }[];
}
