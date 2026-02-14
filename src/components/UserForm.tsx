import React, { useState, useEffect } from 'react';
import { User, UserFormValues, UserRole, UserStatus } from '../utils/types';

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: UserFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [form, setForm] = useState<UserFormValues>({
    name: '',
    email: '',
    role: 'Staff',
    status: 'Pending',
    avatar: `https://picsum.photos/seed/${Math.random()}/200/200`
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        email: initialData.email,
        role: initialData.role,
        status: initialData.status,
        avatar: initialData.avatar
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const roles: UserRole[] = ['Admin', 'Manager', 'Staff'];
  const statuses: UserStatus[] = ['Active', 'Inactive', 'Pending'];

  const statusLabels: Record<UserStatus, string> = {
    'Active': 'Aktif',
    'Inactive': 'Tidak Aktif',
    'Pending': 'Pending'
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onCancel}></div>
      <div className="relative bg-white w-full md:max-w-lg rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] md:max-h-[90vh]">
        <header className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-lg md:text-xl font-bold text-slate-800">
            {initialData ? 'Edit User' : 'Tambah User Baru'}
          </h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-50">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-5">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src={form.avatar} 
                alt="Avatar" 
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-slate-100 object-cover"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 p-1.5 md:p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
                onClick={() => setForm({...form, avatar: `https://picsum.photos/seed/${Math.random()}/200/200`})}
              >
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer rounded-full" 
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) setForm({...form, avatar: URL.createObjectURL(file)});
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">Nama Lengkap</label>
            <input 
              type="text" 
              required
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all text-sm md:text-base"
              placeholder="contoh: Jono"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">Email</label>
            <input 
              type="email" 
              required
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all text-sm md:text-base"
              placeholder="contoh: jono@gmail.com"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">Peran</label>
            <select 
              value={form.role}
              onChange={e => setForm({...form, role: e.target.value as UserRole})}
              className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all text-sm md:text-base"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">Status</label>
            <div className="grid grid-cols-3 gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm({...form, status: s})}
                  className={`py-2 md:py-2.5 text-[10px] md:text-xs font-bold uppercase rounded-lg border transition-all ${
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
            {isLoading ? 'Menyimpan...' : initialData ? 'Update User' : 'Tambah User'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default UserForm;