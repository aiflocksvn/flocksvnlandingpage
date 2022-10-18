import React from "react";
import { Button, Grid, Box, styled, FormHelperText } from "@mui/material";
import { useMutation } from "react-query";

import { uploadMediaFile } from "../../services";
import { CircularProgressWithLabel, ErrorStack } from ".";
import { UploadSuccessIcon } from "../icons";

const Input = styled("input")({
  display: "none",
});

const imageTypes = ["image/jpeg", "image/png", "image/webp"];
const videoTypes = ["video/mp4", "video/mpeg", "video/ogg", "video/webm"];
const docTypes = [
  "application/x-abiword",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/rtf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "application/vnd.oasis.opendocument.spreadsheet",
];

const MediaUploader = (props: any) => {
  const [file, setFile] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [isUploaded, setIsUploaded] = React.useState(false);
  const [errors, setErrors] = React.useState({
    size: "",
    type: "",
  });
  const [serverErros, setServerErrors] = React.useState();

  const mutation = useMutation(uploadMediaFile, {
    onSuccess: (data) => props.setEntry(data.data),
  });

  const allowedFile = {
    size:
      props.fileType == "image" || props.fileType == "doc"
        ? 5242880
        : props.fileType == "video"
        ? 104857600
        : 0,
    types:
      props.fileType == "image"
        ? imageTypes
        : props.fileType == "video"
        ? videoTypes
        : props.fileType == "doc"
        ? docTypes
        : [],
  };

  React.useEffect(() => {
    props.setErrors({});
  }, []);

  const onUploadProgress = (event: any) => {
    const progress = (event.loaded / event.total) * 100;
    setProgress(Math.round(progress));
  };

  const handleUpload = (file: any) => {
    props.setErrors({});
    setFile(file && file);
    const size = file?.size;
    const type = file?.type;

    if (size > allowedFile.size) {
      props.setErrors((prev: any) => ({
        ...prev,
        size: "Invalid file size. The maximum file size can be: 5 MB",
      }));
    }
    if (allowedFile.types.indexOf(type) === -1) {
      props.setErrors((prev: any) => ({ ...prev, type: "Invalid file type" }));
    }

    if (!errors.size && !errors.type) {
      mutation.mutate(
        { file, onUploadProgress },
        {
          onSuccess: (data) => {
            props.setEntry(data.data);
            setIsUploaded(true);
            setProgress(0);
          },
          onError: (err: any) => {
            setServerErrors(err.response.data);
            setFile(null);
          },
        }
      );
    }
  };

  return (
    <Grid item md={6}>
      <label htmlFor={props.id} style={{ overflowWrap: "break-word" }}>
        <Input
          accept={allowedFile.types.join(",")}
          id={props.id}
          onChange={(event) => handleUpload((event as any).target.files[0])}
          type="file"
        />
        <Button
          variant="contained"
          component="span"
          disabled={mutation.isLoading}
          fullWidth
          sx={{
            height: 100,
            backgroundColor: "gray",
            color: "#000",
            outline: 1,
            outlineStyle: "dashed",
            outlineColor: "gray",
            "&:hover": {
              backgroundColor: "gray",
              color: "#000",
              outline: 1,
              outlineStyle: "dashed",
              outlineColor: "gray",
            },
          }}
        >
          {props.children ? (
            props.children
          ) : mutation.isLoading ? (
            <CircularProgressWithLabel value={progress} />
          ) : isUploaded ? (
            <UploadSuccessIcon />
          ) : (
            "Choose File"
          )}
        </Button>
      </label>
      {errors && errors.size && (
        <FormHelperText error>{errors.size}</FormHelperText>
      )}
      {errors && errors.type && (
        <FormHelperText error>{errors.type}</FormHelperText>
      )}
      {file && <FormHelperText>{(file as any).name}</FormHelperText>}
      {serverErros && (
        <FormHelperText error>{"Sorry,file upload failed"}</FormHelperText>
      )}
    </Grid>
  );
};

export default MediaUploader;
