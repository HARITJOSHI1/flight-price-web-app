export interface DetailError {
  errors: Details[];
}

export interface Details extends GenericError {
  detail: string;
  source: Source;
}

export interface Source {
  parameter: string;
  example: string;
}

export interface SystemError {
  errors: GenericError[];
}

export interface GenericError {
  status: number;
  code: number;
  title: string;
}
