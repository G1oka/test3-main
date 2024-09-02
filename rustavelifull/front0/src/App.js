import './App.css';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadForm from './ProductUpload'
function App() {
  return (
   <>
   <UploadForm></UploadForm>
   </>
  );
}

export default App;
