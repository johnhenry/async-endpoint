//@flow
export default async (iterator: AsyncIterator<*>, handler: Function) => {
  for await (const item of iterator) {
    await handler(item);
  }
};
