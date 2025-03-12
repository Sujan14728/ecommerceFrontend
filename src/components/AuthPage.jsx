import { useState } from "react";
import { userLogin, userSignup } from "../lib/api";
import { Button, Input, Select } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../lib/store/slices/authSlice";

const AuthPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: "",
    country: "",
    userType: "customer", // Default type
    profileUrl: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await userLogin({
          email: formData.email,
          password: formData.password,
        });
        const { token, data } = response;
        dispatch(login({ token, user: data }));
      } else {
        await userSignup(formData);
      }
      alert(isLogin ? "Login successful" : "Signup successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Signup"}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form className="space-y-4">
        {!isLogin && (
          <>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="input"
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="input"
            />
            <Input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input"
            />
            <Input
              type="text"
              name="address1"
              placeholder="Address 1"
              value={formData.address1}
              onChange={handleChange}
              required
              className="input"
            />
            <Input
              type="text"
              name="address2"
              placeholder="Address 2"
              value={formData.address2}
              onChange={handleChange}
              className="input"
            />
            <Input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="input"
            />
            <Input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
              className="input"
            />
            <Input
              type="text"
              name="postal"
              placeholder="Postal Code"
              value={formData.postal}
              onChange={handleChange}
              required
              className="input"
            />
            <Input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
              className="input"
            />
            <Select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </Select>
          </>
        )}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input"
        />
        <Button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {isLogin ? "Login" : "Signup"}
        </Button>
      </form>
      <div className=" mt-4">
        {isLogin ? (
          <div className="flex gap-2">
            <span>Don't have an account?</span>
            <button onClick={() => setIsLogin(false)} className="text-blue-500">
              Sign up
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <span>Already have an account?</span>
            <button onClick={() => setIsLogin(true)} className="text-blue-500">
              Log in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
