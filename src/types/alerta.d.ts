interface Alert {
  id: string;
  targetName: string;
  message: string;
}

interface AlertPayload {
  target: {
    label: string;
    value: string;
  };
  message: string;
}
