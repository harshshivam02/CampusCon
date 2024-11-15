import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // Handle image upload and convert to base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Store base64 string of the image
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Submit form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = { title, description, image };
      const response = await axios.post("http://localhost:3000/api/post/create", postData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials if needed
      });

      if (response.data.success) {
        alert("Post created successfully!");
        setTitle("");
        setDescription("");
        setImage(null);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
