import { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { getAllSheetRows, mutateSheet } from '../../lib/sheets';
import { useToast, ToastContainer } from '../../components/admin/Toast';

export default function ReviewsAdmin() {
  const { toasts, toast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ review_text: '', reviewer_name: '', timestamp: '' });
  const [adding, setAdding] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const rows = await getAllSheetRows('reviews');
      setReviews(rows);
    } catch {
      toast('Could not load reviews.', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.review_text.trim()) return;
    setAdding(true);
    try {
      const now = new Date();
      const ts = form.timestamp || `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
      await mutateSheet({
        sheet: 'reviews',
        action: 'add',
        data: { id: Date.now().toString(), review_text: form.review_text, reviewer_name: form.reviewer_name, timestamp: ts, visible: 'TRUE' },
      });
      setForm({ review_text: '', reviewer_name: '', timestamp: '' });
      toast('Review added.', 'success');
      await load();
    } catch {
      toast('Failed to add review.', 'error');
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(rowIndex) {
    if (!confirm('Delete this review?')) return;
    try {
      await mutateSheet({ sheet: 'reviews', action: 'delete', rowIndex });
      toast('Review deleted.', 'success');
      await load();
    } catch {
      toast('Failed to delete.', 'error');
    }
  }

  async function toggleVisible(review) {
    const newVal = review.visible === 'TRUE' ? 'FALSE' : 'TRUE';
    try {
      await mutateSheet({
        sheet: 'reviews',
        action: 'update',
        rowIndex: review._rowIndex,
        data: { id: review.id, review_text: review.review_text, reviewer_name: review.reviewer_name, timestamp: review.timestamp, visible: newVal },
      });
      toast(newVal === 'TRUE' ? 'Review shown on site.' : 'Review hidden from site.', 'success');
      await load();
    } catch {
      toast('Failed to update visibility.', 'error');
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <ToastContainer toasts={toasts} />
      <h1 className="font-heading font-black text-2xl text-white mb-1">Reviews</h1>
      <p className="text-violet-400 text-sm mb-8">Manage client testimonials shown on your portfolio.</p>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <div key={i} className="h-20 rounded-xl bg-white/[0.04] animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          {reviews.length === 0 && (
            <p className="text-violet-400/60 text-sm text-center py-8">No reviews yet.</p>
          )}
          {reviews.map((r) => (
            <div key={r._rowIndex} className={`card p-4 flex gap-4 items-start border-l-2 ${r.visible === 'TRUE' ? 'border-l-violet-500' : 'border-l-violet-800/40 opacity-60'}`}>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm leading-relaxed line-clamp-2">{r.review_text}</p>
                <div className="flex items-center gap-3 mt-2">
                  {r.reviewer_name && <span className="text-violet-300 text-xs font-heading font-semibold">{r.reviewer_name}</span>}
                  {r.timestamp && <span className="text-violet-400/50 text-xs">{r.timestamp}</span>}
                  <span className={`text-xs ml-auto font-heading ${r.visible === 'TRUE' ? 'text-lime-400' : 'text-violet-400/50'}`}>
                    {r.visible === 'TRUE' ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => toggleVisible(r)}
                  title={r.visible === 'TRUE' ? 'Hide' : 'Show'}
                  className="w-7 h-7 rounded-lg bg-violet-600/15 hover:bg-violet-600/30 text-violet-300 flex items-center justify-center transition-colors"
                >
                  {r.visible === 'TRUE' ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
                <button
                  onClick={() => handleDelete(r._rowIndex)}
                  className="w-7 h-7 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 flex items-center justify-center transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="card p-5">
        <h3 className="font-heading font-semibold text-sm text-violet-300 mb-4 uppercase tracking-wider">Add Review</h3>
        <form onSubmit={handleAdd} className="space-y-3">
          <textarea
            rows={3}
            value={form.review_text}
            onChange={(e) => setForm((f) => ({ ...f, review_text: e.target.value }))}
            placeholder="Review text..."
            className="field-textarea"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              value={form.reviewer_name}
              onChange={(e) => setForm((f) => ({ ...f, reviewer_name: e.target.value }))}
              placeholder="Reviewer name (optional)"
              className="field-input"
            />
            <input
              value={form.timestamp}
              onChange={(e) => setForm((f) => ({ ...f, timestamp: e.target.value }))}
              placeholder="Time (e.g. 9:41 AM)"
              className="field-input"
            />
          </div>
          <button type="submit" disabled={adding} className="btn-primary">
            {adding ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus size={15} />}
            {adding ? 'Adding...' : 'Add Review'}
          </button>
        </form>
      </div>
    </div>
  );
}
