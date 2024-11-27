let item = document.querySelectorAll('.item');
const itemLength = item.length;
console.log(itemLength);
const rightArrow = document.querySelector("#rightArrow");
const leftArrow = document.querySelector("#leftArrow");
let slider = [];
for (let i = 0; i<itemLength; i++) {
    slider[i] = item[i];
    console.log(slider[i]);
    item[i].remove();
}
let step = 0;
let offset = 0;
function burgerSlider() {
    let div = document.createElement('div');
    div = slider[slider.length-1];
    div.classList.add('item');
    div.style.left = -1500 + 'px';
    console.log(div);
    document.querySelector('.items').appendChild(div); 
    div = slider[step];
    div.classList.add('item');
    div.style.left = offset*1500 + 'px';
    console.log(div);
    document.querySelector('.items').appendChild(div); 
    div = slider[step+1];
    div.classList.add('item');
    div.style.left = offset*1500 + 1500 + 'px';
    console.log(div);
    document.querySelector('.items').appendChild(div); 
    offset = 1;
}
function burgerSliderL() {
    console.log(step);
    if (step == (slider.length-1)) {
        step = 1;
    } else {
        if (step == (slider.length-2)) {
        step = 0;
        } else {
        step = (step +2);
        }
    }
    console.log(step);
    let div = document.createElement('div');
    div = slider[step];
    div.classList.add('item');
    div.style.left = offset*1500 + 'px';
    console.log(div);
    document.querySelector('.items').appendChild(div); 
    if (step == 0) {
        step = (slider.length-1);
    } else {
        step = (step - 1);
    }
    console.log(step);
    offset = 1;
}
function left() {
    leftArrow.onclick = null;
    let slider2 = document.querySelectorAll('.item');
    let offset2 = -1;
    console.log(slider2.length);
    for (let i = 0; i<slider2.length; i++) {
        slider2[i].style.left = offset2*1500 - 1500 + 'px';
        offset2 ++;
    }
    setTimeout(function() {
        slider2[0].remove();
        burgerSliderL();
        leftArrow.onclick = left;
    }, 600);
}
function burgerSliderR() {
    console.log(step);
    if (step == 0) {
        step = (slider.length-2);
    } else {
        if (step == 1) {
        step = (slider.length-1);
        } else {
        step = (step -2);
        }
    }
    console.log(step);
    let offset = -1;
    let div = document.createElement('div');
    div = slider[step];
    div.classList.add('item');
    div.style.left = offset*1500 + 'px';
    console.log(div);
    document.querySelector('.items').insertBefore(div, items.firstElementChild);
    if (step == (slider.length-1)) {
        step = 0;
    } else {
        step = (step+1);
    }
    console.log(step);
    offset = 1;
}
function right() {
    rightArrow.onclick = null;
    let slider2 = document.querySelectorAll('.item');
    let offset2 = (slider2.length-1);
    for (let i = (slider2.length-1); i>=0; i--) {
        slider2[i].style.left = offset2*1500 + 'px';
        offset2 --;
    }
    setTimeout(function() {
        slider2[(slider2.length-1)].remove();
        burgerSliderR();
        rightArrow.onclick = right;
    }, 600);
}
burgerSlider();
step = 0;
leftArrow.onclick = left;
rightArrow.onclick = right;
/*-------------------------------------------*/
document.body.addEventListener('click', e=> {
    e.stopImmediatePropagation();
})
rates.addEventListener('click', e=>{
    egg_0.style.display = 'none';
    setTimeout(()=>{
        egg_0.style.display = 'block';
    },3000);
})
services.addEventListener('click', e=>{
    egg_1.style.display = 'none';
    setTimeout(()=>{
        egg_1.style.display = 'block';
    },3000);
})
goods.addEventListener('click', e=>{
    egg_2.style.display = 'none';
    setTimeout(()=>{
        egg_2.style.display = 'block';
    },3000);
})
/*-------------------------------------------*/
function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}