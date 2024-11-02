//
export type Json =
  | boolean
  | number
  | string
  | null
  | { [key: string]: Json }
  | Array<Json>;

export type KeyValue = { [key: string]: string };

export type User = {
  uuid: string;
  fname?: string;
  name: string;
  mail: string;
  phone?: string;
  roles?: string[];
  readable?: KeyValue[];
};

export type Role = {
  uuid: string;
  name: string;
  rights?: string[];
  readable?: KeyValue[];
};

export type Right = {
  uuid: string;
  name: string;
};

export type ResData = {
  message: string;
  list: Json;
};
