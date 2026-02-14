import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import ProductForm from "./components/ProductForm";
import UserList from "./pages/UserList";
import UserForm from "./components/UserForm";
import Login from "./pages/Login";
import {
  Product,
  ProductFormValues,
  User,
  UserFormValues,
} from "./utils/types";
import { INITIAL_PRODUCTS, INITIAL_USERS } from "./utils/constants";

const ProtectedRoute: React.FC<{
  isAuthenticated: boolean;
  children: React.ReactNode;
}> = ({ isAuthenticated, children }) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const MainLayout: React.FC<{
  children: React.ReactNode;
  authUser: string;
  onLogout: () => void;
}> = ({ children, authUser, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); // ✅ Hook yang reactive!
  const navigate = useNavigate(); // ✅ Untuk navigasi

  const getCurrentView = (): "dashboard" | "products" | "users" => {
    if (location.pathname.includes("/products")) return "products";
    if (location.pathname.includes("/users")) return "users";
    return "dashboard";
  };

  const handleSetView = (view: "dashboard" | "products" | "users") => {
    // ✅ Navigasi yang benar!
    if (view === "dashboard") navigate("/dashboard");
    else if (view === "products") navigate("/products");
    else if (view === "users") navigate("/users");
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar
        currentView={getCurrentView()}
        setView={handleSetView}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={onLogout}
      />

      <div className="flex-1 transition-all duration-300 md:ml-64">
        <Header
          title={getCurrentView()}
          onMenuClick={() => setSidebarOpen(true)}
          userEmail={authUser}
        />

        <main className="p-3 md:p-8">
          <div className="max-w-7xl mx-auto pb-12">{children}</div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAdminAuthenticated") === "true";
  });
  const [authUser, setAuthUser] = useState<string>(() => {
    return localStorage.getItem("authUserEmail") || "admin@gmail";
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("admin_products");
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem("admin_users");
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    localStorage.setItem("admin_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("admin_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
  };

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setAuthUser(email);
    localStorage.setItem("isAdminAuthenticated", "true");
    localStorage.setItem("authUserEmail", email);
    showToast(`Selamat datang kembali, ${email}!`);
  };

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      setIsAuthenticated(false);
      localStorage.removeItem("isAdminAuthenticated");
      localStorage.removeItem("authUserEmail");
      showToast("Berhasil logout");
    }
  };

  // --- Product CRUD ---
  const handleAddProduct = (data: ProductFormValues) => {
    const newProduct: Product = {
      ...data,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    setIsFormOpen(false);
    showToast("Produk berhasil ditambahkan");
  };

  const handleUpdateProduct = (data: ProductFormValues) => {
    if (!editingProduct) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? { ...p, ...data } : p)),
    );
    setIsFormOpen(false);
    setEditingProduct(undefined);
    showToast("Produk berhasil diperbarui");
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Produk berhasil dihapus");
    }
  };

  const openProductForm = (product?: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  // --- User CRUD ---
  const handleAddUser = (data: UserFormValues) => {
    const newUser: User = {
      ...data,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [newUser, ...prev]);
    setIsUserFormOpen(false);
    showToast("User berhasil ditambahkan");
  };

  const handleUpdateUser = (data: UserFormValues) => {
    if (!editingUser) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === editingUser.id ? { ...u, ...data } : u)),
    );
    setIsUserFormOpen(false);
    setEditingUser(undefined);
    showToast("User berhasil diperbarui");
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus User ini?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      showToast("User berhasil dihapus");
    }
  };

  const openUserForm = (user?: User) => {
    setEditingUser(user);
    setIsUserFormOpen(true);
  };

  return (
    <BrowserRouter 
      future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}
    >
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout
                authUser={authUser}
                onLogout={handleLogout}
              >
                <Dashboard products={products} />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout
                authUser={authUser}
                onLogout={handleLogout}
              >
                <Dashboard products={products} />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout
                authUser={authUser}
                onLogout={handleLogout}
              >
                <ProductList
                  products={products}
                  onEdit={openProductForm}
                  onDelete={handleDeleteProduct}
                  onAdd={() => openProductForm()}
                />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout
                authUser={authUser}
                onLogout={handleLogout}
              >
                <UserList
                  users={users}
                  onEdit={openUserForm}
                  onDelete={handleDeleteUser}
                  onAdd={() => openUserForm()}
                />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Modals */}
      {isFormOpen && (
        <ProductForm
          initialData={editingProduct}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingProduct(undefined);
          }}
        />
      )}

      {isUserFormOpen && (
        <UserForm
          initialData={editingUser}
          onSubmit={editingUser ? handleUpdateUser : handleAddUser}
          onCancel={() => {
            setIsUserFormOpen(false);
            setEditingUser(undefined);
          }}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 md:w-auto px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-2xl z-[100] border flex items-center gap-3 transition-all animate-slideInRight ${
            toast.type === "success"
              ? "bg-indigo-600 text-white border-indigo-500"
              : "bg-rose-600 text-white border-rose-500"
          }`}
        >
          {toast.type === "success" ? (
            <svg
              className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          <span className="font-medium text-sm md:text-base">
            {toast.message}
          </span>
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;