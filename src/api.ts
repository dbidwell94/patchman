import { invoke } from "@tauri-apps/api/tauri";
import { IRequestContext } from "@/hooks/useRequestBody";

export async function makeRequest(request: IRequestContext) {
  try {
    const result = await invoke("make_request", { req: request });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
