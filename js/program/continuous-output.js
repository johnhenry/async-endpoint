//     
export default async function*(
  sample          
)                                 {
  while (true) {
    yield await sample();
  }
}

//# sourceMappingURL=continuous-output.js.map
