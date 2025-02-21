let user = "";
const image = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
const showImage = image[Math.floor(Math.random() * image.length)];
document.body.style.backgroundImage = `url(img/${showImage})`;

const weatherCity = document.getElementById("weather-city");
const weather = document.getElementById("weather");
const weatherIcon = document.getElementById("weather-icon");

const time = document.getElementById("time");
const greetBox = document.getElementById("greet-box");
const greetText = document.getElementById("greet-text");

const addNameBox = document.getElementById("addname-box");
const userNameInput = document.getElementById("username-input");
const addNameBtn = document.getElementById("add-name-btn");

const userNameBox = document.getElementById("username-box");

function getTemp() {
     navigator.geolocation.getCurrentPosition(async (position) => {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=034db30f421b1daff5ebe414f46fc87c&units=metric&lang=kr`);
          const data = await response.json();
          const iconCode = data.weather[0].icon;
          const url = `https://openweathermap.org/img/wn/${iconCode}.png`;
          console.log(data);
          //구조분해
          weatherIcon.innerHTML = `<img src="${url}" alt="Weather Icon">`;
          weather.innerHTML = `온도 : ${data.main.temp}℃<br>습도 : ${data.main.humidity}`;
          weatherCity.innerHTML = data.name;
     });
}

getTemp();

$(document).ready(() => {
     $("#username-box").find("button").addClass("hidden");

     $("#username-box").on("mouseenter", function () {
          $(this).find("button").removeClass("hidden");
     });

     $("#username-box").on("mouseleave", function () {
          $(this).find("button").addClass("hidden");
     });

     $("#tasks-btn").on("click", () => {
          $("#todo-container").fadeToggle(500); // 올바른 메서드 호출
     });

     $("#add-btn").on("click", function () {
          const newTask = $("#todo-input").val();
          if (!newTask) return;

          const taskItem = $("<li>").text(newTask);
          const deleteBtn = $("<button>")
               .text("❌")
               .click(function () {
                    $(this).parent().remove();
               });
          taskItem.append(deleteBtn); // 할 일 항목에 삭제 버튼 추가
          $("#todo-list").append(taskItem); // To-Do List에 추가

          $("#todo-input").val(""); // 입력창 초기화
     });

     //오늘의 목표 추가

     $("#goal-add-btn").on("click", function () {
          let goal = $("#today-goal-input").val();

          if (!goal) return;

          $("#goal-input-box").css("display", "none");
          $("#goal-list").find("button").addClass("hidden");

          const goalItem = $("<li>").text(goal);
          const goaldeleteBtn = $("<button>")
               .text("X")
               .addClass("goal-del-btn")
               .addClass("hidden")
               .click(function () {
                    $(this).parent().remove();
                    saveGoal("");
                    $("#goal-input-box").css("display", "flex");
               });
          $("#goal-list").on("mouseenter", function () {
               $(this).find("button").removeClass("hidden");
          });

          $("#goal-list").on("mouseleave", function () {
               $(this).find("button").addClass("hidden");
          });

          goalItem.append(goaldeleteBtn);
          $("#goal-list").append(goalItem);
          saveGoal(goal);
          $("#today-goal-input").val(""); // 입력창 초기화
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
     console.log(getUser);
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
     userNameBox.style.display = "flex";
     userNameBox.innerHTML = ""; // 기존 내용 삭제

     const userName = document.createElement("span");
     userName.textContent = name;
     const editNameBtn = document.createElement("button");
     editNameBtn.textContent = "수정";

     editNameBtn.onclick = function () {
          addNameBox.classList.remove("hidden"); // 입력창 보이기
          userNameInput.value = name; // 기존 값 유지
          userNameBox.style.display = "none";
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
const saying = document.getElementById("saying");
const sayingPerson = document.getElementById("saying-person");
//명언 표시

async function getSaying() {
     const response = await fetch("https://korean-advice-open-api.vercel.app/api/advice");
     const data = await response.json();
     console.log(data);
     saying.textContent = data.message;
     sayingPerson.textContent = data.author;
}
getSaying();

function loadGoal() {
     let goal = localStorage.getItem("goal") || ""; // 목표 불러오기
     if (goal) {
          const goalItem = $("<li>").text(goal);
          const goaldeleteBtn = $("<button>")
               .text("X")
               .addClass("goal-del-btn")
               .addClass("hidden")
               .click(function () {
                    $(this).parent().remove();
                    saveGoal(""); // 목표 삭제
                    $("#goal-input-box").css("display", "flex"); // 입력창 다시 표시
               });

          $("#goal-list").on("mouseenter", function () {
               $(this).find("button").removeClass("hidden");
          });

          $("#goal-list").on("mouseleave", function () {
               $(this).find("button").addClass("hidden");
          });

          goalItem.append(goaldeleteBtn);
          $("#goal-list").append(goalItem);

          // 목표가 있다면 입력창 숨기기
          $("#goal-input-box").css("display", "none");
     }
}

// 목표 저장하기 (오직 1개만 저장)
function saveGoal(goal) {
     localStorage.setItem("goal", goal);
}

// 페이지 로드 시 목표 불러오기
$(document).ready(function () {
     loadGoal();
});
