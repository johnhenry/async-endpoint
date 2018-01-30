//     
export default (iterator                  , mapper          ) => {
  const newGenerator = async function*()                                 {
    for await (const item of iterator) {
      yield await mapper(item);
    }
  };
  return newGenerator();
};

//# sourceMappingURL=map.js.map
