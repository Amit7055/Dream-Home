import React from 'react'

export default function Image() {

    const UploadImageForProperty = ({ propertyId }) => {
        const [selectedFile, setSelectedFile] = useState(null);
        const [uploading, setUploading] = useState(false);
        const [message, setMessage] = useState('');
    
        const handleFileChange = (e) => {
            setSelectedFile(e.target.files[0]);
        };
    
        const handleUpload = async () => {
            if (!selectedFile) {
                setMessage('Please select a file to upload');
                return;
            }
    
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('propertyId', propertyId);
    
            setUploading(true);
            setMessage('');
    
            try {
                const response = await axios.post('http://localhost:9999/images/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setMessage('Image uploaded successfully');
            } catch (error) {
                setMessage('Failed to upload image');
            } finally {
                setUploading(false);
            }
        };

  return (
    <div>
    <input type="file" accept="image/*" onChange={handleFileChange} />
    <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
    </button>
    {message && <p>{message}</p>}
</div>
  )
}
