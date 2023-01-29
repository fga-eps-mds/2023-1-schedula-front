interface Chamado {
  id: number;
  attendant_name: string;
  applicant_name: string;
  applicant_phone: string;
  city: City;
  city_id: number;
  workstation: Workstation;
  workstation_id: number;
  created_at: Date;
  problems: ChamadoProblem[];
}

type ChamadoProblem = {
  category_id: number;
  problem_id: number;
  request_status: Status;
  priority: Priority;
  problem: TipoProblema;
  category: Category;
  is_event: boolean;
} & ChamadoEvent;

interface ChamadoEvent {
  is_event: boolean;
  event_date?: Date;
  alert_dates?: {
    date: Date;
  }[];
  description?: string;
}

interface ChamadoPayload {
  attendant_name?: string;
  applicant_name: string;
  applicant_phone: string;
  city_id: number;
  workstation_id: number;
  problems: ChamadoProblemPayload[];
}

type ChamadoProblemPayload = {
  category_id: number;
  problem_id: number;
  request_status: Status = 'solved';
  priority: Priority;
  is_event: boolean;
  event_date?: Date;
  description?: string;
};

type Status =
  | 'pending'
  | 'in_progress'
  | 'not_solved'
  | 'outsourced'
  | 'solved';

type Priority = 'low' | 'normal' | 'high' | 'urgent';

interface Chamado {
  id: number;
  attendant_name: string;
  applicant_name: string;
  applicant_phone: string;
  city: City;
  city_id: number;
  workstation: Workstation;
  workstation_id: number;
  created_at: Date;
  problems: ChamadoProblem[];
}

interface ChamadoEvent {
  is_event: boolean;
  event_date?: Date;
  alert_dates?: Date[];
  description?: string;
}

interface ChamadoPayload {
  attendant_name?: string;
  applicant_name: string;
  applicant_phone: string;
  city_id: number;
  workstation_id: number;
  problems: ChamadoProblemPayload[];
}

type ChamadoFormValues = {
  attendant_name?: string;
  applicant_name: string;
  applicant_phone: string;
  city_id: SelectOption | null;
  workstation_id: SelectOption | null;
  problems: ({
    category_id: SelectOption | null;
    problem_id: SelectOption[] | null;
    request_status: SelectOption<Status>;
    priority: SelectOption<Priority>;
    is_event: boolean;
  } & Omit<ChamadoEvent, 'is_event'>)[];
};
