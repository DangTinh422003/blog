import { StatusCodes } from 'http-status-codes';

export class SuccessResponse<T> {
  constructor(
    public message: string,
    public status: number,
    public data?: T,
  ) {
    this.message = message;
    this.status = status;
    this.data = data;
  }
}

export class OkResponse<T> extends SuccessResponse<T> {
  constructor(message: string, data?: T) {
    super(message, StatusCodes.OK, data);
  }
}

export class CreatedResponse<T> extends SuccessResponse<T> {
  constructor(message: string, data?: T) {
    super(message, StatusCodes.CREATED, data);
  }
}

export class AcceptedResponse<T> extends SuccessResponse<T> {
  constructor(message: string, data?: T) {
    super(message, StatusCodes.ACCEPTED, data);
  }
}

export class NoContentResponse<T> extends SuccessResponse<T> {
  constructor(message: string) {
    super(message, StatusCodes.NO_CONTENT);
  }
}
