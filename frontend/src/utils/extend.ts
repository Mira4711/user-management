//
import type { KeyValue, Right, Role, User } from "../interfaces/interfaces";


// TODO: refectoren... Functionen fast identisch...
export function extendRoleData(target: Role[], source: Right[]):Role[] {
  target.forEach((item) => {
    const filteredRights: string[] = item.rights?.filter((uuid) => {
      return source.some((item) => item.uuid === uuid);
    })!;
    item.readable = filteredRights.map((uuid) =>
      source.find((r) => r.uuid == uuid)
    ) as KeyValue[];
  });
  return target;
}

export function extendUserData(target: User[], source: Right[]):User[] {
  target.forEach((item) => {
    const filteredRights: string[] = item.roles?.filter((uuid) => {
      return source.some((item) => item.uuid === uuid);
    })!;
    item.readable = filteredRights.map((uuid) =>
      source.find((r) => r.uuid == uuid)
    ) as KeyValue[];
  });
  return target;
}
