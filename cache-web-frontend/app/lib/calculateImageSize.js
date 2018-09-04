export default function calculateImageSize(
  imageWidth, imageHeight, imageOrientation, containerWidth
) {
  let width = imageWidth;
  let height = imageHeight;

  if (imageWidth >= containerWidth) {
    width = containerWidth;

    if (imageOrientation === 'square') {
      height = containerWidth;
    } else {
      height = (imageHeight / imageWidth) * containerWidth;
    }
  }

  return { width, height };
}
