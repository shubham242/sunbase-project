import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
interface AddCustomerProps {
  initialValues: any;
  heading: string;
}
const AddCustomer: React.FC<AddCustomerProps> = () => {
  const history = useHistory();
  const location = useLocation();

  const initialValues = (location.state as any)?.initialValues || {};
  const heading = (location.state as any)?.heading || "Customer Details";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const handleFormSubmit = async (data: any) => {
    try {
      if (initialValues) {
        // If initialValues exist, it's an edit operation
        await axios.put(`http://localhost:8080/api/customers/${initialValues.id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
      } else {
        // Otherwise, it's an add operation
        await axios.post("http://localhost:8080/api/customers", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
      }
      history.push("/customers");
    } catch (error) {
      console.error("Failed to add customer:", error);
    }
  };

  const customInput = (label: string, value: string) => {
    let validationRules: Record<string, any> = { required: true };

    if (
      value === "firstName" ||
      value === "lastName" ||
      value === "street" ||
      value === "address" ||
      value === "city" ||
      value === "state"
    ) {
      validationRules.minLength = 3;
    } else if (value === "phone") {
      validationRules.pattern = /^\d+$/;
    } else if (value === "email") {
      validationRules.pattern = /^\S+@\S+\.\S+$/;
    }

    return (
      <div className="my-2">
        <label className="block text-sm font-bold mb-2">{label}</label>
        <input
          className={` border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
            errors[value] ? "border-red-500" : ""
          }`}
          type="text"
          placeholder={label}
          {...register(value, validationRules)}
        />
        {!errors[value] && <span>&nbsp;</span>}
        {errors[value] && (
          <span className=" text-red-500 text-sm">
            {value === "phone"
              ? "Number is not valid"
              : value === "email"
              ? "Email is not valid"
              : `${label} is required`}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">{heading}</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">{customInput("First Name", "firstName")}</div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">{customInput("Last Name", "lastName")}</div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">{customInput("Street", "street")}</div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">{customInput("Address", "address")}</div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">{customInput("City", "city")}</div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">{customInput("State", "state")}</div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">{customInput("Email", "email")}</div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">{customInput("Phone", "phone")}</div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
