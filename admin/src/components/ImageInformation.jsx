import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = ({ getInputProps }) => {
  return (
    <div className="w-full h-72 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 bg-gray-50 hover:border-orange-500 hover:bg-blue-50 transition-colors cursor-pointer">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="mt-4 text-gray-600">Drag and drop your images here</p>
      <p className="text-gray-400 text-sm mb-4">or</p>
      <button
        type="button"
        className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
      >
        Choose File
      </button>
      <input
        {...getInputProps()}
        id="product-images"
        multiple={false}
        className="hidden"
      />
    </div>
  );
};

export function ImageInformation({ handleImageChange, product, handleChange }) {
  const [file, setFiles] = useState(product.images || []);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      const filesWithPreview = acceptedFiles.map((file) => {
        file.preview = URL.createObjectURL(file);
        return file;
      });
      setFiles(filesWithPreview);
      if (handleImageChange) {
        handleImageChange(filesWithPreview);
      }
    },
  });

  useEffect(() => {
    setFiles(product.images || []);
  }, [product.images]);

  return (
    <div className="min-h-screen rounded-2xl bg-gray-100 p-2">
      <div className="max-w-7xl mx-auto">
        <div {...getRootProps({ className: "md:col-span-3 mb-5" })}>
          <div className="bg-white p-6 rounded-xl shadow-md w-full">
            {file && file.length !== 0 ? (
              file.map((fileItem) => (
                <img
                  className="w-auto h-full rounded-md"
                  key={fileItem.name}
                  src={fileItem.preview}
                  alt={fileItem.name}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
              ))
            ) : (
              <ImageUploader getInputProps={getInputProps} />
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Category
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p>Category</p>
                <input
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full rounded-md bg-gray-200 py-2 my-2 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
                  type="text"
                  placeholder="Enter product category"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Sub-category</p>
                <input
                  name="subCategory"
                  value={product.subCategory}
                  onChange={handleChange}
                  className="w-full rounded-md bg-gray-200 py-2 my-2 px-3 outline-none border-0 focus:border-2 focus:border-gray-400"
                  type="text"
                  placeholder="Enter sub-category"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
