import { useState } from "react";

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    isShopOwner: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      password: formData.password,
      username: formData.username,
      role: formData.isShopOwner ? "SHOP_OWNER" : "PLAYER",
    };

    console.log(payload);
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
          <label>Username</label>
          <br />
          <input
            type="text"
            name="username"
            value={formData.username}
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