import { Rettiwt } from "rettiwt-api";

const key = process.env.API_KEY ?? "";

export const rwt = new Rettiwt(key);
