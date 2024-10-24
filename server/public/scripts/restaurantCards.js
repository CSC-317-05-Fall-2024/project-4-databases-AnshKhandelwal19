/* This file should contain definitions for deleteRestaurantCard,
    and js to attach it as a handler per card.
*/

document.addEventListener("DOMContentLoaded", () => {
    const btnList = document.querySelectorAll('.delete-button');
    for(let btn of btnList) {
        btn.addEventListener("click", () => {
            // Find the closest restaurant-container parent
            const restaurantDiv = btn.closest('.restaurant-container');
            deleteRestaurantCard(restaurantDiv);
        });
    }
});

const deleteRestaurantCard = (divToDelete) => {
    // Remove the div from the DOM
    const id = divToDelete.dataset.value;
    fetch(`/api/restaurants/${id}`, {
        method: "DELETE"
    }).then(() => {
        window.location.reload();
    });
};
