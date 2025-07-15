import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

export const FileUpload = () => {
  const handleChange = (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    fetch("http://localhost:5191/api/Upload/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((error) => `failed to fetch: ${error}`);
  };

  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
};
