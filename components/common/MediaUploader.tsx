import React from "react";
import { Box, Button, Backdrop, Snackbar, Alert } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useMutation } from "react-query";

import { useAppTheme, useTranslation, useMediaBreakpoints } from "../../hooks";
import { uploadMediaFile } from "../../services";
import { CircularProgressWithLabel, ArrayErrorStack } from ".";

const imageTypes = ["image/jpeg", "image/png", "image/webp"];
const videoTypes = [
  "video/mp4",
  "video/mpeg",
  "video/ogg",
  "video/webm",
  "video/3gpp",
  "video/3gpp2",
  "video/wmv",
  "video/avi",
];

const MediaUploader = ({ fileType = "image", setEntry }: any) => {
  const theme = useAppTheme();
  const t = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const { isMobile } = useMediaBreakpoints();
  const mutation = useMutation(uploadMediaFile, {
    onSuccess: (data) => setEntry(data.data),
    onError: (err) => {
      setIsOpen(true);
      setFile(null);
    },
  });

  const onUploadProgress = (event: any) => {
    const progress = (event.loaded / event.total) * 100;
    setProgress(Math.round(progress));
  };

  const onDrop = React.useCallback((acceptedFiles: any) => {
    setFile(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
    mutation.mutate({ file: acceptedFiles[0], onUploadProgress });
  }, []);
  const {
    getRootProps,
    getInputProps,
    fileRejections,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    maxSize: fileType === "image" ? 5242880 : 104857600,
    accept:
      fileType === "image"
        ? imageTypes
        : fileType === "video"
        ? videoTypes
        : "",
  });

  const baseStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: theme.palette.gray.main,
    borderStyle: "dashed",
    backgroundColor: theme.palette.secondary.main,
    color: "#bdbdbd",
    transition: "border .3s ease-in-out",
    height: 150,
    width: 150,
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#A4A4A4",
    },
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style: any = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const fileRejectionItems = fileRejections.map(({ file, errors }: any) => {
    return <ArrayErrorStack key={file.path} errors={errors} />;
  });

  // clean up
  React.useEffect(
    () => () => {
      URL.revokeObjectURL((file as any)?.preview);
    },
    [file]
  );

  return (
    <>
      <Backdrop open={mutation.isLoading}>
        <CircularProgressWithLabel value={progress} />
      </Backdrop>
      <Snackbar open={isOpen} onClose={() => setIsOpen(false)}>
        <Alert severity="error">{t?.upload_failed}</Alert>
      </Snackbar>
      {fileRejectionItems}
      <Box {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {file === null && (
          <>
            <Button>{t.browse}</Button>
          </>
        )}
        <Box component="aside" overflow={"hidden"}>
          {file !== null &&
            (fileType === "image" ? (
              <img
                src={(file as any)?.preview ? (file as any).preview : file}
                alt="image"
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight:"100%",
                  maxWidth:"100%",
                  borderRadius: 10,
                }}
              />
            ) : fileType === "video" ? (
              <video
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                }}
              >
                <source
                  src={(file as any)?.preview ? (file as any).preview : file}
                />
              </video>
            ) : null)}
        </Box>
      </Box>
    </>
  );
};

export default MediaUploader;
