//     
export default (...initial            ) => {
  const push = (item     ) => initial.push(item);
  const newGenerator = async function*()                                 {
    while (true) {
      if (initial.length) {
        yield await initial.pop();
      } else {
        // yield await ;
      }
    }
  };
  return [newGenerator(), push];
};

//# sourceMappingURL=create-stack.js.map
