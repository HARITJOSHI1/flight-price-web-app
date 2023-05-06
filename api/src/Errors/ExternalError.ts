import {
  isOfTypeAmadeusDetailError,
  isOfTypeAmadeusSystemError,
} from "../utils/getters/getData";

export default class ExternalError<T> {
  external = true;
  message: string | null = null;
  statusCode: number | null = null;
  
  constructor(public data: T) {
    if (isOfTypeAmadeusDetailError(data)) {
      this.message = data.errors[0].detail;
      this.statusCode = data.errors[0].status;
    } else if (isOfTypeAmadeusSystemError(data)) {
      this.message = data.errors[0].title;
      this.statusCode = data.errors[0].status;
    }
  }
}
