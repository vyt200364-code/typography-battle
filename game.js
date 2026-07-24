let heroHP = 100;


let bosses=[

{
name:"👹 Kerning Demon",
hp:300
},

{
name:"🐉 Grid Dragon",
hp:400
},

{
name:"👑 Serif King",
hp:500
}

];


let stage=0;


let bossHP=bosses[stage].hp;



let questions=[


{
q:"Kerning là gì?",

a:[
"Khoảng cách giữa 2 ký tự",
"Khoảng cách dòng",
"Độ đậm",
"Màu chữ"
],

correct:0

},



{
q:"Tracking dùng để làm gì?",

a:[
"Khoảng cách giữa nhiều ký tự",
"Đổi màu",
"Đổi font",
"Căn ảnh"
],

correct:0

},



{
q:"Sans Serif có đặc điểm?",

a:[
"Không chân",
"Có chân",
"Viết tay",
"Trang trí"
],

correct:0

}


];



let current=0;



function loadQuestion(){


let q=questions[current];


document.getElementById("question").innerHTML=q.q;


let box=document.getElementById("answers");


box.innerHTML="";


q.a.forEach((text,index)=>{


let btn=document.createElement("button");


btn.innerHTML=text;


btn.onclick=function(){

answer(index,btn);

};


box.appendChild(btn);



});


}



function answer(choice,btn){



let q=questions[current];



if(choice==q.correct){


btn.className="correct";


bossHP-=50;


document.getElementById("message").innerHTML=
"⚔️ Đánh trúng Boss";


}

else{


btn.className="wrong";


heroHP-=20;


document.getElementById("message").innerHTML=
"💥 Boss phản công";


}



update();



setTimeout(()=>{


if(bossHP<=0){

nextBoss();

}

else if(heroHP<=0){

alert("💀 Game Over");

location.reload();

}

else{


current++;


if(current>=questions.length)

current=0;


loadQuestion();


}


},1000);



}



function update(){


document.getElementById("heroHP").style.width=
heroHP+"%";


document.getElementById("bossHP").style.width=
(bossHP/bosses[stage].hp*100)+"%";


}



function nextBoss(){


stage++;


if(stage>=bosses.length){


alert("🏆 Bạn đã thắng tất cả Boss!");

return;


}



heroHP=100;


bossHP=bosses[stage].hp;


document.getElementById("bossName").innerHTML=
bosses[stage].name;


document.getElementById("stage").innerHTML=
"Boss "+(stage+1);



alert("🎁 Hạ Boss! Hồi máu +100");


}



loadQuestion();

update();