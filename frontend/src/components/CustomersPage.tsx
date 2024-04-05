import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import { sunbaseData } from "../constant_data";

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("first_name");
  const sunbaseAuthToken = useRef("");

  const handleDeleteCustomer = async (customerId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/customers/${customerId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setCustomers(customers.filter((customer: any) => customer.id !== customerId));
      } catch (error) {
        console.error("Failed to delete customer:", error);
      }
    }
  };

  const handleSync = async () => {
    try {
      // Fetch customer list using the obtained token

      //   await fetch("https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list", {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${sunbaseAuthToken.current}`,
      //     },
      //   });

      const customers = sunbaseData;

      console.log("Customer list:", customers);

      await axios.post("http://localhost:8080/api/customers/sync", customers, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      console.log("Customer list synced successfully.");
    } catch (error) {
      console.error("Failed to sync customer list:", error);
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/customers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setCustomers(response.data);

        // Authenticate user to get token
        const authResponse = await fetch("https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp", {
          method: "POST",
          body: JSON.stringify({
            login_id: "test@sunbasedata.com",
            password: "Test@123",
          }),
        });
        const authData = await authResponse.json();
        sunbaseAuthToken.current = authData.access_token;
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer: any) => {
    const fieldValue = customer[selectedFilter].toLowerCase();
    return fieldValue.includes(searchField.toLowerCase());
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Customers</h2>
      <div className="flex mb-4">
        <Link to="/add-customer" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Customer
        </Link>{" "}
        <select
          className="bg-gray-200 border border-gray-300 rounded px-4 py-2.5 mx-4"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${selectedFilter}`}
          className="bg-gray-200 border border-gray-300 rounded px-4 py-2"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        />
        <button
          onClick={handleSync}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
        >
          Sync
        </button>
      </div>
      <table className="table-aut mt-5">
        <thead>
          <tr>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">State</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer: any) => (
            <tr key={customer.id}>
              <td className="border px-4 py-2">{customer.first_name}</td>
              <td className="border px-4 py-2">{customer.last_name}</td>
              <td className="border px-4 py-2">{customer.address}</td>
              <td className="border px-4 py-2">{customer.city}</td>
              <td className="border px-4 py-2">{customer.state}</td>
              <td className="border px-4 py-2">{customer.email}</td>
              <td className="border px-4 py-2">{customer.phone}</td>
              <td className="border px-4 py-2 flex flex-row">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-2 mx-1 rounded"
                  onClick={() => handleDeleteCustomer(customer.id)}
                >
                  <FaTrash />
                </button>
                <Link
                  to={{
                    pathname: "/add-customer",
                    state: { initialValues: customer, heading: "Edit Customer Details" },
                  }}
                  className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-2 px-2 mx-1 rounded"
                >
                  <FaEdit />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersPage;
