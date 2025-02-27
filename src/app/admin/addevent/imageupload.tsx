import React, { useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Button, Input } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useSnackbar } from '@/app/hooks/snackbar-service';
import axiosInterceptorInstance from '../../../../axiosInterceptorInstance';

interface ImageUploadPageProps {
  iD_Events: number | string;
  onClose: () => void;
}

const ImageUploadPage: React.FC<ImageUploadPageProps> = ({ iD_Events, onClose }) => {
  const { showMessage } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('Upload Image');

  const uploadFile = async (files: File) => {
    
    const eventID = String(iD_Events).trim();
    
    if (!eventID) {
      showMessage('Invalid Event ID. Please provide a valid event ID.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('file', files);

    setIsLoading(true);

    try {
      const response = await axiosInterceptorInstance.post('v1/imagesEvent', formData, {
        params: {
          iD_Events: eventID
        },
        headers: { 
          'Content-Type': 'multipart/form-data' 
        },
      });

      console.log('API Response:', response.data);

      const imageUrl = response?.data?.result?.responseID;
      if (imageUrl) {
        showMessage('Image uploaded successfully!', 'success');
        onClose();
      } else {
        showMessage('Image upload failed. No response ID received.', 'error');
      }
    } catch (error: any) {
      
      if (error.response) {
        console.error('Error Response Data:', error.response.data); 
        console.error('Error Response Status:', error.response.status);
        console.error('Error Response Headers:', error.response.headers);

  
        const errorMessage = error.response.data?.responseMessage || 
                             error.response.data?.message || 
                             'Unexpected error occurred on the server';
        
        showMessage(`Image upload failed: ${errorMessage}`, 'error');
      } else if (error.request) {
        console.error('Error Request:', error.request);
        showMessage('Image upload failed: No response from server. Please try again later.', 'error');
      } else {
        console.error('Error Message:', error.message);
        showMessage(`Image upload failed: ${error.message}`, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Selected File:', file);
      setFileName(file.name);
      uploadFile(file);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <label htmlFor="file-input">
            <Input
              id="file-input"
              type="file"
              sx={{ display: 'none' }}
              onChange={handleFileChange}
              disabled={isLoading}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<PhotoCamera />}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Uploading...
                </>
              ) : (
                fileName
              )}
            </Button>
          </label>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageUploadPage;