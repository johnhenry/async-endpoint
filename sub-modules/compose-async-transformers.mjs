//     
export default (current          , pre           = _ => _) => async (
  ...args            
) => await current(await pre(...args));

//# sourceMappingURL=compose-async-transformers.js.map
