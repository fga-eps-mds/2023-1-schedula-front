export interface Alert {
  id: string;
  sourceName: string;
  targetName: string;
  sourceEmail: string;
  targetEmail: string;
  message: string;
  status: string;
  pendency: string;
  read: boolean;
  createdAt: Date;
}

export interface AlertPayload {
  target: {
    label: string;
    value: string;
  };
  message: string;
}
