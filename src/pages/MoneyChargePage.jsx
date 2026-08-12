import { useState } from "react";
import api from "../services/api";

function MoneyChargePage() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCharge = async () => {
    setMessage("");
    setError("");

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      await api.post("/users/charge-money/", {
        amount: Number(amount),
      });

      setMessage("Money charged successfully.");
      setAmount("");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.detail ||
        "Failed to charge money."
      );
    }
  };

  return (
    <div>
      <h1>Money Charge</h1>

      <p>
        Enter the amount you want to charge.
      </p>

      <input
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />

      <button
        type="button"
        onClick={handleCharge}
        style={{
          marginLeft: "10px",
        }}
      >
        Charge Money
      </button>

      {message && (
        <p>
          {message}
        </p>
      )}

      {error && (
        <p>
          {error}
        </p>
      )}
    </div>
  );
}

export default MoneyChargePage;