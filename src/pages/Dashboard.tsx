import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Product } from '../utils/types';

interface DashboardProps {
  products: Product[];
}

const Dashboard: React.FC<DashboardProps> = ({ products }) => {
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const lowStock = products.filter(p => p.stock < 10).length;
  const activeCount = products.filter(p => p.status === 'active').length;

  const stats = [
    { label: 'Total Produk', value: products.length, icon: '📦', color: 'bg-blue-500' },
    { label: 'Produk Aktif', value: activeCount, icon: '✅', color: 'bg-green-500' },
    { label: 'Nilai Inventori', value: `Rp${(totalValue).toLocaleString('id-ID')}`, icon: '💰', color: 'bg-amber-500' },
    { label: 'Stok Rendah', value: lowStock, icon: '⚠️', color: 'bg-rose-500' },
  ];

  const chartData = [
    { name: 'Sen', sales: 4000 },
    { name: 'Sel', sales: 3000 },
    { name: 'Rab', sales: 2000 },
    { name: 'Kam', sales: 2780 },
    { name: 'Jum', sales: 1890 },
    { name: 'Sab', sales: 2390 },
    { name: 'Min', sales: 3490 },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <header>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800">Ringkasan Dashboard</h2>
        <p className="text-slate-500 text-sm md:text-base">Selamat datang kembali, ini yang terjadi hari ini.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm font-medium text-slate-500 mb-1 truncate">{stat.label}</p>
                <h3 className="text-lg md:text-2xl font-bold text-slate-900 truncate">{stat.value}</h3>
              </div>
              <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center text-lg md:text-xl flex-shrink-0`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="font-bold text-slate-800 text-sm md:text-base">Tren Pendapatan</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dx={-10} />
              <Tooltip 
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}}
              />
              <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={2} dot={{r: 3, fill: '#4f46e5'}} activeDot={{r: 5}} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="font-bold text-slate-800 text-sm md:text-base">Kategori Produk</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dx={-10} />
              <Tooltip 
                 contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}}
              />
              <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;