const handleSubmit = async (event) => {
    event.preventDefault(); 

    //get info from form
    console.log("run");
    const form = event.target;
    const data = {
        name: form.elements["name"].value,    
        address: form.elements["address"].value,
        phone: form.elements["phone"].value,
        photo: form.elements["photo"].value
    };
    if(data.photo === "") {
        data.photo = "images/no_image.png";
    }
    // send a request to create a new restaurant
    fetch(`/api/restaurants`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...data
        })
    }).then(() => {
        window.location.href = '/restaurants';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-restaurant-form');
    form.addEventListener('submit', handleSubmit);
});
