import React, { useState } from "react";
import { Product } from "../utils/types";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "draft" | "archived"
  >("all");

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "draft":
        return "bg-slate-100 text-slate-700";
      case "archived":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "draft":
        return "Draft";
      case "archived":
        return "Arsip";
      default:
        return status;
    }
  };

  const filterLabels: Record<string, string> = {
    all: "Semua",
    active: "Aktif",
    draft: "Draft",
    archived: "Arsip",
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">
            Produk
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            Kelola katalog dan level stok Anda.
          </p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 active:scale-95 transition-all text-sm md:text-base"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tambah Produk
        </button>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-3 md:p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="relative flex-1">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 md:pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg md:rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all text-xs md:text-sm"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {(["all", "active", "draft", "archived"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-[10px] md:text-xs font-bold uppercase transition-all whitespace-nowrap ${
                  filterStatus === s
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {filterLabels[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Table View - Hidden on mobile */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Produk
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Kategori
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Harga
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Stok
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                        alt={product.name}
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-800 line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          ID: {product.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-800">
                     Rp{product.price.toLocaleString("id-ID")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${product.stock < 10 ? "text-rose-600" : "text-slate-600"}`}
                      >
                        {product.stock} unit
                      </span>
                      {product.stock < 10 && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${getStatusStyle(product.status)}`}
                    >
                      {getStatusLabel(product.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(product.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        title="Hapus"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-400 font-medium"
                  >
                    Tidak ada produk yang cocok dengan kriteria Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex gap-3">
                <img
                  src={product.image}
                  className="w-16 h-16 rounded-lg object-cover border border-slate-100 flex-shrink-0"
                  alt={product.name}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-slate-800 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {product.category}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider whitespace-nowrap ${getStatusStyle(product.status)}`}
                    >
                      {getStatusLabel(product.status)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-slate-500">Harga</p>
                      <p className="text-sm font-bold text-slate-800">
                        Rp{product.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Stok</p>
                      <p
                        className={`text-sm font-bold flex items-center justify-end gap-1 ${product.stock < 10 ? "text-rose-600" : "text-slate-800"}`}
                      >
                        {product.stock} unit
                        {product.stock < 10 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all text-xs font-bold"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-all text-xs font-bold"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="px-4 py-12 text-center text-slate-400 font-medium text-sm">
              Tidak ada produk yang cocok dengan kriteria Anda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
