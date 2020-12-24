//Що сказано
let label = "waiting...";

//Початок (Чи сказано починати)
let start = true;

//мікрофон
let mic = true;

//К-ть. букв, що вже сказано
let attempt_number = 0;

//Велична грифту
let letter_size = ["70mm", "35mm", "23mm", "18mm", "14mm", "12mm", "10mm", "9mm", "8mm", "7mm", "5mm", "4mm"];

//Гострота зору
let rang = ['0,1', '0,2', '0,3', '0,4', '0,5', '0,6', '0,7', '0,8', '0,9', '1', '1,5', '2'];

//Букви для показу (Всі, що входять)
let  arr = ['Ш', 'Б'];

let arr_end = ['К', 'Н', 'Ш', 'М', 'И', 'Б', 'І']

//Буква, що відображається
let arr_letter = "";

//Модель
let classifier;

// Загружаємо модель!
function preload() {
  classifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/NIOiJT0vI/model.json");
}

function setup() {
  //Слухаємо мікрофон
  classifyAudio();
}


/// Функція для відбору букви
function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

function prematurend(){
  if (start == true){
    emoji = "👂";
    arr_letter = arrayRandElement(arr);
    document.getElementById("abc").innerHTML = arr[0];
    document.getElementById("btn btn-primary btn-lg btn-block").innerHTML = "Закінчити тест";
  }
  if (document.getElementById("btn btn-primary btn-lg btn-block").innerHTML == "Закінчити тест" && attempt_number == 0){
  alert ("Схоже ми тільки почали тест. Якщо ви хотіли закінчити тест помилково, закрийте це вікно. Якщо ж ви не бачите першу букву, що показана на екрані, будь ласка.");
  }
  if (start == false && attempt_number <= 1){
  document.getElementById("abc").innerHTML = "Поточна оцінка різкості зору вашого ока = " + (attempt_number);
  mic = false
}
}
// Розуміємо мову
function classifyAudio() {
  classifier.classify(gotResults);
  if (mic == false){
    return
  }
}

function draw() {

    //Функція визначення для рядка
  if (attempt_number == 1){
    arr = ['М', 'Н', 'К'];
    document.getElementById("abc").style.fontSize = letter_size[1];}
  if (attempt_number == 2){
    arr = ['И', 'М', 'Б', 'Ш'];
    document.getElementById("abc").style.fontSize = letter_size[2];}
  if (attempt_number == 3){
    arr = ['Б', 'И', 'Н', 'К', 'М'];
  document.getElementById("abc").style.fontSize = letter_size[3];}
  if (attempt_number == 4){
    arr = ['І', 'Н', 'Ш', 'М', 'К'];
  document.getElementById("abc").style.fontSize = letter_size[4];}
  if (attempt_number == 5){
    arr = ['Н', 'Ш', 'И', 'І', 'К', 'Б'];
  document.getElementById("abc").style.fontSize = letter_size[5];}
  if (attempt_number == 6){
    arr = ['Ш', 'І', 'Н', 'Б', 'К', 'И'];
  document.getElementById("abc").style.fontSize = letter_size[6];}
  if (attempt_number == 7){
    arr = ['К', 'Н', 'Ш', 'М', 'И', 'Б', 'І'];
  document.getElementById("abc").style.fontSize = letter_size[7];}
  if (attempt_number == 8){
    document.getElementById("abc").style.fontSize = letter_size[8];}
  if (attempt_number == 9){
    document.getElementById("abc").style.fontSize = letter_size[9];}
  if (attempt_number == 10){
    document.getElementById("abc").style.fontSize = letter_size[10];}
  if (attempt_number == 11){
    document.getElementById("abc").style.fontSize = letter_size[11];}

  // Шум це мікрофон

  // На початку потрібно скзати 'Так'
  if (label == "Yes" && start == true) {
    arr_letter = arrayRandElement(arr);
    document.getElementById("abc").innerHTML = arr_letter;
    document.getElementById("btn btn-primary btn-lg btn-block").innerHTML = "Закінчити тест";

  //Далі вибираємо рандомну букву, яку потрібно сказати користувачу
  } else if (label == arr_letter) {
    start = false;
    attempt_number += 1;
    arr_letter = arrayRandElement(arr);
    document.getElementById("abc").innerHTML = arr_letter;
  } else if (label in arr_end && label != arr_letter){
    start = false;
    arr_letter = arrayRandElement(arr);
    document.getElementById("abc").innerHTML = arr_letter;
  }


  //Кінець тесту
  if (attempt_number == 12) {
    document.getElementById("abc").innerHTML = "Ого! Ти дійшов до кінця, круто! Ваша оцінка поточного ока:" + (attempt_number);
    mic = false;
  }

  // Кінець тесту
}
// Отримуємо результати
function gotResults(error, results) {
  if (error) {
    console.error(error);
    mic = false;
    document.getElementById("abc").innerHTML = "Помилка! Схоже ми не змогли отримати доступ до вашого мікрофону. Будь ласка перевірте чи під'єднаний мікрофон, та перезапустіть сторінку.";
    document.getElementById("abc").style.fontSize = '20mm';
    return;
  }
  // Зберігаємо данні
  label = results[0].label;
}
