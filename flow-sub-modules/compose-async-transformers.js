//@flow
export default (current: Function, pre: Function = _ => _) => async (
  ...args: Array<any>
) => await current(await pre(...args));
