import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    isShopOwner: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    email: formData.email,
    password: formData.password,
    name: formData.name,
    role: formData.isShopOwner ? "SHOP_OWNER" : "PLAYER",
  };

  try {
    const response = await api.post("/users/signup/", data);

    console.log("Success:", response.data);
    alert("Signup success!");
    navigate("/login");
    
  } catch (error) {
    console.error("Error:", error.response?.data);
    alert("Signup failed!");
  }
};

  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>
            <input
              type="checkbox"
              name="isShopOwner"
              checked={formData.isShopOwner}
              onChange={handleChange}
            />
            Shop Owner
          </label>
        </div>

        <br />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default SignUpPage;