import DataLoader from "dataloader";

export const createFindDataLoader = (Model) => {
  const loader = new DataLoader(async (keys) => {
    // IMPORTANT: DISABLE CACHING.
    loader.clearAll();

    const idMap = {};
    for (let idx = 0; idx < keys.length; ++idx) {
      const key = keys[idx];

      if (!(key in idMap)) {
        idMap[key] = [];
      }
      idMap[key].push(idx);
    }

    const items = await Model.find({
      _id: { $in: keys },
    });

    const result = Array(keys.length);
    for (const item of items) {
      const indexes = idMap[item._id];
      for (const idx of indexes) {
        result[idx] = item;
      }
    }

    return result;
  });

  return loader;
};
