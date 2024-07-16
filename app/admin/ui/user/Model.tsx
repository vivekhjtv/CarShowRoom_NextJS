import { useState, useEffect } from 'react';

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

interface ModalProps {
  onClose: () => void;
  onAddItem: (newUser: User) => void;
  onEditItem: (updatedUser: User) => void;
  user?: User;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  onAddItem,
  onEditItem,
  user,
}) => {
  const [newUser, setNewUser] = useState<User>({
    _id: '',
    username: '',
    email: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    if (user) {
      setNewUser({ ...user, password: '' }); // Initialize password as empty string
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    const updatedUserData = { ...newUser };

    if (user && newUser.password === '') {
      delete updatedUserData.password; // Exclude password field if it's empty when editing
    }

    if (user) {
      fetch(`http://localhost:3000/api/register/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to edit user');
          }
          return response.json();
        })
        .then((data) => {
          onEditItem(data);
          onClose();
        })
        .catch((error) => {
          console.error('Error editing user:', error);
        });
    } else {
      fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to add user');
          }
          return response.json();
        })
        .then((data) => {
          setNewUser(data.user);
          onAddItem(data);
          onClose();
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          {user ? 'Edit User' : 'Add New User'}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!user && (
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <select
            name="role"
            value={newUser.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
          >
            {user ? 'Save Changes' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
