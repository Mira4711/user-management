//
import type { Json, ResData } from "../interfaces/interfaces";

const BASEURL: string = "http://localhost:3000/";

export const getBackendData = async (
  type: string,
  method: string = "GET",
  json?: Json
): Promise<ResData> => {
  // TODO: Fehlerbehandlung
  try {
    const body = JSON.stringify(json);
    const response = await fetch(BASEURL + type, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method,
      body,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // TODO: Fehler ausgeben
    return { message: "KO", list: [] };
  }
};

export async function loadAllData<T>(type: string): Promise<T> {
  // console.log("loadAllData:" + type);
  const res = await getBackendData(type);
  if (res.message == "OK") {
    return res.list as T;
  }
  return [] as T;
}

export async function deleteData<T>(type: string, uuid: string): Promise<T> {
  // console.log("deleteData");
  const res = await getBackendData(type + "/" + uuid, "DELETE");
  if (res.message == "OK") {
    return res.list as T;
  }
  return [] as T;
}

export async function addData<T>(type: string, data: Json): Promise<T> {
  // console.log("addData");
  const res = await getBackendData(type, "POST", data);
  if (res.message == "OK") {
    return res.list as T;
  }
  return [] as T;
}

export async function updateData<T>(
  type: string,
  uuid: string,
  data: Json
): Promise<T> {
  // console.log("updateData");
  const res = await getBackendData(type + "/" + uuid, "PUT", data);
  if (res.message == "OK") {
    return res.list as T;
  }
  return [] as T;
}
