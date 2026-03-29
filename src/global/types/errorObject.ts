import { ERROR_CODE } from '../constant/errorCode.constant';

export interface ErrorObject {
  message: string;
  errorCode: ERROR_CODE;
}
