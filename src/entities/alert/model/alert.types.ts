export type Alert = {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: string;
};
