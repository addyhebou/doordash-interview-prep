/**
 * Get cute dog pictures
 */
export const getDogs = async (length = 10) => {
  return fetch(`https://img.cdn4dd.com/s/managed/interview/tps-dogs/api.json`)
    .then((response) => response.json())
    .then((response: any) => {
      const dogs = [];
      response.data.children.forEach((c: any) => {
        const title = c.data.title;
        const url = c.data.preview?.images[0]?.resolutions[2]?.url;
        if (url) {
          dogs.push({ title: title, url: url.replaceAll('&amp;', '&') });
        }
      });
      return dogs.slice(0, length); // remove the extra dogs
    });
};
