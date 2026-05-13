import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { getAllSheetRows, mutateSheet } from '../../lib/sheets';
import { useToast, ToastContainer } from '../../components/admin/Toast';

function Row({ item, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ headline: item.headline, description: item.description });
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      await onUpdate(item._rowIndex, form);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  if (editing) {
    return (
      <div className="card p-4 space-y-3">
        <input
          value={form.headline}
          onChange={(e) => setForm((f) => ({ ...f, headline: e.target.value }))}
          placeholder="Headline"
          className="field-input"
        />
        <textarea
          rows={2}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="Description"
          className="field-textarea"
        />
        <div className="flex gap-2">
          <button onClick={save} disabled={saving} className="btn-primary py-1.5 px-4 text-xs">
            {saving ? <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" /> : <Check size={13} />}
            Save
          </button>
          <button onClick={() => setEditing(false)} className="btn-outline py-1.5 px-4 text-xs">
            <X size={13} />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4 flex gap-4 items-start">
      <div className="flex-1 min-w-0">
        <p className="font-heading font-semibold text-white text-sm">{item.headline}</p>
        {item.description && <p className="text-violet-300/70 text-xs mt-1 leading-relaxed">{item.description}</p>}
      </div>
      <div className="flex gap-1 shrink-0">
        <button onClick={() => setEditing(true)} className="w-7 h-7 rounded-lg bg-violet-600/15 hover:bg-violet-600/30 text-violet-300 flex items-center justify-center transition-colors">
          <Pencil size={12} />
        </button>
        <button onClick={() => onDelete(item._rowIndex)} className="w-7 h-7 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 flex items-center justify-center transition-colors">
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}

export default function WhyMeAdmin() {
  const { toasts, toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newForm, setNewForm] = useState({ headline: '', description: '' });
  const [adding, setAdding] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const rows = await getAllSheetRows('why_me');
      setItems(rows);
    } catch {
      toast('Could not load data.', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newForm.headline.trim()) return;
    setAdding(true);
    try {
      await mutateSheet({ sheet: 'why_me', action: 'add', data: { id: Date.now().toString(), headline: newForm.headline, description: newForm.description } });
      setNewForm({ headline: '', description: '' });
      toast('Added successfully.', 'success');
      await load();
    } catch {
      toast('Failed to add.', 'error');
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(rowIndex) {
    if (!confirm('Delete this item?')) return;
    try {
      await mutateSheet({ sheet: 'why_me', action: 'delete', rowIndex });
      toast('Deleted.', 'success');
      await load();
    } catch {
      toast('Failed to delete.', 'error');
    }
  }

  async function handleUpdate(rowIndex, data) {
    try {
      await mutateSheet({ sheet: 'why_me', action: 'update', rowIndex, data });
      toast('Updated.', 'success');
      await load();
    } catch {
      toast('Failed to update.', 'error');
      throw new Error('update failed');
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <ToastContainer toasts={toasts} />
      <h1 className="font-heading font-black text-2xl text-white mb-1">Why Me</h1>
      <p className="text-violet-400 text-sm mb-8">Manage your value propositions.</p>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          {items.length === 0 && (
            <p className="text-violet-400/60 text-sm text-center py-8">No items yet. Add one below.</p>
          )}
          {items.map((item) => (
            <Row key={item._rowIndex} item={item} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))}
        </div>
      )}

      <div className="card p-5">
        <h3 className="font-heading font-semibold text-sm text-violet-300 mb-4 uppercase tracking-wider">Add New</h3>
        <form onSubmit={handleAdd} className="space-y-3">
          <input
            value={newForm.headline}
            onChange={(e) => setNewForm((f) => ({ ...f, headline: e.target.value }))}
            placeholder="Headline (e.g. Reliable and easy to work with)"
            className="field-input"
            required
          />
          <textarea
            rows={2}
            value={newForm.description}
            onChange={(e) => setNewForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Supporting description (optional)"
            className="field-textarea"
          />
          <button type="submit" disabled={adding} className="btn-primary">
            {adding ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus size={15} />}
            {adding ? 'Adding...' : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  );
}
