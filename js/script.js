
function customerSignUp() {
    let result = validateForm();
    if (result) {
        let userName, email, password, confirmPass;
        userName = document.getElementById('userName').value;
        email = document.getElementById('email').value;
        password = document.getElementById('password').value;
        console.log(password);
        confirmPass = document.getElementById('confirmPass').value;
        localStorage.setItem("userName", userName);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("confirmPass", confirmPass);
        // const app = initializeApp(firebaseConfig);

        // createUserWithEmailAndPassword(auth, email, password)
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                
                document.getElementById('customerSignUpBtn').addEventListener("click", window.location.href = 'Customer-Login.html')
                console.log(res);
            })
            .catch(error => {
                alert(error.message);
            })


    }

}

function customerLogin() {
    let result = validateLogin();
    if (result) {
        let userEmail, userPassword, email, password;
        userEmail = document.getElementById('email').value;
        userPassword = document.getElementById('password').value;
        email = localStorage.getItem("email");
        password = localStorage.getItem("password");
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log("User: ", user);
                alert("Login Success");
                window.location.href = 'Customers-details.html'
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("ErrorMessage: ", errorMessage);
                console.log("ErrorCode: ", errorCode);

            });
    //     if (userEmail == email && userPassword == password) {

    //         console.log("Login Success");
    //         window.location.href = 'Customers-details.html'
    //         alert(userName);
    //     } else {
    //         alert("Incorrect details");
    //     }
    // }

}
}



function validateForm() {
    let userName, email, password, confirmPass, re;
    userName = document.getElementById("userName").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    confirmPass = document.getElementById("confirmPass").value;
    re = /\S+@\S+\.\S+/;

    if (userName == "") {
        document.getElementById('userError').innerText = 'User name can not be blank';
        return false;
    }
    if (email == "") {
        document.getElementById('emailError').innerText = 'Email id can not be blank';
        return false;
    }

    if (!re.test(email)) {
        document.getElementById('emailError').innerText = 'Please enter valid email id';
        return false;
    }
    if (password == "") {
        document.getElementById('passError').innerText = 'Password can not be blank';
        return false;
    }

    if (password.length < 6) {
        document.getElementById('passError').innerText = 'Password should be atleast 6 character long';
        return false;

    }
    if (confirmPass != password) {
        document.getElementById('cpassError').innerText = 'Password must be same';
        return false;
    }

    var response = grecaptcha.getResponse();

    if (response.length == 0) {
        document.getElementById('captchaError').innerText = "Please verify captcha"
        return false;
    }


    return true;



}

function validateLogin() {
    let email, password, re;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    re = /\S+@\S+\.\S+/;

    if (email == "") {
        document.getElementById('emailError').innerText = 'Email id can not be blank';
        return false;
    }
    if (!re.test(email)) {
        document.getElementById('emailError').innerText = 'Please enter valid email id';
        return false;
    }
    if (password == "") {
        document.getElementById('passError').innerText = 'Password can not be blank';
        return false;
    }
    return true;

}