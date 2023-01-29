export interface DeleteWorkstationProps {
  reallocatedWorkstations: {
    name: string;
    id: string;
    destination: {
      label: string;
      value: string;
    };
  }[];
}
