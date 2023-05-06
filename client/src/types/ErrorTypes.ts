export interface FlightApiError {
  error: Error[];
}

export interface Error {
  status: number;
  code: number;
  title: string;
  detail?: string;
  source?: Source;
}

export interface Source {
  parameter: string;
  example: string;
}
