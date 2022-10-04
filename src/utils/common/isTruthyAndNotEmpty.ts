import isEmptyObject from "./isEmptyObject";

export default function isTruthyAndNotEmpty(el: any) {
  if (!el) return false;
  if (typeof el === "object" && isEmptyObject(el)) return false;
  return true;
}
