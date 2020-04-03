const pairwise = (arr, func) => {
  for (let i = 0; i < arr.length - 1; i++) {
    func(arr[i], arr[i + 1]);
  }
};

const busyToFree = (busySlots) => {
  const freeSlots = [];

  switch (busySlots.length) {
    case 0:
      freeSlots.push({start: "", end: ""});
      break;
    case 1:
      freeSlots.push({start: "", end: ""});
      break;
    default:
      pairwise(busySlots, (current, next) => {
        freeSlots.push({start: current.end, end: next.start});
      });
  }

  return freeSlots;
};

module.exports = {busyToFree, pairwise};
