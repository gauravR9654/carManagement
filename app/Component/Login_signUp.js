import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { base_Url_local, postData } from '../api/Constant';

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const router = useRouter();
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', password: '', email: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isLogin) {
        try{
            console.log("Logging in with:", formData);
            const response = await postData(`${base_Url_local}login`,formData)
            if(response){
              localStorage.setItem("user",response?.user?._id)  
              router.push('/dashboard')

            }
        }catch(error){
        window.alert(error?.response?.data?.message)
        console.log("Logging error:", error);
        }
   
    } else {
      console.log("Signing up with:", formData);
      try{
        console.log("Logging in with:", formData);
        const response = await postData(`${base_Url_local}signup`,formData)
        if(response){
            // router.push('/dashboard')
            window.alert("User Signup successfullyy ")
            console.log("user Signup successfullyy");
            setFormData({username: '', password: '', email: ''})
        }
    }catch(error){
        console.log("Logging error:", error);
        window.alert(error?.response?.data?.message)

    }
      // Implement signup logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white text-black p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Email"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={toggleForm}
              className="text-blue-500 hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
