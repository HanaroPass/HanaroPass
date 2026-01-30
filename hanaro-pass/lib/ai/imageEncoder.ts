export async function encodeImagesToOpenAIFormat(images: File[]) {
  return Promise.all(
    images
      .filter((image) => image && image.size > 0)
      .map(async (image) => {
        const buffer = Buffer.from(await image.arrayBuffer());
        const base64 = buffer.toString('base64');

        return {
          type: 'input_image' as const,
          image_url: `data:${image.type};base64,${base64}`,
          detail: 'auto' as const,
        };
      }),
  );
}
