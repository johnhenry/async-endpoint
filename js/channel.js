//     
export default (limit         = Infinity) => {
  let releaseRequest           = () => {};
  let releaseResponse           = () => {};
  //Calling request will return a new promise that's primed to resolve with the arguments of respond when next called
  const request = (debug      = undefined)             => {
    let lastAnswer     ;
    if (limit < 1) {
      return Promise.resolve(lastAnswer);
    }
    limit--;
    setTimeout(releaseResponse);
    const returnPromise = new Promise((outerResolve          )           => {
      releaseRequest = (answer     )             => {
        const returnPromiseB = new Promise(innerResolve => {
          let lastAnswer = answer;
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

//# sourceMappingURL=channel.js.map
