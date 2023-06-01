$("#login-form").submit(async (e) => {
    e.preventDefault();

    $(".login-page__error").css("display", "none");

    const username = e.target.querySelector('input[name="username"]').value;
    const password = e.target.querySelector('input[name="password"]').value;

    const response = await fetch("http://localhost:3000/logUser", {
        method: "POST",
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (data.error) {
        console.log(data.error);
        $(".login-page__error").css("display", "block");
        $(".login-page__error").html(data.error);
    } else {
        window.location.href = "./register-car.html";
    }
});

$("#register-form").submit(async (e) => {
    e.preventDefault();

    $(".register-page__error").css("display", "none");

    const name = e.target.querySelector('input[name="name"]').value;
    const username = e.target.querySelector('input[name="username"]').value;
    const password = e.target.querySelector('input[name="password"]').value;

    const response = await fetch("http://localhost:3000/createUser", {
        method: "POST",
        body: JSON.stringify({
            name,
            username,
            password
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (data.error) {
        console.log(data.error);
        $(".register-page__error").css("display", "block");
        $(".register-page__error").html(data.error);
    } else {
        window.location.href = "./login.html";
    }
});

$("#register-car-form").submit(async (e) => {
    e.preventDefault();

    $(".register-car-page__error").css("display", "none");

    const brand = e.target.querySelector('input[name="brand"]').value;
    const model = e.target.querySelector('input[name="model"]').value;
    const year = e.target.querySelector('input[name="year"]').value;
    const stock = e.target.querySelector('input[name="stock"]').value;

    const response = await fetch("http://localhost:3000/createCar", {
        method: "POST",
        body: JSON.stringify({
            brand,
            model,
            year,
            stock,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (data.error) {
        console.log(data.error);
        $(".register-car-page__error").css("display", "block");
        $(".register-car-page__error").html(data.error);
    } else {
        window.location.href = "./index.html";
    }
});

let cars;

fetch('/getCars').then((response) => {
    response.json().then((data) => {
        cars = data;
        displayCars();
        carsSelector();
    })
})

function displayCars() {
    const carsContainer = document.getElementById('carsContainer');
    if (!carsContainer) {
        return;
    }

    cars.forEach((car) => {
        const carAvailable = {
            disableButton: car.stock === 0 ? "disabled" : "",
            buttonText: car.stock === 0 ? "Esgotado" : "Comprar",
        }
        const carElement = document.createElement('div');
        carElement.innerHTML = `
                <div class="stock__item">                    
                <div class="stock__item__info">
                <h3>${car.model}</h3>
                <p class="fw-700">Estoque: ${car.stock}</p> 
                <p>${car.year}</p>
                <p>${car.brand}</p>
                <button id="${car._id}" class="car_buy" onclick="buyCar()" ${carAvailable.disableButton}>
                    ${carAvailable.buttonText}
                </button>
                </div> 
                </div>                      
            `;
        carsContainer.appendChild(carElement);
    });
}

function carsSelector() {
    const carsSelector = document.getElementById('carsSelector');
    if (!carsSelector) {
        return;
    }

    cars.forEach((car) => {
        carsSelector.innerHTML = `
                <option value="${car._id}">${car.model}</option>                     
            `;
    });
}

$("#cars-selector-form").submit((e) => {
    e.preventDefault();

    $("#cars-selector-form").css("display", "none");
    $("#change-car-form").css("display", "flex");

    const _id = e.target.carId.value;

    const car = cars.find((car) => car._id === _id);

    $("#change-car-form input[name='_id']").val(car._id);
    $("#change-car-form input[name='brand']").val(car.brand);
    $("#change-car-form input[name='model']").val(car.model);
    $("#change-car-form input[name='year']").val(car.year);
    $("#change-car-form input[name='stock']").val(car.stock);
});

$("#change-car-form").submit(async (e) => {
    e.preventDefault();

    $(".register-car-page__return-msg").css("display", "none");

    const _id = e.target._id.value;
    const brand = e.target.brand.value;
    const model = e.target.model.value;
    const year = e.target.year.value;
    const stock = e.target.stock.value;

    const response = await fetch("http://localhost:3000/updateCar", {
        method: "PUT",
        body: JSON.stringify({
            _id,
            brand,
            model,
            year,
            stock,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (data.error) {
        console.log(data.error);
        $(".register-car-page__return-msg").css("display", "block");
        $(".register-car-page__return-msg").html(data.error);
    } else {
        $(".register-car-page__return-msg").html("Carro atualizado com sucesso!");
        $(".register-car-page__return-msg").css("display", "block");
        $(".register-car-page__return-msg").css("color", "green");
    }
});


async function buyCar() {
    let carID = event.target.id;
    const response = await fetch("http://localhost:3000/buyCar", {
        method: "PATCH",
        body: JSON.stringify({
            _id: carID
        }),
        headers: {
            "Content-Type": "application/json",
        },

    });

    const data = await response.json();

    if (data.error) {
        console.log(data.error);
    } else {
        alert(`${data.model} comprado com sucesso!`);
        window.location.href = "./index.html";
    }
}