/** @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import tw from "twin.macro";
import setCanvasPreview from "../../setCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const Label = tw.label`block mb-3`;
const Input = tw.input`block w-full text-sm text-[rgb(100 116 139)] file:mr-4 file:py-[0.5rem] file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-600 file:text-[color: rgb(125 211 252)] hover:file:bg-gray-700`;
const ErrorMessage = tw.p`text-red-400 text-xs`;
const Container = tw.div`flex flex-col items-center`;
const Button = tw.button`text-white text-xs py-2 px-4 rounded-2xl mt-4 bg-[color: rgb(56 166 220)]`;
const Canvas = tw.canvas`mt-4 hidden border border-black object-contain w-[150px] h-[150px]`;

const ImageCropper = ({ closeModal, updateAvatar, setSelectedFile }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("A imagem tem de ter no minímo 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <Label>
        <span className="sr-only">Escolhe a foto de perfil </span>
        <Input
          type="file"
          name="PICTURE"
          accept="image/*"
          onChange={onSelectFile}
        />
      </Label>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {imgSrc && (
        <Container>
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <Button
            onClick={() => {
              setCanvasPreview(
                imgRef.current, // HTMLImageElement
                previewCanvasRef.current, // HTMLCanvasElement
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const dataUrl = previewCanvasRef.current.toDataURL();

              fetch(dataUrl).then((res) => res.blob()).then((blob) => {
                const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
                setSelectedFile(file);
              });
              updateAvatar(dataUrl);
              closeModal();
            }}
          >
            Confirmar Imagem
          </Button>
        </Container>
      )}
      {crop && (
        <Canvas
          ref={previewCanvasRef}
        />
      )}
    </>
  );
};

export default ImageCropper;