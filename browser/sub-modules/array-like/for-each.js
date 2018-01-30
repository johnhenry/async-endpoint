//     
export default (iterator                  , handler          ) => {
  const newGenerator = async function*()                                 {
    for await (const item of iterator) {
      await handler(item);
    }
  };
  return newGenerator();
};

//# sourceMappingURL=for-each.js.map
