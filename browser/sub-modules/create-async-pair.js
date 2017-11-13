//     
export default () => {
  let releaseRequest           = () => {};
  let releaseResponse           = () => {};
  //Calling request will return a new promise that's primed to resolve with the arguments of respond when next called
  const request = (debug      = undefined)             => {
    setTimeout(releaseResponse);
    const returnPromise = new Promise((outerResolve          )           => {
      releaseRequest = (answer     )             => {
        const returnPromiseB = new Promise(innerResolve => {
          outerResolve(answer);
          releaseResponse = () => innerResolve(debug);
          return releaseResponse;
        });
        return returnPromiseB;
      };
      return releaseRequest;
    });
    return returnPromise;
  };
  //Calling respond will resolve the promise most recently created by calling request.
  //It returns a promise that will be resolved after the next call to request creates a new promise.
  const respond = (answer     ) => releaseRequest(answer);
  return [request, respond];
};

//# sourceMappingURL=create-async-pair.js.map
