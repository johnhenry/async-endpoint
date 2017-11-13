//@flow
import pause from "../pause";
export default async function*(
  delay: number,
  request: Function
): AsyncGenerator<any, void, any> {
  while (true) {
    await pause(delay);
    yield await request();
  }
}
