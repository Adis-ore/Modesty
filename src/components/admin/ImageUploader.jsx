import { Upload, X } from 'lucide-react';
import { openUploadWidget } from '../../lib/cloudinary';

export default function ImageUploader({ onUpload, currentUrl, label = 'Upload Image' }) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => openUploadWidget(onUpload)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-violet-600/40 text-violet-300 text-sm font-heading hover:bg-violet-600/10 hover:border-violet-500/60 transition-all duration-200"
      >
        <Upload size={15} />
        {label}
      </button>

      {currentUrl && (
        <div className="relative inline-block">
          <img
            src={currentUrl}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-xl border border-violet-600/30"
          />
          <button
            type="button"
            onClick={() => onUpload('')}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
          >
            <X size={11} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
