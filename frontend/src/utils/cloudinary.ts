export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  // Validate environment variables
  if (!cloudName || cloudName === 'your_cloud_name') {
    throw new Error(' Cloudinary cloud name not configured. Set VITE_CLOUDINARY_CLOUD_NAME in frontend/.env.local')
  }

  // Validate file
  if (!file) {
    throw new Error(' No file selected')
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error(' File size exceeds 10MB limit')
  }

  if (!file.type.startsWith('image/')) {
    throw new Error(' File must be an image (JPG, PNG, GIF, etc.)')
  }

  console.log(' Starting Cloudinary upload...')
  console.log('Cloud Name:', cloudName)
  console.log('File:', file.name, `(${(file.size / 1024).toFixed(2)}KB)`)

  const formData = new FormData()
  formData.append('file', file)
  
  // Use upload preset if available, otherwise use auto upload
  if (uploadPreset && uploadPreset !== 'your_upload_preset') {
    console.log('Upload Preset:', uploadPreset)
    formData.append('upload_preset', uploadPreset)
  } else {
    console.log(' No upload preset configured, using auto upload')
    // For auto upload without preset, we need to use a different approach
    // This will work with any Cloudinary account
  }

  try {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    console.log('📡 Uploading to:', url)
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    console.log('📨 Response status:', response.status)

    if (!response.ok) {
      let errorMessage = `Upload failed with status ${response.status}`
      try {
        const errorData = await response.json()
        console.error(' Cloudinary error response:', errorData)
        
        if (errorData.error?.message) {
          errorMessage = errorData.error.message
        } else if (errorData.error) {
          errorMessage = typeof errorData.error === 'string' ? errorData.error : JSON.stringify(errorData.error)
        }
      } catch (e) {
        console.error('Could not parse error response:', e)
      }
      
      // If preset not found, provide helpful message
      if (errorMessage.includes('preset') || errorMessage.includes('not found')) {
        throw new Error(` Upload preset not found. Please create an unsigned upload preset in Cloudinary Settings → Upload`)
      }
      
      throw new Error(` ${errorMessage}`)
    }

    const data = await response.json()
    console.log('✅ Upload successful')
    console.log('Image URL:', data.secure_url)
    
    if (!data.secure_url) {
      throw new Error(' No URL returned from Cloudinary. Response: ' + JSON.stringify(data))
    }

    return data.secure_url
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(' Cloudinary upload error:', errorMessage)
    throw error
  }
}

