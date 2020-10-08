export function objectToQueryString(queryObject: any) {
  if (typeof queryObject != "object") return "";
  let queryString = Object.keys(queryObject)
    .map((key) => {
      if (typeof key === "string") {
        return (
          encodeURIComponent(key) +
          "=" +
          encodeURIComponent(queryObject[key].toString())
        );
      }
    })
    .join("&");

  return queryString ? "?" + queryString : "";
}

export function randomizeTime(ug: number, og: number) {
  return Math.random() * (og - ug) + ug;
}

export async function waitPromise(t: number) {
  return new Promise((res, rej) => {
    setTimeout(() => res(), t);
  });
}

export async function waitPromiseRandomizeTime(ug: number, og: number) {
  await waitPromise(randomizeTime(ug, og));
}

export function getUserID(session: any): number {
  let cookies = JSON.parse(session.cookies).cookies;
  let ds_user_id = cookies.filter((el: any) => el.key == "ds_user_id")[0]
    ?.value;
  return ds_user_id;
}
