// Select all quantity control buttons
const decreaseButtons = document.querySelectorAll('.decrease-qty');
const increaseButtons = document.querySelectorAll('.increase-qty');
const quantitySpans = document.querySelectorAll('.qty');

// Add event listeners for decrease buttons
decreaseButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        let currentQty = parseInt(quantitySpans[index].textContent);
        if (currentQty > 0) {
            quantitySpans[index].textContent = currentQty - 1;
            updateTotal(); // Update total when quantity changes
        }
    });
});

// Add event listeners for increase buttons
increaseButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        let currentQty = parseInt(quantitySpans[index].textContent);
        quantitySpans[index].textContent = currentQty + 1;
        updateTotal(); // Update total when quantity changes
    });
});

// Function to update total based on current quantities
function updateTotal() {
    let total = 0;
    quantitySpans.forEach((qtySpan, index) => {
        let qty = parseInt(qtySpan.textContent);
        let price = parseFloat(document.querySelectorAll('.product-details p')[index].textContent.replace('₹', ''));
        total += qty * price;
    });
    document.querySelector('.total').textContent = `Total: ₹${total.toFixed(2)}`;
}
