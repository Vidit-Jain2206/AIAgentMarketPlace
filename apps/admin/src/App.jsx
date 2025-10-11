import "./App.css";
import CategoryForm from "./CategoryForm";
import { AgentForm } from "./AgentForm";
import { useEffect, useState } from "react";
import { getAllCategories } from "./api/category";

function App() {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryChanges, setCategoryChanges] = useState(false);
  console.log("categories", categories);
  useEffect(() => {
    async function fetchCategories() {
      try {
        setCategoriesLoading(true);
        const response = await getAllCategories();
        setCategories(response);
        setCategoriesLoading(false);
      } catch (error) {
        setCategoriesLoading(false);

        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, [categoryChanges]);

  if (categoriesLoading) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }
  return (
    <>
      {/* // category form */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <CategoryForm setCategoryChanges={setCategoryChanges} />
        <AgentForm categories={categories} />
      </div>

      {/* agent form */}
    </>
  );
}

export default App;
