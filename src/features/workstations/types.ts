export interface DeleteWorkstationProps {
  reallocatedWorkstations: {
    name: string;
    id: string;
    destination: string;
  }[];
}
