import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "1MB",
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("Tải lên hoàn tất:", file.ufsUrl);
    return { url: file.ufsUrl };
  }),
};
