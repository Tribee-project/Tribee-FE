export interface TravelDay {
  label: string;
  value: number;
}

export interface NotificationConfig {
  message: string;
  description: React.ReactNode;
  placement:
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight';
  style?: React.CSSProperties;
}
