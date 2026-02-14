import React, { useState, useEffect } from 'react';
import { Product, ProductFormValues } from '../utils/types';
import { CATEGORIES } from '../utils/constants';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [form, setForm] = useState<ProductFormValues>({
    name: '',
    category: CATEGORIES[0],
    price: 0,
    stock: 0,
    status: 'draft',
    description: '',
    image: 'https://picsum.photos/400/400'
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        category: initialData.category,
        price: initialData.price,
        stock: initialData.stock,
        status: initialData.status,
        description: initialData.description,
        image: initialData.image
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const statusLabels: Record<string, string> = {
    'active': 'Aktif',
    'draft': 'Draft',
    'archived': 'Arsip'
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onCancel}></div>
      <div className="relative bg-white w-full md:max-w-2xl rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] md:max-h-[90vh]">
        <header className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-lg md:text-xl font-bold text-slate-800">
            {initialData ? 'Edit Produk' : 'Tambah Produk Baru'}
          </h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-50">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">Nama Produk</label>
                <input 
                  type="text" 
                  required
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all text-sm md:text-base"
                  placeholder="contoh: Laptop Gaming Ultra"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">Kategori</label>
                <select 
                  value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all text-sm md:text-base"
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">Harga (Rp)</label>
                  <input 
                    type="number" 
                    required
                    value={form.price}
                    onChange={e => setForm({...form, price: parseFloat(e.target.value)})}
                    className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all text-sm md:text-base"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">Stok</label>
                  <input 
                    type="number" 
                    required
                    value={form.stock}
                    onChange={e => setForm({...form, stock: parseInt(e.target.value)})}
                    className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all text-sm md:text-base"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">Status</label>
                <div className="flex gap-2">
                  {(['active', 'draft', 'archived'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({...form, status: s})}
                      className={`flex-1 py-2 text-[10px] md:text-xs font-bold uppercase rounded-lg border transition-all ${
                        form.status === s 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100' 
                          : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {statusLabels[s]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">Gambar Produk</label>
                <div className="aspect-square w-full rounded-xl md:rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center overflow-hidden relative group">
                  {form.image ? (
                    <>
                      <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button type="button" className="bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-bold shadow-lg">Upload Gambar</button>
                      </div>
                    </>
                  ) : (
                    <span className="text-slate-400 text-sm">Klik untuk upload</span>
                  )}
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) setForm({...form, image: URL.createObjectURL(file)});
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
             <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">Deskripsi</label>
             <textarea 
                rows={4}
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all resize-none text-sm md:text-base"
                placeholder="Tulis tentang produk Anda..."
             />
          </div>
        </form>

        <footer className="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2 md:gap-3 sticky bottom-0">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-all text-sm md:text-base"
          >
            Batal
          </button>
          <button 
            type="submit" 
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 md:px-8 py-2 md:py-2.5 rounded-lg md:rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-95 transition-all disabled:opacity-50 text-sm md:text-base"
          >
            {isLoading ? 'Menyimpan...' : initialData ? 'Update Produk' : 'Tambah Produk'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ProductForm;