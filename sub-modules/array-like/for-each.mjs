//
export default async (iterator, handler) => {
  for await (const item of iterator) {
    await handler(item);
  }
};

//# sourceMappingURL=for-each.js.map
