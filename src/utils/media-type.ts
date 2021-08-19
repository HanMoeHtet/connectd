export const isImage = (mediaType: string): boolean => {
  return mediaType.startsWith('image/');
};

export const isVideo = (mediaType: string): boolean => {
  return mediaType.startsWith('video/');
};
