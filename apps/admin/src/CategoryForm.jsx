import React, { useState } from "react";
import "./CategoryForm.css";
import { createCategory } from "./api/category";

export default function CategoryForm({ setCategoryChanges }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = (value) => {
    if (!value.trim()) return "Category name is required.";
    if (value.trim().length < 2) return "Use at least 2 characters.";
    if (value.trim().length > 60) return "Use at most 60 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validate(name);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await createCategory({ categoryName: name });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Failed to create category");
      }
      setSuccess("Category created successfully");
      setName("");
      setCategoryChanges((prev) => !prev);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <div className="container">
        <div className="form-header">
          <h3>Create Category</h3>
          <p>Add a new category for agents</p>
        </div>

        <label htmlFor="categoryName">Category Name</label>
        <input
          id="categoryName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Productivity"
          disabled={loading}
        />

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Category"}
        </button>
      </div>
    </form>
  );
}
