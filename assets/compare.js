document.addEventListener('DOMContentLoaded', () => {
  const COMPARE_LIST_KEY = 'compareList'; // Define a constant for the key

  // --- Helper Functions ---
  function getCompareList() {
    return JSON.parse(localStorage.getItem(COMPARE_LIST_KEY)) || [];
  }

  function saveCompareList(list) {
    localStorage.setItem(COMPARE_LIST_KEY, JSON.stringify(list));
  }

  // Updates the visual state of a single compare button
  function updateButtonState(button, handle, isAdded) {
    if (isAdded) {
      button.classList.add('is-added-to-compare');
      button.setAttribute('aria-label', 'Added to compare!');
    } else {
      button.classList.remove('is-added-to-compare');
      button.setAttribute('aria-label', 'Compare products'); // Reset to original label
    }
  }

  // --- Main Logic ---

  // 1. Initialize button states on page load
  const compareButtons = document.querySelectorAll('.button-compare');
  const currentCompareList = getCompareList();

  compareButtons.forEach(button => {
    const handle = button.dataset.productHandle;
    if (currentCompareList.includes(handle)) {
      updateButtonState(button, handle, true); // Mark as added if already in list
    } else {
      updateButtonState(button, handle, false); // Ensure correct initial state
    }

    // 2. Add click event listener to each button
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); 

      const handle = button.dataset.productHandle;
      let compareList = getCompareList();

      if (!compareList.includes(handle)) {
        // Product not in list, so add it
        compareList.push(handle);
        saveCompareList(compareList);
        updateButtonState(button, handle, true); // Update button to 'added' state
        // Optional: Temporarily show a message
        // console.log(`${handle} added to compare!`);

      } else {
        // Product is already in list, do nothing or remove it
        // For this request, we'll just acknowledge it's there or remove it.
        // Let's make it toggle for better UX: if already added, click again to remove.
        compareList = compareList.filter(h => h !== handle); // Remove from list
        saveCompareList(compareList);
        updateButtonState(button, handle, false); // Update button to original state
        // console.log(`${handle} removed from compare!`);
      }
    });
  });
});