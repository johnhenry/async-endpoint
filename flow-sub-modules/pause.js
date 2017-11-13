//@flow
export default (
  milliseconds: number = 0,
  value: any = undefined
): Promise<any> =>
  new Promise(resolve => setTimeout(() => resolve(value), milliseconds));
