//@flow
export default (limit: number = Infinity) => {
  console.warn(
    `Deprecaration warning: "channel" to be replaced with "async-array"`
  );
  let releaseRequest: Function = () => {};
  let releaseResponse: Function = () => {};
  //Calling request will return a new promise that's primed to resolve with the arguments of respond when next called
  const request = (debug: any = undefined): Promise<*> => {
    let lastAnswer: any;
    if (limit < 1) {
      return Promise.resolve(lastAnswer);
    }
    limit--;
    setTimeout(releaseResponse);
    const returnPromise = new Promise((outerResolve: Function): Function => {
      releaseRequest = (answer: any): Promise<*> => {
        const returnPromiseB = new Promise(innerResolve => {
          lastAnswer = answer;
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
  const respond = (answer: any) => releaseRequest(answer);
  return [request, respond];
};
