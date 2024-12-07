export class ErrorResponse extends Error {
  public statusCode: number;
  constructor({
    message,
    statusCode,
  }: {
    message: string;
    statusCode: number;
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export type BaseResponse<TData> = {
  status: number;
} & (
  | {
      success: true;
      data: TData;
    }
  | {
      success: false;
      error: string;
    }
);

export class ApiResponse<TData> {
  private data: TData | { error: string };
  private status: number;
  private success: boolean;

  constructor(props: {
    data: TData | Record<'error', string>;
    status: number;
    success: boolean;
  }) {
    this.data = props.data;
    this.status = props.status;
    this.success = props.success;
  }

  getResponse(): BaseResponse<TData> {
    if (!this.success) {
      return {
        status: this.status,
        success: false,
        error: (this.data as Record<'error', string>).error,
      };
    }

    return {
      data: this.data as TData,
      status: this.status,
      success: true,
    };
  }
}
