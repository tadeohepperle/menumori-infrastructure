import { promises, write, read, BaseEncodingOptions } from "fs";

export async function writeFile(
  filename: string,
  object: any,
  encoding?: BufferEncoding
) {
  if (!encoding) encoding = "utf-8";
  await promises.writeFile(filename, object, {
    flag: "w+",
    encoding: encoding,
  });
  return;
}

export async function readFile(filename: string, encoding?: BufferEncoding) {
  if (!encoding) encoding = "utf-8";
  const f = await promises.readFile(filename, encoding);
  return f;
}

export async function appendToFile(
  filename: string,
  object: any,
  encoding?: BufferEncoding
) {
  if (!encoding) encoding = "utf-8";
  const f = await promises.readFile(filename);
  await promises.writeFile(filename, f + object, encoding);
}

export async function appendToJSONFile(
  filename: string,
  object: any,
  encoding?: BufferEncoding
) {
  if (!encoding) encoding = "utf-8";
  let f: any = await promises.readFile(filename, { flag: "a+" });
  if (f.toString() == "") f = "[]";
  try {
    let arr = JSON.parse(f.toString());
    arr.push(object);
    await promises.writeFile(filename, JSON.stringify(arr), encoding);
  } catch (ex) {
    console.error(ex);
  }
}
