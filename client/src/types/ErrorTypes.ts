
export interface FlightApiError {
  error: AmadeusError | string;
}

export interface AmadeusError {
  errors: Error2[];
}

export interface Error2 {
  status: number;
  code: number;
  title: string;
  detail: string;
  source: Source;
}

export interface Source {}
