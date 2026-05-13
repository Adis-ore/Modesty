import { useState, useEffect } from 'react';
import { Plus, Trash2, FolderPlus } from 'lucide-react';
import { getAllSheetRows, mutateSheet } from '../../lib/sheets';
import ImageUploader from '../../components/admin/ImageUploader';
import { useToast, ToastContainer } from '../../components/admin/Toast';

export default function ProjectsAdmin() {
  const { toasts, toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [newCategory, setNewCategory] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ category: '', title: '', image_url: '', order: '' });
  const [adding, setAdding] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const rows = await getAllSheetRows('projects');
      setProjects(rows.sort((a, b) => Number(a.order) - Number(b.order)));
    } catch {
      toast('Could not load projects.', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const categories = ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))];
  const filtered = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.image_url) { toast('Please upload an image.', 'error'); return; }
    if (!form.category) { toast('Please select or enter a category.', 'error'); return; }
    setAdding(true);
    try {
      await mutateSheet({
        sheet: 'projects',
        action: 'add',
        data: {
          id: Date.now().toString(),
          category: form.category,
          image_url: form.image_url,
          title: form.title,
          order: form.order || String(projects.length + 1),
        },
      });
      setForm({ category: '', title: '', image_url: '', order: '' });
      setShowAdd(false);
      toast('Project added.', 'success');
      await load();
    } catch {
      toast('Failed to add project.', 'error');
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(rowIndex, title) {
    if (!confirm(`Delete "${title || 'this project'}"?`)) return;
    try {
      await mutateSheet({ sheet: 'projects', action: 'delete', rowIndex });
      toast('Project deleted.', 'success');
      await load();
    } catch {
      toast('Failed to delete.', 'error');
    }
  }

  function addCategory() {
    if (!newCategory.trim()) return;
    setForm((f) => ({ ...f, category: newCategory.trim() }));
    setNewCategory('');
    setShowAdd(true);
    toast(`Category "${newCategory.trim()}" ready — add a project in it.`, 'success');
  }

  return (
    <div className="p-8">
      <ToastContainer toasts={toasts} />
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-heading font-black text-2xl text-white mb-1">Projects</h1>
          <p className="text-violet-400 text-sm">Manage your portfolio projects.</p>
        </div>
        <button onClick={() => setShowAdd((s) => !s)} className="btn-primary">
          <Plus size={15} />
          Add Project
        </button>
      </div>

      {showAdd && (
        <div className="card p-6 mb-8">
          <h3 className="font-heading font-semibold text-sm text-violet-300 mb-5 uppercase tracking-wider">New Project</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-heading text-xs uppercase tracking-wider text-violet-300 mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="field-input"
                >
                  <option value="">Select category</option>
                  {categories.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="__new__">+ New category</option>
                </select>
                {form.category === '__new__' && (
                  <input
                    value={form.category === '__new__' ? '' : form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    placeholder="e.g. Poster Designs"
                    className="field-input mt-2"
                  />
                )}
              </div>
              <div>
                <label className="block font-heading text-xs uppercase tracking-wider text-violet-300 mb-2">Title (optional)</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. AuraVibes Brand"
                  className="field-input"
                />
              </div>
            </div>
            <div>
              <label className="block font-heading text-xs uppercase tracking-wider text-violet-300 mb-2">Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
                placeholder={String(projects.length + 1)}
                className="field-input w-32"
              />
            </div>
            <div>
              <label className="block font-heading text-xs uppercase tracking-wider text-violet-300 mb-2">Image</label>
              <ImageUploader
                currentUrl={form.image_url}
                onUpload={(url) => setForm((f) => ({ ...f, image_url: url }))}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={adding} className="btn-primary">
                {adding ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus size={15} />}
                {adding ? 'Adding...' : 'Add Project'}
              </button>
              <button type="button" onClick={() => setShowAdd(false)} className="btn-outline">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-heading font-semibold text-xs tracking-wider transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-violet-600 text-white'
                  : 'border border-violet-600/30 text-violet-300 hover:border-violet-500/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="field-input w-44 py-1.5 text-xs"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
          />
          <button onClick={addCategory} className="btn-outline py-1.5 px-3 text-xs">
            <FolderPlus size={13} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <div key={i} className="aspect-square rounded-2xl bg-white/[0.04] animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-violet-400/60 text-sm text-center py-16">No projects in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((project) => (
            <div key={project._rowIndex} className="group relative rounded-2xl overflow-hidden border border-violet-600/15 aspect-square bg-navy-800">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title || project.category} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-violet-900/20">
                  <span className="text-violet-400/40 text-xs">No image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-navy-950/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3 p-3">
                {project.title && <p className="text-white text-xs font-heading font-semibold text-center leading-tight">{project.title}</p>}
                {project.category && <p className="text-violet-300 text-[10px]">{project.category}</p>}
                <button
                  onClick={() => handleDelete(project._rowIndex, project.title)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/60 hover:bg-red-700 text-red-200 text-xs rounded-lg transition-colors font-medium"
                >
                  <Trash2 size={11} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
