//@flow
export default (
  iterator: AsyncIterator<*>,
  reducer: Function,
  initial: any,
  condition: Function = () => false,
  resetInitial: Function = () => initial
) => {
  const newGenerator = async function*(): AsyncGenerator<any, void, any> {
    for await (const item of iterator) {
      initial = await reducer(item, initial);
      if (condition(item, initial)) {
        yield initial;
        initial = resetInitial(item, initial);
      }
    }
  };
  return newGenerator();
};
