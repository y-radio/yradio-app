export const searchPlaylist = (searchTerm) => {
  // TODO: map to actual API endpoint
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.2) {
      reject('uh oh');
    } else {
      resolve(Array(40).fill(1).map((value, index) => {
        return {
          id: `${searchTerm} ${index}`,
          name: `${searchTerm} ${index}`,
        };
      }));
    }
  });
};
