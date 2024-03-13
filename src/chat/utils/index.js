export * from "./options";

export function formatNumber(n) {
  return n < 10 ? `0${n}` : n;
}

export function dateFormat(ms) {
  const date = new Date(parseInt(ms));

  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = formatNumber(month);
  day = formatNumber(day);

  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  hour = formatNumber(hour);
  minute = formatNumber(minute);
  second = formatNumber(second);

  return [[year, month, day].join("/"), [hour, minute, second].join(":")].join(
    " "
  );
}

export async function sha256Digest(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}
