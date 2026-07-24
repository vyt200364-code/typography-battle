// ===============================
// TYPOGRAPHY BATTLE RPG
// ===============================


// DATABASE CÂU HỎI
// Có thể thêm tiếp lên 200 câu


const questions = [

{
q:"Typography là gì?",
a:[
"Nghệ thuật sắp xếp chữ",
"Kỹ thuật chụp ảnh",
"Thiết kế logo",
"Lập trình web"
],
correct:0
},

{
q:"Kerning là gì?",
a:[
"Khoảng cách giữa hai ký tự",
"Khoảng cách giữa các dòng",
"Độ lớn chữ",
"Màu của chữ"
],
correct:0
},


{
q:"Tracking dùng để làm gì?",
a:[
"Điều chỉnh khoảng cách toàn bộ ký tự",
"Tạo bóng chữ",
"Đổi font",
"Đổi màu"
],
correct:0
},


{
q:"Leading là khoảng cách gì?",
a:[
"Khoảng cách giữa các dòng chữ",
"Khoảng cách chữ cái",
"Độ dày chữ",
"Kích thước chữ"
],
correct:0
},


{
q:"Font Serif có đặc điểm?",
a:[
"Có chân chữ",
"Không có chân",
"Chữ viết tay",
"Chữ pixel"
],
correct:0
},


{
q:"Sans Serif nghĩa là?",
a:[
"Không có chân chữ",
"Có chân chữ",
"Chữ cổ điển",
"Chữ nghiêng"
],
correct:0
},


{
q:"Hierarchy trong Typography giúp?",
a:[
"Tạo thứ tự thị giác",
"Làm chữ nhỏ hơn",
"Đổi màu nền",
"Tạo ảnh"
],
correct:0
},


{
q:"Contrast trong thiết kế là?",
a:[
"Sự tương phản",
"Sự lặp lại",
"Sự căn giữa",
"Sự xoay"
],
correct:0
},


{
q:"Alignment nghĩa là?",
a:[
"Căn chỉnh",
"Tô màu",
"Phóng to",
"Thu nhỏ"
],
correct:0
},


{
q:"Display font thường dùng cho?",
a:[
"Tiêu đề lớn",
"Nội dung dài",
"Bảng số",
"Mã code"
],
correct:0
}

];



// ===============================
// TẠO THÊM CÂU HỎI TỰ ĐỘNG
// ===============================

for(let i=0;i<190;i++){

questions.push({

q:"Câu hỏi Typography nâng cao số "+(i+11),

a:[
"Đáp án đúng",
"Đáp án sai A",
"Đáp án sai B",
"Đáp án sai C"
],

correct:0

});

}





// ===============================
// GAME DATA
// ===============================


let player="";

let heroHP=100;


let bosses=[

{
name:"👹 Kerning Demon",
hp:500
},

{
name:"🐉 Serif Dragon",
hp:700
},

{
name:"👑 Typography King",
hp:900
}

];


let bossIndex=0;

let bossHP;


let currentQuestion=0;


let gameQuestions=[];


let combo=0;





// ===============================
// START
// ===============================


function startGame(){


player=
document.getElementById("playerName").value;


if(player==""){

alert("Nhập tên chiến binh!");

return;

}



document.getElementById("nameDisplay").innerHTML=
player;



document.getElementById("playerNameBox")
.classList.add("hidden");


document.getElementById("battle")
.classList.remove("hidden");



resetBoss();


shuffleGameQuestions();


showQuestion();


}






// ===============================
// RANDOM CÂU HỎI
// ===============================


function shuffleGameQuestions(){


gameQuestions=[...questions];


gameQuestions.sort(
()=>Math.random()-0.5
);


// lấy 84 câu

gameQuestions=
gameQuestions.slice(0,84);



currentQuestion=0;


}






// ===============================
// RANDOM ĐÁP ÁN
// ===============================


function shuffleAnswer(question){


let arr=
question.a.map((x,i)=>({

text:x,

correct:
i===question.correct

}));



arr.sort(
()=>Math.random()-0.5
);



question.a=
arr.map(x=>x.text);


question.correct=
arr.findIndex(
x=>x.correct
);



}






// ===============================
// HIỂN THỊ CÂU HỎI
// ===============================


function showQuestion(){


let q=
gameQuestions[currentQuestion];


shuffleAnswer(q);



document.getElementById("question")
.innerHTML=
q.q;



let box=
document.getElementById("answers");


box.innerHTML="";



q.a.forEach((text,index)=>{


let btn=
document.createElement("button");


btn.className="answer";


btn.innerHTML=
text;



btn.onclick=()=>answer(index,btn);



box.appendChild(btn);



});



document.getElementById("round")
.innerHTML=
"Câu "+(currentQuestion+1)+"/84";


document.getElementById("combo")
.innerHTML=
"🔥 Combo: "+combo;


}







// ===============================
// TRẢ LỜI
// ===============================


function answer(choice,btn){


let q=
gameQuestions[currentQuestion];



if(choice===q.correct){


btn.classList.add("correct");


hitEffect("⚔️");


bossHP-=50;


combo++;



if(combo>=3){


bossHP-=100;


hitEffect("🔥 SKILL COMBO!");

combo=0;


}


}

else{


btn.classList.add("wrong");


hitEffect("💥");


heroHP-=20;


combo=0;


}



updateHP();



setTimeout(()=>{


if(bossHP<=0){


nextBoss();


}

else if(heroHP<=0){


lose();


}

else{


currentQuestion++;


showQuestion();


}



},1000);



}







// ===============================
// BOSS
// ===============================


function resetBoss(){


bossHP=
bosses[bossIndex].hp;



document.getElementById("bossName")
.innerHTML=
bosses[bossIndex].name;


}




function nextBoss(){


bossIndex++;


heroHP=100;



if(bossIndex>=3){


win();


return;

}



alert(
"🎉 Hạ Boss! Hoàng tử hồi đầy máu!"
);



resetBoss();


}





// ===============================
// HP
// ===============================


function updateHP(){


document.getElementById("heroHP")
.style.width=
heroHP+"%";



document.getElementById("bossHP")
.style.width=
(
bossHP/
bosses[bossIndex].hp
*100
)
+"%";


}






// ===============================
// EFFECT
// ===============================


function hitEffect(text){


let e=
document.getElementById("effect");


e.innerHTML=text;


e.className="hit";



setTimeout(()=>{

e.className="";

},500);


}






// ===============================
// WIN / LOSE
// ===============================


function win(){


document.getElementById("battle")
.classList.add("hidden");


document.getElementById("result")
.classList.remove("hidden");


document.getElementById("resultText")
.innerHTML=
"🏆 CHIẾN THẮNG! 🎆";


}



function lose(){


document.getElementById("battle")
.classList.add("hidden");


document.getElementById("result")
.classList.remove("hidden");


document.getElementById("resultText")
.innerHTML=
"💀 THẤT BẠI";


}




function restartGame(){


location.reload();


}
