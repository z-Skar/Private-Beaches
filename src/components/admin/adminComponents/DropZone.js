/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react"
import Card from "@mui/joy/Card"
import Link from "@mui/joy/Link"
import Typography from "@mui/joy/Typography"
import AspectRatio from "@mui/joy/AspectRatio"
import { useState, useEffect } from "react"

import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded"
import Button from "@mui/joy/Button"

export default function DropZone(props) {
<<<<<<< HEAD
  const { icon, sx, imgSrc, handleImageChange, ...other } = props
=======
  const { icon, sx, imgSrc, handleFileChange, imagePreview, setImagePreview, ...other } = props
>>>>>>> 2bb6295f744d936d33455b932ad850b603fae928

  useEffect(()=> {
    if(imgSrc) {
      setImagePreview(imgSrc);
    }
<<<<<<< HEAD
  }, [imgSrc]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Carrega a imagem como uma URL base64
        console.log(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

=======
  }, [imgSrc])
>>>>>>> 2bb6295f744d936d33455b932ad850b603fae928
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
            boxShadow: "none"
          },
          ...(Array.isArray(sx) ? sx : [sx])
        ]}
      >
<<<<<<< HEAD
        <div>{icon ?? <FileUploadRoundedIcon />}</div>
      </AspectRatio>
      <Typography level="body-sm" sx={{ textAlign: "center" }}>
        <Link component="label" sx={{ cursor: "pointer" }}>
          Clica para carregar uma imagem
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            name="beachImage"
          />
        </Link>{" "}
        <br /> SVG, PNG, JPG ou GIF (max. 400px de altura)
      </Typography>
      {imagePreview && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={imagePreview}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "400px", border: "1px solid #ccc", display: 'block', margin: '0 auto'}}
          />
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            onClick={() => setImagePreview(imgSrc)}
            sx={{
              marginTop: 2,
              '&:hover': {
                backgroundColor: '#e2e8f0 !important',
                transition: 'background-color 300ms !important'
              }
            }}
          >
            Repor imagem
          </Button>
        </div>
      )}
    </Card>
=======
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
            Clica para carregar uma imagem
            <input
              type="file"
              name="beachImage"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Link>{" "}
          <br /> SVG, PNG, JPG ou GIF (max. 400px de altura)
        </Typography>
        {imagePreview && (
          <div style={{ marginTop: "20px" }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "400px", border: "1px solid #ccc", display: 'block', margin: '0 auto'}}
            />
            { imgSrc && (
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => setImagePreview(imgSrc)}
                sx={{
                  marginTop: 2,
                  '&:hover': {
                    backgroundColor: '#e2e8f0 !important',
                    transition: 'background-color 300ms !important'
                  }
                }}
              >
                Repor imagem
              </Button>)
            }
          </div>
        )}
      </Card>
>>>>>>> 2bb6295f744d936d33455b932ad850b603fae928
    </>
  );
};
