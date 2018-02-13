//     
export default (iterator                  , filterer          ) => {
  const newGenerator = async function*()                                 {
    for await (const item of iterator) {
      if (await filterer(item)) {
        yield item;
      }
    }
  };
  return newGenerator();
};

//# sourceMappingURL=filter.js.map
