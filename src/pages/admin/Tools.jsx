import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getAllSheetRows, mutateSheet } from '../../lib/sheets';
import { useToast, ToastContainer } from '../../components/admin/Toast';

export default function ToolsAdmin() {
  const { toasts, toast } = useToast();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTool, setNewTool] = useState('');
  const [adding, setAdding] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const rows = await getAllSheetRows('tools');
      setTools(rows);
    } catch {
      toast('Could not load tools.', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newTool.trim()) return;
    setAdding(true);
    try {
      await mutateSheet({ sheet: 'tools', action: 'add', data: { id: Date.now().toString(), tool_name: newTool.trim() } });
      setNewTool('');
      toast('Tool added.', 'success');
      await load();
    } catch {
      toast('Failed to add tool.', 'error');
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(rowIndex, name) {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await mutateSheet({ sheet: 'tools', action: 'delete', rowIndex });
      toast('Tool deleted.', 'success');
      await load();
    } catch {
      toast('Failed to delete.', 'error');
    }
  }

  return (
    <div className="p-8 max-w-lg">
      <ToastContainer toasts={toasts} />
      <h1 className="font-heading font-black text-2xl text-white mb-1">Design Tools</h1>
      <p className="text-violet-400 text-sm mb-8">Manage the tools list shown on your portfolio.</p>

      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => <div key={i} className="h-12 rounded-xl bg-white/[0.04] animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-2 mb-6">
          {tools.length === 0 && (
            <p className="text-violet-400/60 text-sm text-center py-6">No tools yet.</p>
          )}
          {tools.map((t) => (
            <div key={t._rowIndex} className="card flex items-center justify-between px-4 py-3">
              <span className="text-white text-sm font-medium">{t.tool_name}</span>
              <button
                onClick={() => handleDelete(t._rowIndex, t.tool_name)}
                className="w-7 h-7 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 flex items-center justify-center transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleAdd} className="flex gap-3">
        <input
          value={newTool}
          onChange={(e) => setNewTool(e.target.value)}
          placeholder="e.g. Figma"
          className="field-input flex-1"
          required
        />
        <button type="submit" disabled={adding} className="btn-primary shrink-0">
          {adding ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus size={15} />}
          Add
        </button>
      </form>
    </div>
  );
}
