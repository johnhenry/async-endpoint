//@flow
export default async function*(
  sample: Function
): AsyncGenerator<any, void, any> {
  while (true) {
    yield await sample();
  }
}
