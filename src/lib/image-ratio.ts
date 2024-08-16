export interface Size {
  width: number;
  height: number;
}

export const getScaledImage = (canvasSize: Size, imageSize: Size) => {
  const widthRatio = canvasSize.width / Math.max(1, imageSize.width);
  const heightRatio = canvasSize.height / Math.max(1, imageSize.height);

  const minRatio = Math.min(widthRatio, heightRatio);
  const width = imageSize.width * minRatio;
  const height = imageSize.height * minRatio;

  return { width, height };
};
