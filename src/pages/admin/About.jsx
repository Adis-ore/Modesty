import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { getAbout, mutateSheet } from '../../lib/sheets';
import ImageUploader from '../../components/admin/ImageUploader';
import { useToast, ToastContainer } from '../../components/admin/Toast';

const FIELD_ROWS = [
  { field: 'bio_paragraph_1', rowIndex: 2, label: 'Bio Paragraph 1' },
  { field: 'bio_paragraph_2', rowIndex: 3, label: 'Bio Paragraph 2' },
  { field: 'bio_paragraph_3', rowIndex: 4, label: 'Bio Paragraph 3' },
  { field: 'bio_paragraph_4', rowIndex: 5, label: 'Bio Paragraph 4' },
  { field: 'photo_url', rowIndex: 6, label: 'Photo URL' },
];

export default function AboutAdmin() {
  const { toasts, toast } = useToast();
  const [form, setForm] = useState({
    bio_paragraph_1: '',
    bio_paragraph_2: '',
    bio_paragraph_3: '',
    bio_paragraph_4: '',
    photo_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAbout()
      .then((data) => setForm((f) => ({ ...f, ...data })))
      .catch(() => toast('Could not load data — check your API URL.', 'error'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await Promise.all(
        FIELD_ROWS.map(({ field, rowIndex }) =>
          mutateSheet({
            sheet: 'about',
            action: 'update',
            rowIndex,
            data: { Field: field, Value: form[field] || '' },
          })
        )
      );
      toast('About section saved successfully.', 'success');
    } catch {
      toast('Failed to save. Check your API URL and Sheet.', 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <ToastContainer toasts={toasts} />
      <h1 className="font-heading font-black text-2xl text-white mb-1">About Me</h1>
      <p className="text-violet-400 text-sm mb-8">Edit your bio and profile photo.</p>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-white/[0.04] animate-pulse" />
          ))}
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {FIELD_ROWS.filter((f) => f.field !== 'photo_url').map(({ field, label }) => (
            <div key={field}>
              <label className="block font-heading text-xs uppercase tracking-wider text-violet-300 mb-2">
                {label}
              </label>
              <textarea
                rows={4}
                value={form[field]}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                placeholder={`Enter ${label.toLowerCase()}...`}
                className="field-textarea"
              />
            </div>
          ))}

          <div>
            <label className="block font-heading text-xs uppercase tracking-wider text-violet-300 mb-2">
              Profile Photo
            </label>
            <ImageUploader
              currentUrl={form.photo_url}
              onUpload={(url) => setForm((f) => ({ ...f, photo_url: url }))}
            />
            {form.photo_url && !form.photo_url.startsWith('http') && (
              <input
                type="url"
                value={form.photo_url}
                onChange={(e) => setForm((f) => ({ ...f, photo_url: e.target.value }))}
                placeholder="Or paste image URL"
                className="field-input mt-3"
              />
            )}
          </div>

          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={15} />
            )}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}
    </div>
  );
}
