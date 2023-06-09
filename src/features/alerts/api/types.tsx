export interface Alert {
  id: string;
  sourceName: string;
  targetName: string;
  targetEmail: string;
  message: string;
  status: string;
  pendency: string;
  read: boolean;
}

export interface PostCreateAlertParams {
  sourceName: string;
  targetName: string;
  targetEmail: string;
  message: string;
  status: string;
  pendency: string;
  read: boolean;
}

export interface PostCreateAlertResponse {
  id: string;
  sourceName: string;
  targetName: string;
  targetEmail: string;
  message: string;
  status: string;
  pendency: string;
  read: boolean;
}

/* export interface PutUpdateAlertParams {
  AlertId: string;
  data: {
    name: string;
    file?: any;
    category_id: {
      value: string;
    };
  };
}

export interface PutUpdateAlertResponse {
  id: string;
  name: string;
  filename: string;
  data: any;
  category: {
    id: string;
    name: string;
  };
} */

export interface DeleteAlertParams {
  alertId: string;
}

export interface DeleteAlertsParams {
  alertsIds: string[];
}
