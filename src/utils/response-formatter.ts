import type { Response } from "express";

class ResponseFormatter {
  public format(
    res: Response,
    data: unknown,
    code: number,
    message: string,
    status: string
  ) {
    return res.status(code).json({
      meta: {
        code: code,
        message,
        status,
      },
      data,
    });
  }

  public success(
    res: Response,
    data: unknown,
    message = "Success",
    code = 200
  ) {
    return this.format(res, data, code, message, "success");
  }

  public error(res: Response, data: unknown, message = "Error", code = 500) {
    return this.format(res, data, code, message, "error");
  }

  public notFound(
    res: Response,
    data: unknown,
    message = "Not Found",
    code = 404
  ) {
    return this.format(res, data, code, message, "not found");
  }

  public badRequest(
    res: Response,
    data: unknown,
    message = "Bad Request",
    code = 400
  ) {
    return this.format(res, data, code, message, "bad request");
  }

  public unauthorized(
    res: Response,
    data: unknown,
    message = "Unauthorized",
    code = 401
  ) {
    return this.format(res, data, code, message, "unauthorized");
  }

  public forbidden(
    res: Response,
    data: unknown,
    message = "Forbidden",
    code = 403
  ) {
    return this.format(res, data, code, message, "forbidden");
  }

  public conflict(
    res: Response,
    data: unknown,
    message = "Conflict",
    code = 409
  ) {
    return this.format(res, data, code, message, "conflict");
  }
}

export default new ResponseFormatter();
