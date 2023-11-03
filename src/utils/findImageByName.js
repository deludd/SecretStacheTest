import { getImage } from 'gatsby-plugin-image';

export const findImageByName = (name, imagesData) => {
  const fileNode = imagesData.find((node) => node.name === name);
  return fileNode ? getImage(fileNode) : null;
};
