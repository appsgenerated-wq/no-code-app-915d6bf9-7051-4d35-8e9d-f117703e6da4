import React, { useState, useEffect } from 'react';
import { ArrowRightOnRectangleIcon, UserCircleIcon, PlusIcon, BuildingStorefrontIcon, PencilSquareIcon, TrashIcon, BanknotesIcon, TagIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [myRestaurant, setMyRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (user.role === 'customer' || user.role === 'admin') {
          console.log('Fetching all restaurants for', user.role);
          const { data } = await manifest.from('Restaurant').find({ include: ['owner'] });
          setRestaurants(data);
        } else if (user.role === 'owner') {
          console.log('Fetching restaurants for owner:', user.id);
          const { data } = await manifest.from('Restaurant').find({
            filter: { owner: { id: user.id } },
            include: ['menuItems']
          });
          if (data.length > 0) {
            setMyRestaurant(data[0]);
            setMenuItems(data[0].menuItems || []);
          } else {
            setMyRestaurant(null); // Owner might not have a restaurant yet
          }
        }
      } catch (e) {
        console.error('Failed to fetch data:', e);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, manifest]);

  const handleCreateMenuItem = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItemData = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        category: formData.get('category'),
        restaurant: myRestaurant.id
    };
    
    try {
        const newItem = await manifest.from('MenuItem').create(newItemData);
        setMenuItems(prev => [...prev, newItem]);
        e.target.reset();
    } catch (error) {
        console.error("Failed to create menu item:", error);
        alert("Error: Could not create menu item.");
    }
  };

  const handleDeleteMenuItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
        try {
            await manifest.from('MenuItem').delete(itemId);
            setMenuItems(prev => prev.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Failed to delete menu item:", error);
            alert("Error: Could not delete menu item.");
        }
    }
  };

  const renderHeader = () => (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
             <BuildingStorefrontIcon className="h-8 w-8 text-blue-600" />
             <span className="text-xl font-bold text-gray-900">FoodApp Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                <UserCircleIcon className="h-6 w-6 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{user.email} ({user.role})</span>
            </div>
            <a href="/admin" target="_blank" className="text-sm font-medium text-gray-600 hover:text-blue-600">Admin Panel</a>
            <button onClick={onLogout} className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const renderCustomerDashboard = () => (
    <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Restaurants Near You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map(r => (
                <div key={r.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                    <img src={r.logo?.url || 'https://placehold.co/600x400'} alt={r.name} className="h-48 w-full object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900">{r.name}</h3>
                        <p className="text-gray-600 mt-2 text-sm">{r.description}</p>
                        <p className="text-gray-500 mt-2 text-xs">{r.address}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderOwnerDashboard = () => (
     <div>
        {!myRestaurant ? (
            <div className="text-center bg-white p-12 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800">No Restaurant Found</h2>
                <p className="mt-2 text-gray-600">Please create your restaurant profile in the Admin Panel.</p>
                <a href="/admin/restaurants/new" target="_blank" className="mt-6 inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                    Create Restaurant
                </a>
            </div>
        ) : (
            <div>
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                     <h2 className="text-3xl font-bold text-gray-900">Manage: {myRestaurant.name}</h2>
                     <p className="text-gray-600 mt-1">{myRestaurant.address}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Menu Items</h3>
                        <div className="space-y-4">
                            {menuItems.length > 0 ? menuItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <img src={item.image?.small?.url || 'https://placehold.co/100x100'} alt={item.name} className="h-16 w-16 rounded-md object-cover"/>
                                        <div>
                                            <p className="font-semibold text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-600">{item.description}</p>
                                            <p className="text-sm text-green-600 font-medium">${item.price}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDeleteMenuItem(item.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50">
                                        <TrashIcon className="h-5 w-5"/>
                                    </button>
                                </div>
                            )) : <p className="text-gray-500">No menu items yet. Add one using the form.</p>}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><PlusIcon className="h-6 w-6 mr-2"/> Add New Menu Item</h3>
                        <form onSubmit={handleCreateMenuItem} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                             <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea name="description" id="description" rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                            </div>
                             <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                <input type="number" name="price" id="price" step="0.01" min="0" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                             <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                <input type="text" name="category" id="category" placeholder="e.g., Appetizer, Main Course" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Add Item
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )}
     </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center text-gray-600">Loading dashboard...</div>
          ) : error ? (
            <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>
          ) : user.role === 'customer' || user.role === 'admin' ? (
            renderCustomerDashboard()
          ) : user.role === 'owner' ? (
            renderOwnerDashboard()
          ) : (
            <p>Invalid user role.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
