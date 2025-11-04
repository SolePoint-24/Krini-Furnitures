document.addEventListener('DOMContentLoaded', () => {
  // Function to add a product to the compare list
  function addToCompare(handle) {
    let compareList = JSON.parse(localStorage.getItem('compareList')) || [];
    if (!compareList.includes(handle)) {
      compareList.push(handle);
      localStorage.setItem('compareList', JSON.stringify(compareList));
      alert(handle + ' added to compare!'); // Or update an icon
    } else {
      alert(handle + ' is already in the list.');
    }
  }

  // Find all compare buttons on the page
  const compareButtons = document.querySelectorAll('.button-compare');
  
  // Add a click event listener to each button
  compareButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // ▼▼▼ ADD THESE TWO LINES ▼▼▼
      e.preventDefault();    // Stops default button behavior
      e.stopPropagation(); // Stops the click from bubbling up to the <a> link

      // Get the handle from the 'data-product-handle' attribute
      const handle = button.dataset.productHandle;
      if (handle) {
        addToCompare(handle);
      }
    });
  });
});