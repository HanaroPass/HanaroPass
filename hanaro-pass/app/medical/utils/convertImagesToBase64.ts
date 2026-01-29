export type Base64Image = {
  name: string;
  type: string;
  base64: string | ArrayBuffer | null;
};

export async function convertImagesToBase64(
  images: File[],
): Promise<Base64Image[]> {
  return Promise.all(
    images
      .filter((image) => image && image.size > 0)
      .map(
        (image) =>
          new Promise<Base64Image>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                name: image.name,
                type: image.type,
                base64: reader.result,
              });
            };
            reader.readAsDataURL(image);
          }),
      ),
  );
}
