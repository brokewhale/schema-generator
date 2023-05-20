export function combineObjects(
  obj1: string,
  obj2: string,
  obj3: string
): string {
  const parsedObj1 = JSON.parse(obj1) as object;
  const parsedObj2 = JSON.parse(obj2) as object;
  const parsedObj3 = JSON.parse(obj3) as object;

  const combinedObject = {
    ...parsedObj1,
    ...parsedObj2,
    ...parsedObj3,
  } as unknown;

  return JSON.stringify(combinedObject);
}
