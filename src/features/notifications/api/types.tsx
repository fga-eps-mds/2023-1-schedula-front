export interface Notification {
  id: string;
  sourceName: string;
  targetName: string;
  targetEmail: string;
  message: string;
  status: string;
  pendency: string;
  read: boolean;
  createdAt: Date;
}

export interface PutUpdateNotificationsParams {
  notificationId: string;
  data: {
    status: string;
    pendency: string;
    read: boolean;
  };
}

export interface PutUpdateNotificationsResponse {
  id: string;
  sourceName: string;
  targetName: string;
  targetEmail: string;
  message: string;
  status: string;
  pendency: string;
  read: boolean;
  createdAt: Date;
}
