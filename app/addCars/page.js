"use client";

import { Suspense, useEffect, useState } from "react";
import { base_Url_local, fetchData, postData, updateData } from "../api/Constant";
import { Home, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function CarForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [images, setImages] = useState([]); 
  const [existingImages, setExistingImages] = useState([]); 
  const [Updateid, setUpdateId] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  useEffect(() => {
    if (editId) {
      setIsUpdating(true);
      setUpdateId(editId);
      fetchDataforEdit(editId);
    }
  }, [editId]);

  const fetchDataforEdit = async (id) => {
    try {
      const token = localStorage.getItem("user");
      const response = await fetchData(`${base_Url_local}get-cars?&token=${token}&carID=${id}`);
      if (response?.cars?.length) {
        const car = response.cars[0];
        setTitle(car?.title || "");
        setDescription(car?.description || "");
        setTags(car?.tags || "");
        setExistingImages(car?.images || []);
      }
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    if (images.length + selectedFiles.length + existingImages.length > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleAddCar = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);

    images.forEach((file) => {
      formData.append("photos", file);
    });

    if (isUpdating) {
      formData.append("existingImages", JSON.stringify(existingImages));
    }

    try {
      let response;
      const token = localStorage.getItem("user");
      if (isUpdating && Updateid) {
        response = await updateData(`${base_Url_local}update-car?token=${token}&carID=${Updateid}`, formData);
        alert("Data Updated Successfully");
      } else {
        response = await postData(`${base_Url_local}add-car?token=${token}`, formData);
        alert("Car Added Successfully");
      }

      router.push("/dashboard");
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  const handleRemoveImage = (index, isExisting = false) => {
    if (isExisting) {
      setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
    } else {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };

  return (
    <div>
      <div className="m-10 flex gap-5 cursor-pointer" onClick={() => router.push("/dashboard")}>
        <Home className="text-2xl" /> Home
      </div>
      <form 
        className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md" 
        onSubmit={handleAddCar}
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-semibold mb-4">
          {isUpdating ? "Update Car" : "Add New Car"}
        </h2>

        <label className="block text-sm font-medium mb-2">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full text-black p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block text-sm font-medium mb-2">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 text-black border border-gray-300 rounded mb-4"
        />

        <label className="block text-sm font-medium mb-2">
          Tags (comma-separated):
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 text-black border border-gray-300 rounded mb-4"
        />

        <label className="block text-sm font-medium mb-2">
          Upload Images (max 10):
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          disabled={images?.length + existingImages?.length >= 10}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 mb-4"
        />

        {existingImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {existingImages.map((url, index) => (
              <div key={`existing-${index}`} className="relative">
                <img src={url} alt={`Existing Image ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index, true)}
                  className="absolute top-0 right-0 bg-gray-500 text-white rounded-full p-1 hover:bg-gray-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {images.map((file, index) => (
              <div key={`new-${index}`} className="relative">
                <img src={URL.createObjectURL(file)} alt={`New Image ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-gray-500 text-white rounded-full p-1 hover:bg-gray-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="mt-6 w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
          {isUpdating ? "Update Car" : "Add Car"}
        </button>
      </form>
    </div>
  );
}

export default function CreateCar() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarForm />
    </Suspense>
  );
}
