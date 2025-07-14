/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Card from "@mui/joy/Card";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import { useEffect } from "react";

import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import Button from "@mui/joy/Button";

export default function DropZone(props) {
  const { icon, sx, imgSrc, handleFileChange, imagePreview, setImagePreview, isCircular, setUsingDefaultImage, ...other } = props;

  useEffect(() => {
    if (imgSrc) {
      setImagePreview(imgSrc);
    }
  }, [imgSrc]);

  return (
    <>
      <Card
        variant="soft"
        {...other}
        sx={[
          {
            borderRadius: "sm",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
            px: 3,
            flexGrow: 1,
            boxShadow: "none",
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <AspectRatio
          ratio="1"
          variant="solid"
          color="primary"
          sx={{ minWidth: 32, borderRadius: "50%", "--Icon-fontSize": "16px" }}
        >
          <div>{icon ?? <FileUploadRoundedIcon />}</div>
        </AspectRatio>
        <Typography level="body-sm" sx={{ textAlign: "center" }}>
          <Link component="label" sx={{ cursor: "pointer" }}>
            Clica para carregar uma imagem {isCircular && " de perfil" }
            <input
              type="file"
              name="PICTURE"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }} 
            />
          </Link>{" "}
          <br /> SVG, PNG, JPG ou GIF (max. {isCircular ? "150" : "400"}px de altura)
        </Typography>
        {imagePreview && (
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: isCircular ? "150px" : "100%",
                height: isCircular ? "150px" : "auto",
                maxHeight: "400px",
                border: "1px solid #ccc",
                borderRadius: isCircular ? "50%" : "0",
                objectFit: "cover",
              }}
            />
            {isCircular && (
              <Button
                variant="outlined"
                color="primary"
                sx={{ marginTop: "10px" }}
                onClick={() => {
                  setImagePreview("http://localhost:5000/images/default-profile-picture.webp");
                  setUsingDefaultImage(true);
                }}
              >
                Usar Imagem Padrão
              </Button>
            )}
          </div>
        )}
      </Card>
    </>
  );
}
