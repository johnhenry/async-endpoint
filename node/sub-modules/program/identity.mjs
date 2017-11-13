//     
import pause from "../pause";
export default async function*(
  delay        ,
  request          
)                                 {
  while (true) {
    await pause(delay);
    yield await request();
  }
}

//# sourceMappingURL=identity.js.map
