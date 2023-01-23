const WIDTH = 800;

// CONVERT FILES IMAGES LIST TO COMPRESSED BASE 64
export default async function imagesToCompressedBase64(
  files: FileList
): Promise<string[]> {
  return new Promise((resolve) => {
    let images_file = files;
    let images_compressed: string[] = [];

    for (let key in images_file) {
      let image_file = images_file[key];
      if (!image_file.lastModified) break; // CHECK IF IS A FILE

      let reader = new FileReader();
      reader.readAsDataURL(image_file);

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (!e.target) return;
        let image_url = e.target.result as string;
        let image: HTMLImageElement = document.createElement("img");

        image.src = image_url;

        image.onload = () => {
          let canvas = document.createElement("canvas");
          let ratio = WIDTH / image.width;
          canvas.width = WIDTH;
          canvas.height = image.height * ratio;
          const context = canvas.getContext("2d")!;

          context.drawImage(image, 0, 0, canvas.width, canvas.height);

          let new_images_url = context.canvas.toDataURL("image/jpeg", 0.5);
          images_compressed.push(new_images_url);

          if (+key + 1 === images_file.length) resolve(images_compressed);
        };
      };
    }
  });
}
