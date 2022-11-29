export default function enumToArray(e: object): string[] {
    const enumArr = Object.keys(e).filter((v) =>
    isNaN(Number(v))
  );
  return enumArr
}