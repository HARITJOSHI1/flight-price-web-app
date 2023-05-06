import { Issue } from "../types/res/AmadeusResponses";

export default class ExternalErrorHandler<T> {
  external= true;
  message: string | null = null;
  constructor(public data: T) {
    if(this.isOfTypeIssue(data)) this.message = data.title;
  }

  // Type guard for Issue type
  private isOfTypeIssue = (err: unknown): err is Issue => {
    if(err && typeof err === 'object' && 'source' in err) return true;
    return false;
  }
}
