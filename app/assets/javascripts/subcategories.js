document.addEventListener("DOMContentLoaded", () => {
    const subcategoriesContainer = document.getElementById("subcategories");
    const addSubcategoryButton = document.getElementById("add_subcategory");

    let subcategoryIndex = subcategoriesContainer.children.length;

    // Agregar nueva subcategoría
    addSubcategoryButton.addEventListener("click", () => {
      const subcategoryFields = `
        <div class="subcategory_fields" data-index="${subcategoryIndex}">
          <label for="product_subcategory_${subcategoryIndex}_name">Subcategory Name</label>
          <input type="text" name="product[subcategory][${subcategoryIndex}][name]" id="product_subcategory_${subcategoryIndex}_name" placeholder="Subcategory Name">

          <label for="product_subcategory_${subcategoryIndex}_description">Description</label>
          <textarea name="product[subcategory][${subcategoryIndex}][description]" id="product_subcategory_${subcategoryIndex}_description" placeholder="Description"></textarea>

          <label for="product_subcategory_${subcategoryIndex}_price">Price</label>
          <input type="number" name="product[subcategory][${subcategoryIndex}][price]" id="product_subcategory_${subcategoryIndex}_price" placeholder="Price">

          <label for="product_subcategory_${subcategoryIndex}_src">Image Source</label>
          <input type="text" name="product[subcategory][${subcategoryIndex}][src]" id="product_subcategory_${subcategoryIndex}_src" placeholder="Image Source">

          <label for="product_subcategory_${subcategoryIndex}_alt">Image Alt Text</label>
          <input type="text" name="product[subcategory][${subcategoryIndex}][alt]" id="product_subcategory_${subcategoryIndex}_alt" placeholder="Image Alt Text">

          <button type="button" class="remove_subcategory">Remove</button>
        </div>
      `;
      subcategoriesContainer.insertAdjacentHTML("beforeend", subcategoryFields);
      subcategoryIndex++;
    });

    // Eliminar una subcategoría
    subcategoriesContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove_subcategory")) {
        event.target.parentElement.remove();
      }
    });
  });
