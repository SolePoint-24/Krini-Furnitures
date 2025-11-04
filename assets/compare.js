document.addEventListener('DOMContentLoaded', () => {
  const COMPARE_LIST_KEY = 'compareList';

  // --- Helper Functions ---
  function getCompareList() {
    return JSON.parse(localStorage.getItem(COMPARE_LIST_KEY)) || [];
  }

  function saveCompareList(list) {
    localStorage.setItem(COMPARE_LIST_KEY, JSON.stringify(list));
    
    // --- MODIFICATION ---
    // We no longer call updateCompareCount() here.
    // The script in header-actions.liquid will handle this.
    
    // --- Also, we must trigger the 'cart:updated' event ---
    // This tells the script in header-actions.liquid to run.
    document.dispatchEvent(new Event('cart:updated'));
  }

  // --- REMOVED ---
  // The updateCompareCount() function has been removed from this file.
  
  // Updates the visual state of a single compare button
  function updateButtonState(button, handle, isAdded) {
    if (isAdded) {
      button.classList.add('is-added-to-compare');
    } else {
      button.classList.remove('is-added-to-compare');
    }
  }

  // --- Main Logic ---

  // 1. Initialize button states on page load
  const compareButtons = document.querySelectorAll('.button-compare');
  const currentCompareList = getCompareList();
  
  // --- REMOVED ---
  // updateCompareCount() is no longer called on page load from this file.

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
        saveCompareList(compareList); // This now triggers the event
        updateButtonState(button, handle, true); 
      } else {
        // Product is already in list, click again to remove (toggle)
        compareList = compareList.filter(h => h !== handle); // Remove from list
        saveCompareList(compareList); // This now triggers the event
        updateButtonState(button, handle, false); 
      }
    });
  });
});
