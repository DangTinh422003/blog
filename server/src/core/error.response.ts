import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export class ErrorResponse extends CustomError {
  constructor(message: string, status: number) {
    super(message, status);
  }
}

export class ConflictError extends ErrorResponse {
  constructor(message: string = getReasonPhrase(StatusCodes.CONFLICT)) {
    super(message, StatusCodes.CONFLICT);
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(message: string = getReasonPhrase(StatusCodes.NOT_FOUND)) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(message: string = getReasonPhrase(StatusCodes.BAD_REQUEST)) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class UnauthorizedError extends ErrorResponse {
  constructor(message: string = getReasonPhrase(StatusCodes.UNAUTHORIZED)) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor(message: string = getReasonPhrase(StatusCodes.FORBIDDEN)) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

export class InternalServerError extends ErrorResponse {
  constructor(
    message: string = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
  ) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export class NotImplemented extends ErrorResponse {
  constructor(message: string = getReasonPhrase(StatusCodes.NOT_IMPLEMENTED)) {
    super(message, StatusCodes.NOT_IMPLEMENTED);
  }
}

export class GoneError extends ErrorResponse {
  constructor(message: string = getReasonPhrase(StatusCodes.GONE)) {
    super(message, StatusCodes.GONE);
  }
}
