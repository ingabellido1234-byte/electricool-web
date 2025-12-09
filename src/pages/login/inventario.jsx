import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/navegacion/AdminLayout';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { 
  Search, Plus, Package, Trash2, X, AlertTriangle, Database 
} from 'lucide-react';

export default function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // --- DATOS DE PRUEBA (8 Productos) ---
  

  const cargarDatosDePrueba = async () => {
    if(!window.confirm("¿Cargar 8 productos de prueba al inventario?")) return;
    try {
      setLoading(true); // Mostrar carga mientras se suben
      for (const prod of datosDePrueba) {
        await addDoc(collection(db, "productos"), {
          ...prod,
          createdAt: new Date()
        });
      }
      alert("¡Inventario cargado con éxito!");
    } catch (error) {
      console.error("Error cargando datos:", error);
      alert("Hubo un error al cargar los datos.");
    } finally {
      setLoading(false);
    }
  };
  // ------------------------------------

  // PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  // FILTRADO
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CÁLCULO DE PAGINACIÓN
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // ESTADO DEL FORMULARIO
  const [newProduct, setNewProduct] = useState({
    name: '', category: '', price: '', stock: '', sku: ''
  });

  // 1. LEER DATOS DE FIREBASE
  useEffect(() => {
    const q = query(collection(db, "productos"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const docs = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. GUARDAR PRODUCTO
  const handleSave = async (e) => {
    e.preventDefault();
    if(!newProduct.name || !newProduct.price) return alert("Nombre y Precio son obligatorios");
    
    try {
      await addDoc(collection(db, "productos"), {
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        createdAt: new Date()
      });
      setIsModalOpen(false);
      setNewProduct({ name: '', category: '', price: '', stock: '', sku: '' });
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // 3. ACTUALIZAR STOCK
  const updateStock = async (id, currentStock, amount) => {
    const newStock = Math.max(0, currentStock + amount);
    try {
      const productRef = doc(db, "productos", id);
      await updateDoc(productRef, { stock: newStock });
    } catch (error) {
      console.error("Error actualizando stock:", error);
    }
  };

  // 4. ELIMINAR PRODUCTO
  const handleDelete = async (id) => {
    if(window.confirm("¿Estás seguro de eliminar este producto?")) {
      await deleteDoc(doc(db, "productos", id));
    }
  };

  return (
    <AdminLayout title="Inventario de Productos">
      
      {/* BARRA DE ACCIONES */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, SKU o categoría..." 
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Resetear página al buscar
            }}
          />
        </div>
        
        <div className="flex gap-3">
          {/* BOTÓN DEMO */}

          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg">
            <Plus size={20} /> Nuevo Producto
          </button>
        </div>
      </div>

      {/* TABLA DE INVENTARIO */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500 animate-pulse">Cargando inventario...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">Producto / SKU</th>
                  <th className="px-6 py-4">Categoría</th>
                  <th className="px-6 py-4">Precio Unit.</th>
                  <th className="px-6 py-4 text-center">Stock Disponible</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {currentProducts.length > 0 ? (
                  currentProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50 transition">
                      
                      {/* Producto */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
                            <Package size={20} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{prod.name}</div>
                            <div className="text-xs text-slate-400 font-mono">SKU: {prod.sku || '---'}</div>
                          </div>
                        </div>
                      </td>

                      {/* Categoría */}
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold border border-blue-100">
                          {prod.category}
                        </span>
                      </td>

                      {/* Precio */}
                      <td className="px-6 py-4 font-bold text-slate-700">
                        S/ {prod.price.toFixed(2)}
                      </td>
                      
                      {/* Stock Interactivo */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={() => updateStock(prod.id, prod.stock, -1)} 
                            className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 font-bold text-slate-600 flex items-center justify-center transition"
                          >-</button>
                          
                          <span className={`font-bold text-md w-8 text-center ${prod.stock < 5 ? 'text-red-600' : 'text-slate-700'}`}>
                            {prod.stock}
                          </span>
                          
                          <button 
                            onClick={() => updateStock(prod.id, prod.stock, 1)} 
                            className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 font-bold text-slate-600 flex items-center justify-center transition"
                          >+</button>

                          {/* Icono de Alerta si hay poco stock */}
                          {prod.stock < 5 && (
                            <div title="Stock Bajo" className="text-red-500 animate-pulse">
                              <AlertTriangle size={16} />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Acciones */}
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDelete(prod.id)} className="text-red-400 hover:text-red-600 p-2 bg-red-50 hover:bg-red-100 rounded-lg transition">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
                      No se encontraron productos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Paginación */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <span>Mostrando {currentProducts.length} de {filteredProducts.length} productos</span>
              <div className="flex gap-2">
                <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50">Anterior</button>
                <button onClick={nextPage} disabled={currentPage === totalPages || totalPages === 0} className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50">Siguiente</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL PARA AGREGAR PRODUCTO --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Nuevo Producto</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-slate-100 rounded-full transition">
                <X className="text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Nombre del Producto</label>
                <input 
                  type="text" 
                  className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={newProduct.name} 
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})} 
                  required 
                />
              </div>

              {/* SKU y Categoría */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">SKU / Código</label>
                  <input 
                    type="text" 
                    className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={newProduct.sku} 
                    onChange={e => setNewProduct({...newProduct, sku: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Categoría</label>
                  <select 
                    className="w-full border p-2.5 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={newProduct.category} 
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Refrigeración">Refrigeración</option>
                    <option value="Electricidad">Electricidad</option>
                    <option value="Seguridad">Seguridad</option>
                    <option value="Repuestos">Repuestos</option>
                    <option value="Varios">Varios</option>
                  </select>
                </div>
              </div>

              {/* Precio y Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Precio (S/)</label>
                  <input 
                    type="number" 
                    className="w-full border p-2.5 rounded-lg font-bold" 
                    placeholder="0.00"
                    value={newProduct.price} 
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})} 
                    required 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Stock Inicial</label>
                  <input 
                    type="number" 
                    className="w-full border p-2.5 rounded-lg" 
                    placeholder="0"
                    value={newProduct.stock} 
                    onChange={e => setNewProduct({...newProduct, stock: e.target.value})} 
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition mt-2">
                Guardar en Inventario
              </button>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}