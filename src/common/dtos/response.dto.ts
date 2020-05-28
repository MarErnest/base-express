import { ValidationError } from "class-validator";

export class IResponse {

  status: boolean;

  validationErrors?: ValidationError[];

  serverErrors?: any;

  message?: string;

  data?: any;

}
