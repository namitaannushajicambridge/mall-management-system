import React from 'react';

const StoreCard = ({ store, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{store.storeName}</h3>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600">
            {store.category}
          </span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-md font-semibold ${
          store.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {store.status || 'Pending'}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600 mb-6">
        <p><span className="font-semibold text-gray-400">Shop:</span> {store.shopNumber}</p>
        <p><span className="font-semibold text-gray-400">Owner:</span> {store.ownerName}</p>
      </div>

      <div className="flex gap-3 border-t pt-4 border-gray-50">
        <button className="flex-1 text-sm font-medium py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition">
          Edit
        </button>
        <button 
          onClick={() => onDelete(store._id)}
          className="flex-1 text-sm font-medium py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default StoreCard;