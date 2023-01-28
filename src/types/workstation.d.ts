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
  city: { label: string; value: string };
  phone: string;
  ip: string;
  gateway: string;
  is_regional: boolean;
  parent_workstation?: { label: string; value: string };
  child_workstation?: { label: string; value: string }[];
}

interface DeleteWorkstationPayload {
  workstationDeleteId?: string;
  workstationsRealoc?: [
    {
      workstation?: { label: string; value: string };
      workstationsToRealoc?: { label: string; value: string }[];
    }
  ];
}
