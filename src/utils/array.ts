export const unique = <T>(array: T[]) => Array.from(new Set(array));

export const zip = <T, K>(arrayA: T[], arrayB: K[]) => {
  const zippedArrayLength = Math.max(arrayA.length, arrayB.length);

  const emptyZippedArray = Array(zippedArrayLength);

  const zippedArray = Array.from(emptyZippedArray, (_, index) => [
    arrayA[index],
    arrayB[index]
  ]);

  return zippedArray;
};
