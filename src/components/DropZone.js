import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import getUrl from "../services/server-api";
import DownloadButton from "./DownloadButton/DownloadButton";

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#7FABC0';
}
const RightCard = styled.div`
  position: relative;
  align-self: center;
`
const Container = styled.div`
  background: linear-gradient(90deg, rgba(235,215,224,1) 0%, rgba(239,225,255,1) 100%);
  height: 200px;
  width: 400px;
  border: 3px dashed;
  border-radius: 20px;
  border-color: ${props => getColor(props)};
  outline: none;
  transition: border .24s ease-in-out;
  & p {
    font-family: Roboto;
    font-weight: 700;
    font-size: 20px;
    color: #1D749E;
    margin: 0;
    position: relative;
    transform: translateY(-50%);
    top: 50%;
    text-align: center;
  }
`;

function DropZone(props) {
  const [link, setLink] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    let downloadUrl = getUrl(acceptedFiles[0])
    downloadUrl.then(data => {
      setLink(data.url)
    })
  }, [])


  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: ".srt",
    multiple: false,
    onDrop
  });


  return (
    <RightCard>
      <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <p>DROP HERE</p>
      </Container>
      <DownloadButton url={link}/>
    </RightCard>
  );
}

export default DropZone
