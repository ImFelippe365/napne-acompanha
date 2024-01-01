type ValidExtensions = "jpg" | "png" | "jpeg" | "webp";
type ValidExtensionKey = "image";
const validFileExtensions = {
  image: ["jpg", "png", "jpeg", "webp"],
};

export const MAX_FILE_SIZE = 10240000; //10000KB

export const isValidFileType = (
  fileName: string,
  fileType: ValidExtensionKey = "image"
): boolean =>
  {
    console.log(fileName, fileType)
    return !!fileName &&
    validFileExtensions[fileType].indexOf(fileName?.split(".")?.pop() ?? "") > -1;
  }
