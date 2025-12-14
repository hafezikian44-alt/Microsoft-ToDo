document.getElementById("createAccount").addEventListener("click", () => {
    document.getElementById("signupForm").style.display = "flex";
});


if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
}

/* =========================
   SIGN IN
========================= */
function signIn() {
    const email = document.getElementById("emailInput").value.trim();

    let users = JSON.parse(localStorage.getItem("users"));

    let userExists = users.find(u => u.email === email);

    if (userExists) {

        localStorage.setItem(
            "currentUser",
            JSON.stringify({ name: userExists.name })
        );

        window.location.href = "../Todo-master/index.html";   
    } else {
        document.getElementById("error").style.display = "block";
        document.getElementById("signupForm").style.display = "flex";
        document.getElementById("signupEmailInput").value = email;
    }
}

/* =========================
   SIGN UP
========================= */
function signUp() {
    const name = document.getElementById("userNameInput").value.trim();
    const email = document.getElementById("signupEmailInput").value.trim();

    if (!name || !email) {
        alert("fill all inputs!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"));

    if (users.find(u => u.email === email)) {
        alert("This email is already signed up!");
        return;
    }else if (users.find(u => u.name === name)){
         alert("This username is already signed up!");
        return;
    }

    users.push({ name, email });
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem(
        "currentUser",
        JSON.stringify({ name })
    );

    window.location.href = "../Todo-master/index.html";
}
