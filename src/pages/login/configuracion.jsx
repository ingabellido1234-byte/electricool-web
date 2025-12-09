import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/navegacion/AdminLayout';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updatePassword, updateProfile } from 'firebase/auth';
import { 
  Save, Building, Lock, Globe, Bell, Shield, 
  CheckCircle, AlertTriangle, Mail 
} from 'lucide-react';

export default function Configuracion() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('empresa'); // Tabs: empresa, seguridad, sistema

  // Estado Datos Empresa
  const [companyData, setCompanyData] = useState({
    name: 'ElectraCool Perú S.A.C.',
    ruc: '',
    address: '',
    phone: '',
    email: '',
    website: ''
  });

  // Estado Seguridad
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Estado Sistema
  const [systemSettings, setSystemSettings] = useState({
    taxRate: 18, // IGV
    currency: 'PEN',
    notifications: true
  });

  // 1. CARGAR CONFIGURACIÓN AL INICIO
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, "configuracion", "general");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.empresa) setCompanyData(data.empresa);
          if (data.sistema) setSystemSettings(data.sistema);
        }
      } catch (error) {
        console.error("Error cargando configuración:", error);
      }
    };
    fetchConfig();
  }, []);

  // 2. GUARDAR DATOS DE EMPRESA Y SISTEMA
  const handleSaveConfig = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, "configuracion", "general"), {
        empresa: companyData,
        sistema: systemSettings
      }, { merge: true });
      alert("¡Configuración guardada exitosamente!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar.");
    } finally {
      setLoading(false);
    }
  };

  // 3. CAMBIAR CONTRASEÑA
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return alert("Las contraseñas no coinciden");
    if (passwords.new.length < 6) return alert("La contraseña debe tener al menos 6 caracteres");

    setLoading(true);
    const user = auth.currentUser;

    try {
      await updatePassword(user, passwords.new);
      alert("¡Contraseña actualizada! Por favor inicia sesión nuevamente.");
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error) {
      console.error(error);
      alert("Error: Es posible que debas cerrar sesión y volver a entrar para realizar este cambio por seguridad.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Configuración del Sistema">
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* --- MENÚ LATERAL DE CONFIGURACIÓN --- */}
        <div className="lg:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('empresa')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${activeTab === 'empresa' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-slate-600 hover:bg-white'}`}
          >
            <Building size={20} /> Datos de Empresa
          </button>
          <button 
            onClick={() => setActiveTab('sistema')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${activeTab === 'sistema' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-slate-600 hover:bg-white'}`}
          >
            <Globe size={20} /> Preferencias Sistema
          </button>
          <button 
            onClick={() => setActiveTab('seguridad')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${activeTab === 'seguridad' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-slate-600 hover:bg-white'}`}
          >
            <Shield size={20} /> Seguridad
          </button>
        </div>

        {/* --- ÁREA DE CONTENIDO --- */}
        <div className="lg:col-span-3">
          
          {/* TAB: EMPRESA */}
          {activeTab === 'empresa' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-xl font-bold text-slate-800 mb-1">Información de la Empresa</h3>
              <p className="text-slate-500 text-sm mb-6">Estos datos aparecerán en los encabezados de tus reportes y cotizaciones.</p>
              
              <form onSubmit={handleSaveConfig} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nombre Comercial</label>
                    <input className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={companyData.name} onChange={e => setCompanyData({...companyData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">RUC</label>
                    <input className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={companyData.ruc} onChange={e => setCompanyData({...companyData, ruc: e.target.value})} placeholder="20..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Dirección Fiscal</label>
                    <input className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={companyData.address} onChange={e => setCompanyData({...companyData, address: e.target.value})} placeholder="Av. Principal 123..." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Teléfono / Celular</label>
                    <input className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={companyData.phone} onChange={e => setCompanyData({...companyData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Correo Electrónico</label>
                    <input className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={companyData.email} onChange={e => setCompanyData({...companyData, email: e.target.value})} />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button type="submit" disabled={loading} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
                    <Save size={20} /> {loading ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: SISTEMA */}
          {activeTab === 'sistema' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Ajustes Generales</h3>
              
              <form onSubmit={handleSaveConfig} className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-slate-700">Impuestos (IGV)</h4>
                      <p className="text-xs text-slate-500">Porcentaje aplicado a las cotizaciones</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1 border rounded-lg">
                      <input 
                        type="number" 
                        className="w-12 text-right font-bold outline-none" 
                        value={systemSettings.taxRate} 
                        onChange={e => setSystemSettings({...systemSettings, taxRate: e.target.value})}
                      />
                      <span className="text-slate-500 font-bold">%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-700">Notificaciones</h4>
                      <p className="text-xs text-slate-500">Recibir alertas de stock bajo</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setSystemSettings({...systemSettings, notifications: !systemSettings.notifications})}
                      className={`w-12 h-6 rounded-full transition-colors relative ${systemSettings.notifications ? 'bg-green-500' : 'bg-slate-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${systemSettings.notifications ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="submit" disabled={loading} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition">
                    <Save size={20} /> Guardar Ajustes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: SEGURIDAD */}
          {activeTab === 'seguridad' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-100 p-2 rounded-lg text-red-600"><Lock size={24} /></div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Seguridad de la Cuenta</h3>
                  <p className="text-xs text-slate-500">Administrador: {auth.currentUser?.email}</p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-6 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nueva Contraseña</label>
                  <input type="password" className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Confirmar Nueva Contraseña</label>
                  <input type="password" className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} required />
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-700">
                  <div className="flex items-center gap-2 font-bold mb-1"><AlertTriangle size={16}/> Nota Importante</div>
                  Al cambiar la contraseña, es posible que debas volver a iniciar sesión en todos tus dispositivos.
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition">
                    {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </AdminLayout>
  );
}