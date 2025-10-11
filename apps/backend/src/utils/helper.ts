export function sanitizeObject(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item));
  } else if (obj !== null && typeof obj === "object") {
    const cleanObj: any = {};
    for (const key in obj) {
      if (["_id", "__v", "id"].includes(key)) continue; // skip unwanted keys
      cleanObj[key] = sanitizeObject(obj[key]);
    }
    return cleanObj;
  }
  return obj;
}
