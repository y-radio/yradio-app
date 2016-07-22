export const searchPlaylist = (searchTerm) => {
  // TODO: map to actual API endpoint
  return new Promise((resolve, reject) => {
    resolve(Array(40).fill(1).map((value, index) => {
      return {
        id: `${searchTerm} ${index}`,
        name: `${searchTerm} ${index}`,
        universalLink: 'spotify:user:spotify_canada:playlist:3icDby4uL1HLPvnyOaD3df',
        webLink: 'https://open.spotify.com/user/spotify_canada/playlist/3icDby4uL1HLPvnyOaD3df',
      };
    }));
  });
};
