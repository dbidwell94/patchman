import { invoke } from "@tauri-apps/api/tauri";
import { IRequestContext } from "@/hooks/useRequestBody";

export interface IResponse {
  status: number;
  headers: Record<string, string>;
  body: string | null;
  url: string;
}

export interface IRequestError {
  status: number | null;
  url: string | null;
}

export async function makeRequest(request: IRequestContext): Promise<IResponse> {
  try {
    return await invoke<IResponse>("make_request", { req: request });
  } catch (err: any) {
    if (err.status || err.url) {
      return { body: null, headers: {}, url: err.url || "", status: err.status || 500 };
    }
    throw err;
  }
}
