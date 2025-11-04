document.addEventListener('DOMContentLoaded', () => {
  const COMPARE_LIST_KEY = 'compareList';

  // --- Helper Functions ---
  function getCompareList() {
    return JSON.parse(localStorage.getItem(COMPARE_LIST_KEY)) || [];
  }

  function saveCompareList(list) {
    localStorage.setItem(COMPARE_LIST_KEY, JSON.stringify(list));
    // --- ▼▼▼ NEW ▼▼▼ ---
    // Every time we save, update the header count
    updateCompareCount();
    // --- ▲▲▲ END NEW ▲▲▲ ---
  }
  
  // --- ▼▼▼ NEW FUNCTION ▼▼▼ ---
  /**
   * Finds the compare count badge in the header and updates it.
   */
  function updateCompareCount() {
    const countElement = document.querySelector('.compare-count');
    if (countElement) {
      const compareList = getCompareList();
      countElement.textContent = compareList.length;
      
      // Show or hide the badge if the count is > 0
      if (compareList.length > 0) {
        countElement.style.display = 'flex';
      } else {
        countElement.style.display = 'none';
      }
    }
  }
  // --- ▲▲▲ END NEW FUNCTION ▲▲▲ ---

  // Updates the visual state of a single compare button
  function updateButtonState(button, handle, isAdded) {
    if (isAdded) {
      button.classList.add('is-added-to-compare');
    } else {
      button.classList.remove('is-added-to-compare');
    }
  }

  // --- Main Logic ---

  // 1. Initialize button states AND header count on page load
  const compareButtons = document.querySelectorAll('.button-compare');
  const currentCompareList = getCompareList();

  // --- ▼▼▼ NEW ▼▼▼ ---
  updateCompareCount(); // Update count as soon as the page loads
  // --- ▲▲▲ END NEW ▲▲▲ ---

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
        saveCompareList(compareList); // This now calls updateCompareCount()
        updateButtonState(button, handle, true); // Update button to 'added' state
      } else {
        // Product is already in list, click again to remove (toggle)
        compareList = compareList.filter(h => h !== handle); // Remove from list
        saveCompareList(compareList); // This now calls updateCompareCount()
        updateButtonState(button, handle, false); // Update button to original state
      }
    });
  });
});