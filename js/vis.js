//flag animation
let triangle = document.getElementById('triangle');
let growing = true;
let size = 100; 

function animateFlag() {
    if (growing) {
        size += 3;
        if (size >= 110) { 
            growing = false;
        }
    } else {
        size -= 2;
        if (size <= 90) { 
            growing = true;
        }
    }
    //here I used AI to set the attributes because it wasnt working like how i wanted
    triangle.setAttribute("points", `0,0 ${size},100 0,200`);
}
setInterval(animateFlag, 100);
