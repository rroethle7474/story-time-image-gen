// going to use replicate, black-forest-labes/flux-1.1-pro to generate image https://replicate.com/black-forest-labs/flux-1.1-pro
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
})


export async function generateImage(prompt, options) {
    const input = {
        prompt: prompt,
        aspect_ratio: options.aspect_ration || "1:1",
        output_format: options.format || "webp",
        output_quality: options.quality || 80,
        safety_tolerance: 2,
        prompt_upsampling: true
      };
      
      const output = await replicate.run("black-forest-labs/flux-schnell", { input }); // using the schnell model for faster generation
      console.log(output);
      const outputStream = output[0]; // this will be different for different models, this will have a number of streams.
      const imageBlob = await outputStream.blob(); // this will return the image in the format of the blob. like png, jpg, webp, etc.
      const imageBuffer = await imageBlob.arrayBuffer(); 
      const image = Buffer.from(imageBuffer);
      return {image, format: imageBlob.type}    // this will return the image in the format of the blob. like png, jpg, webp, etc.
}

export default generateImage;