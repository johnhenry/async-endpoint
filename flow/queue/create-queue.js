//@flow
export default (...initial: Array<any>) => {
  const push = (item: any) => initial.push(item);
  const newGenerator = async function*(): AsyncGenerator<any, void, any> {
    while (true) {
      if (initial.length) {
        yield await initial.shift();
      } else {
        // yield await ;
      }
    }
  };
  return [newGenerator(), push];
};
