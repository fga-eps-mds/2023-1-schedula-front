export interface Notification {
  id: string;
  sourceEmail: string;
  sourceName: string;
  targetName: string;
  targetEmail: string;
  message: string;
  status: string;
  pendency: string;
  read: boolean;
  createdAt: Date;
}

export interface NotificationPayLoad {
  sourceName: string;
  sourceEmail: string;
  targetName: string;
  targetEmail: string;
  message: string;
  status: string;
  pendency: string;
  read: boolean;
  createdAt: Date;
}
