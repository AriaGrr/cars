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

