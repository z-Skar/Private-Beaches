import React, { useState } from "react";

const ImageUploader = ({ onImageSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgSrc = URL.createObjectURL(file);
      setPreview(imgSrc);
      onImageSelect(file); // Envia o ficheiro para o componente pai
    }
  };

  return (
    <div>
      <label>
        Escolher Imagem:
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      {preview && <img src={preview} alt="Pré-visualização" style={{ width: "200px", height: "200px" }} />}
    </div>
  );
};

export default ImageUploader;