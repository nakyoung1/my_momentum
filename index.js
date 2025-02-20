let user = "";
const image = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
const showImage = image[Math.floor(Math.random() * image.length)];
document.body.style.backgroundImage = `url(img/${showImage})`;

const time = document.getElementById("time");
const greetBox = document.getElementById("greet-box");
const greetText = document.getElementById("greet-text");

const addNameBox = document.getElementById("addname-box");
const userNameInput = document.getElementById("username-input");
const addNameBtn = document.getElementById("add-name-btn");

const userNameBox = document.getElementById("username-box");

$(document).ready(() => {
     $("#username-box").on("mouseenter", function () {
          $(this).find("button").removeClass("hidden");
     });

     $("#username-box").on("mouseleave", function () {
          $(this).find("button").addClass("hidden");
     });
});

//현재시간 알려주기
setInterval(() => getTime(), 1000);
//시간에 따라 바뀌는 인사말
getGreet();

// 페이지 로드 시 기존 값 불러오기
loadUser();

function getGreet() {
     let now = new Date();
     let newHour = now.getHours();
     if (newHour >= 4 && newHour < 12) greetText.innerHTML = "Good Morning, ";
     else if (newHour >= 12 && newHour < 18) greetText.innerHTML = "Good Afternoon, ";
     else if (newHour >= 18 || newHour < 4) greetText.innerHTML = "Good Night, ";
}

function getTime() {
     let now = new Date();
     let nowHour = now.getHours() >= 10 ? `${now.getHours()}` : `0${now.getHours()}`;
     let nowMin = now.getMinutes() >= 10 ? `${now.getMinutes()}` : `0${now.getMinutes()}`;
     time.innerHTML = `${nowHour}:${nowMin}`;
}
//로컬스토리지에 저장
function saveUser(name) {
     user = name;
     localStorage.setItem("user", JSON.stringify(user));
}
//로컬스토리지에 저장된 이름 불러오는 함수
function loadUser() {
     let getUser = localStorage.getItem("user");

     if (getUser) {
          // 기존 값이 있으면 표시
          user = JSON.parse(getUser);
          addNameBox.classList.add("hidden"); // 입력창 숨기기
          showUserName(user);
     } else {
          // 값이 없으면 입력창 보이기
          addNameBox.classList.remove("hidden");
     }
}
// 저장된 이름 표시하는 함수
function showUserName(name) {
     if (!name) return;
     userNameBox.innerHTML = ""; // 기존 내용 삭제

     const userName = document.createElement("span");
     userName.textContent = name;

     const editNameBtn = document.createElement("button");
     editNameBtn.textContent = "수정";
     editNameBtn.onclick = function () {
          addNameBox.classList.remove("hidden"); // 입력창 보이기
          userNameBox.style.display = "none";
          userNameInput.value = name; // 기존 값 유지
          userNameBox.innerHTML = ""; // 결과 삭제
     };

     userNameBox.appendChild(userName);
     userNameBox.appendChild(editNameBtn);
}

// 추가버튼 눌렀을때
addNameBtn.addEventListener("click", function () {
     const text = userNameInput.value.trim();
     if (text === "") return; // 빈값 방지

     saveUser(text); // 로컬스토리지에 저장
     addNameBox.classList.add("hidden"); // 입력창 숨기기
     userNameBox.style.display = "flex";
     showUserName(text); // 저장된 이름 표시
});
