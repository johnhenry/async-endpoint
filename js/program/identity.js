//     
import pause from "../pause.js";
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
