//     
export default (
  milliseconds         = 0,
  value      = undefined
)               =>
  new Promise(resolve => setTimeout(() => resolve(value), milliseconds));

//# sourceMappingURL=pause.js.map
