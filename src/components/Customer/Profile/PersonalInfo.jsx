import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../../lib/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../utils/Loading";

const PersonalInfo = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user.user._id, userInfo);
      navigate(0);
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUserById(user.user._id);
        setUserInfo(data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  console.log(userInfo);

  return (
    <div className="w-full flex flex-col items-center gap-5 ">
      <h2 className="text-[20px] font-[500]">Personal Information</h2>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="form-wrap ">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <Input
                className="input-field"
                type="text"
                id="firstName"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-wrap ">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <Input
                type="text"
                id="phone"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-wrap ">
            <div className="form-group">
              <label htmlFor="address1">Address Line 1:</label>
              <Input
                type="text"
                id="address1"
                name="address1"
                value={userInfo.address1}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address2">Address Line 2:</label>
              <Input
                type="text"
                id="address2"
                name="address2"
                value={userInfo.address2}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-wrap ">
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <Input
                type="text"
                id="city"
                name="city"
                value={userInfo.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <Input
                type="text"
                id="state"
                name="state"
                value={userInfo.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-wrap ">
            <div className="form-group">
              <label htmlFor="postal">Postal Code:</label>
              <Input
                type="text"
                id="postal"
                name="postal"
                value={userInfo.postal}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <Input
                type="text"
                id="country"
                name="country"
                value={userInfo.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-wrap ">
            <div className="form-group">
              <label htmlFor="userType">User Type:</label>
              <Input
                type="text"
                id="userType"
                name="userType"
                value={userInfo.userType}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="profileUrl">Profile URL:</label>
              <Input
                type="text"
                id="profileUrl"
                name="profileUrl"
                value={userInfo.profileUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit">Update Information</button>
        </form>
      )}
    </div>
  );
};

export default PersonalInfo;
