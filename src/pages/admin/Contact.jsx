import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { getAllSheetRows, mutateSheet } from '../../lib/sheets';
import { useToast, ToastContainer } from '../../components/admin/Toast';

const PLATFORMS = [
  { key: 'whatsapp', label: 'WhatsApp', placeholder: '+2349121218751' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'your-linkedin-handle' },
  { key: 'facebook', label: 'Facebook', placeholder: 'your-facebook-handle' },
  { key: 'tiktok', label: 'TikTok', placeholder: 'your-tiktok-handle' },
  { key: 'email', label: 'Email', placeholder: 'your@email.com' },
];

export default function ContactAdmin() {
  const { toasts, toast } = useToast();
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    whatsapp: '',
    linkedin: '',
    facebook: '',
    tiktok: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAllSheetRows('contact')
      .then((data) => {
        setRows(data);
        const mapped = data.reduce((acc, row) => {
          acc[row.platform?.toLowerCase()] = row.handle_or_value || '';
          return acc;
        }, {});
        setForm((f) => ({ ...f, ...mapped }));
      })
      .catch(() => toast('Could not load contact data.', 'error'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (rows.length === 0) {
        await Promise.all(
          PLATFORMS.map((p) =>
            mutateSheet({ sheet: 'contact', action: 'add', data: { platform: p.key, handle_or_value: form[p.key] || '' } })
          )
        );
      } else {
        await Promise.all(
          rows.map((row) => {
            const platform = row.platform?.toLowerCase();
            if (!platform) return Promise.resolve();
            return mutateSheet({
              sheet: 'contact',
              action: 'update',
              rowIndex: row._rowIndex,
              data: { platform, handle_or_value: form[platform] || '' },
            });
          })
        );
      }
      toast('Contact info saved.', 'success');
    } catch {
      toast('Failed to save contact info.', 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8 max-w-lg">
      <ToastContainer toasts={toasts} />
      <h1 className="font-heading font-black text-2xl text-white mb-1">Contact</h1>
      <p className="text-violet-400 text-sm mb-8">Update your contact information.</p>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => <div key={i} className="h-12 rounded-xl bg-white/[0.04] animate-pulse" />)}
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          {PLATFORMS.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block font-heading text-xs uppercase tracking-wider text-violet-300 mb-2">
                {label}
              </label>
              <input
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                className="field-input"
                type={key === 'email' ? 'email' : 'text'}
              />
            </div>
          ))}
          <button type="submit" disabled={saving} className="btn-primary mt-2">
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={15} />}
            {saving ? 'Saving...' : 'Save Contact Info'}
          </button>
        </form>
      )}
    </div>
  );
}
