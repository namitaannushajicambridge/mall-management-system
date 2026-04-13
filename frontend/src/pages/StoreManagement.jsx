import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreManagement = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    storeName: '', category: '', shopNumber: '', ownerName: '', description: '', image: ''
  });

  const fetchStores = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/stores');
      setStores(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchStores(); }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (editId) {
          // This sends the name, description, AND the new 107KB image string
          await axios.put(`http://localhost:5000/api/stores/${editId}`, formData);
        } else {
          await axios.post('http://localhost:5000/api/stores', formData);
        }
        alert("Store updated successfully!");
        fetchStores();
      } catch (err) {
        console.error(err);
        alert("Error: " + err.response?.data?.message || "Check backend limits");
      }
  };

  const handleEdit = (store) => {
    setEditId(store._id);
    setFormData({
      storeName: store.storeName,
      category: store.category,
      shopNumber: store.shopNumber,
      ownerName: store.ownerName,
      description: store.description || '',
      image: store.image || ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      await axios.delete(`http://localhost:5000/api/stores/${id}`);
      fetchStores();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Sets the image state to the Base64 string
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
};

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col md:flex-row font-sans">
      
      {/* SIDEBAR REGISTRATION FORM */}
      <aside className="w-full md:w-96 bg-white border-r border-gray-200 p-8 shadow-sm">
        <header className="mb-10">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {editId ? 'Edit Store' : 'Register Store'}
          </h1>
          <p className="text-sm text-gray-500">Update mall outlet information</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
            {/* STORE NAME */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Store Name</label>
              <input 
                name="storeName" value={formData.storeName} 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={e => setFormData({...formData, storeName: e.target.value})} required 
              />
            </div>

          {/* SHOP NO & CATEGORY */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Shop No.</label>
              <input 
                name="shopNumber" value={formData.shopNumber} 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                onChange={e => setFormData({...formData, shopNumber: e.target.value})} required 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Category</label>
              <select 
                name="category" value={formData.category} 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                onChange={e => setFormData({...formData, category: e.target.value})} required
              >
                <option value="">Select</option>
                <option value="Fashion">Fashion</option>
                <option value="Dining">Dining</option>
                <option value="Tech">Tech</option>
              </select>
            </div>
          </div>

          {/* OWNER NAME */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Owner Name</label>
            <input 
              name="ownerName" value={formData.ownerName} 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
              onChange={e => setFormData({...formData, ownerName: e.target.value})} 
            />
          </div>


          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">
            <button type="submit" className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 ${editId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {editId ? 'Update Details' : 'Register Store'}
            </button>
            {editId && (
              <button 
                type="button"
                onClick={() => {
                  setEditId(null); 
                  setFormData({storeName:'', category:'', shopNumber:'', ownerName:'', description:'', image:''});
                }} 
                className="bg-gray-100 text-gray-600 px-4 rounded-xl font-bold hover:bg-gray-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

      </aside>
      {/* MAIN CONTENT: TABLE DIRECTORY */}
      <main className="flex-1 p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Mall Directory</h2>
          
          <div className="relative w-full md:w-80">
            <input 
              type="text" placeholder="Search by name..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Shop No.</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Store Name</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Owner</th>
                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stores
                .filter(s => s.storeName.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(store => (
                  <tr key={store._id} className="hover:bg-blue-50/40 transition-colors group">
                    <td className="px-6 py-5">
                      <span className="font-mono text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100">
                        {store.shopNumber}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-gray-900">{store.storeName}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{store.category}</p>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600 font-medium">
                      {store.ownerName || '—'}
                    </td>
                    
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => handleEdit(store)} 
                          className="text-xs font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(store._id)} 
                          className="text-xs font-black text-red-400 hover:text-red-600 uppercase tracking-widest"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          
          {/* Empty State */}
          {stores.length === 0 && (
            <div className="py-20 text-center text-gray-400 font-medium">
              The directory is empty. Add your first store to begin.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StoreManagement;