//     
export default (
  iterator                  ,
  reducer          ,
  initial     ,
  condition           = () => false,
  resetInitial           = () => initial
) => {
  const newGenerator = async function*()                                 {
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

//# sourceMappingURL=reduce.js.map
