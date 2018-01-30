//@flow
export default (iterator: AsyncIterator<*>, handler: Function) => {
  const newGenerator = async function*(): AsyncGenerator<any, void, any> {
    for await (const item of iterator) {
      await handler(item);
    }
  };
  return newGenerator();
};
