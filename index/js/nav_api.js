const backEndBaseUrl = "http://127.0.0.1:8000"
const frontEndBaseUrl = "http://127.0.0.1:5500"

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

//닉네임 형식 함수
function checkId(asValue) {
    const regid = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;
    return regid.test(asValue);
}

async function onSignUp() {
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    const password2 = document.getElementById('inputPassword2').value;
    const nickname = document.getElementById('inputNickname').value;

    //정규표현식 비밀번호 8자리 대소문자, 특수문자포함
    const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    //닉네임 형식 체크
    if (!checkId(nickname)) {
        alert("닉네임은 2~10자사이 영문, 숫자, 특수문자(._-)만 사용가능합니다.")
        $('#inputNickname').focus()
        $('#inputNickname').val('')
        return;
    }
    //비밀번호 형식 체크
    if (!password.match(regExp)) {
        alert('비밀번호는 최소8자리 대소문자,특수문자 포함 입력해주세요.')
        $('#inputPassword').focus()
        $('#inputPassword').val('')
        $('#inputPassword2').val('')
        return;
    }
    if (password == password2) {
        const response = await fetch(`${backEndBaseUrl}/users/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept:"application/json",
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "nickname": nickname,
            })
        }
        )
        response_json = await response.json()

        if (response.status == 200){
            alert("회원가입 성공")
            loginModalView()
        }else {
            //유효하지 않은 이메일 도메인 사용시
            console.log(response_json)
            alert(response_json["error"])
            $('#inputEmail').focus()
            $('#inputEmail').val('')
            return;
        }
    }else{
        alert("재입력한 비밀번호가 일치하지 않습니다.")
    }
}

loginSubmitBtn.addEventListener("click", (e) => {
    onLogin()
}
)

logoutBtn.addEventListener("click", (e) => {
    onLogout()
}
)

async function onLogin() {
    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value

    if (email === ''){
        alert('이메일을 입력해주세요')
        $('#loginEmail').focus()
        return
    }

    if (password === ''){
        alert('비밀번호를 입력해주세요')
        $('#loginPassword').focus()
        return
    }

    const loginData = {
        email: email,
        password: password
    }

    const response = await fetch(`${backEndBaseUrl}/users/api/token`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(loginData)
    }
    )
    response_json = await response.json()

    if (response.status == 200) {
        localStorage.setItem("access_token", response_json.access)
        localStorage.setItem("refresh_token", response_json.refresh)

        // 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
        // accessToken 에서 payload를 가져오는 코드-
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);

        alert("로그인 성공!")
        window.location.reload()
    } else {
        alert('이메일 / 비밀번호가 일치하지 않습니다.')
    }
}

// 페이지를 다시 로딩 하면 벌어지는 일들!
window.onload = () => {
    const payload = JSON.parse(localStorage.getItem("payload"));
    // 아직 access 토큰의 인가 유효시간이 남은 경우
    if (payload.exp > (Date.now() / 1000)) {

    } else {
        // 인증 시간이 지났기 때문에 다시 refreshToken으로 다시 요청을 해야 한다.
        const requestRefreshToken = async (url) => {
            const response = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({
                    "refresh": localStorage.getItem("refresh_token")
                })
            }
            );
            return response.json();
        };

        // 다시 인증 받은 accessToken을 localStorage에 저장하자.
        requestRefreshToken(`${backEndBaseUrl}/users/api/token/refresh`).then((data) => {
            // 새롭게 발급 받은 accessToken을 localStorage에 저장
            const accessToken = data.access;
            localStorage.setItem("access_token", accessToken);
        });
    }
};

function onLogout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("payload")
    alert("로그아웃 하셨습니다.")
    window.location.reload()
}