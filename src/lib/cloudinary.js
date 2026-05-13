export function openUploadWidget(onSuccess) {
  if (typeof window === 'undefined' || !window.cloudinary) {
    alert('Cloudinary widget is not loaded. Check your internet connection and reload.');
    return;
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    alert('Cloudinary env vars not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env');
    return;
  }

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName,
      uploadPreset,
      folder: 'modesty-designs',
      sources: ['local', 'url', 'camera'],
      multiple: false,
      maxFileSize: 10000000,
      clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
      styles: {
        palette: {
          window: '#12103a',
          windowBorder: '#7c3aed',
          tabIcon: '#8b5cf6',
          menuIcons: '#c4b5fd',
          textDark: '#ffffff',
          textLight: '#c4b5fd',
          link: '#7c3aed',
          action: '#7c3aed',
          inactiveTabIcon: '#6d6d8a',
          error: '#ef4444',
          inProgress: '#7c3aed',
          complete: '#a3e635',
          sourceBg: '#0d0d22',
        },
      },
    },
    (error, result) => {
      if (!error && result?.event === 'success') {
        onSuccess(result.info.secure_url);
        widget.close();
      }
    }
  );

  widget.open();
}
