import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";


function ShopCreateEditPage() {
  const navigate = useNavigate();


  const [shopName, setShopName] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const [loading, setLoading] = useState(true);



  const fetchUser = async () => {
    try {
      const response = await api.get(
        "/users/me/"
      );


      if (response.data.shop_name) {
        setIsEdit(true);

        setShopName(
          response.data.shop_name
        );
      }


    } catch (error) {
      console.error(error);

      alert(
        "Failed to load user information."
      );

    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchUser();

  }, []);



  const handleSubmit = async () => {

    if (!shopName.trim()) {

      alert(
        "Shop name is required."
      );

      return;
    }



    try {

      if (isEdit) {

        await api.patch(
          "/shops/me/",
          {
            name: shopName,
          }
        );


        alert(
          "Shop updated successfully."
        );


      } else {

        await api.post(
          "/shops/",
          {
            name: shopName,
          }
        );


        alert(
          "Shop created successfully."
        );

      }



      window.location.reload();


    } catch (error) {

      console.error(error);


      const detail =
        error.response?.data?.detail;



      if (detail === "only shop owner allowed") {

        alert(
          "Only shop owners can manage a shop."
        );


      } else if (
        detail === "shop already exists"
      ) {

        alert(
          "You already have a shop."
        );


      } else if (
        detail === "name required"
      ) {

        alert(
          "Shop name is required."
        );


      } else if (
        detail === "shop name already exists"
      ) {

        alert(
          "This shop name is already taken."
        );


      } else if (
        detail === "shop does not exist"
      ) {

        alert(
          "You don't have a shop yet."
        );


      } else {

        alert(
          "Something went wrong."
        );

      }

    }

  };



  if (loading) {

    return (
      <div>
        Loading...
      </div>
    );

  }



  return (

    <div>

      <h1>
        {
          isEdit
            ? "Edit Shop"
            : "Create Shop"
        }
      </h1>



      <div>

        <label>
          Shop Name
        </label>


        <br />


        <input
          type="text"
          value={shopName}
          onChange={(e) =>
            setShopName(
              e.target.value
            )
          }
          style={{
            width: "300px",
            padding: "10px",
            marginTop: "10px",
          }}
        />


      </div>



      <br />



      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
        }}
      >
        {
          isEdit
            ? "Update Shop"
            : "Create Shop"
        }
      </button>



    </div>

  );

}


export default ShopCreateEditPage;