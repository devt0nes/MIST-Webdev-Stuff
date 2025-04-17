document.getElementById('Random').addEventListener('click', () => {
    console.log("Ouch! Stop poking me!");
});

/*
document.querySelector('table').addEventListener('click', () => {
    alert("Oooo Movies . . .");
});

const diddy = document.querySelector('figure img');
diddy.addEventListener("mouseover", () => {
    const diddysrc = diddy.getAttribute('src');
    diddy.setAttribute('src', 'images/olympicsshooting.jpg');
});
diddy.addEventListener("mouseout", () => {
    const diddysrc = diddy.getAttribute('src');
    diddy.setAttribute('src', 'images/diddydown.png');
});
*/

let nameButton = document.getElementById('setname');
let cpyrt = document.querySelector('footer i');

function setName() {
    const myName = prompt("What do the People call you? Please tell us: ");
    if(!myName) {
        setName();
    } else {
        localStorage.setItem("name", myName);
        cpyrt.textContent = `@Copyright 2099 by Miguel O'Hara. You can't run from us forever, ${myName}.`;
    }
}

if (!localStorage.getItem("name")) {
} else {
    const storedname = localStorage.getItem("name");
    cpyrt.textContent = `@Copyright 2099 by Miguel O'Hara. You can't run from us forever, ${storedname}.`;
}

nameButton.onclick = () => {
    setName();
};

const addbtns = document.querySelectorAll('[data-action = "add"]');

addbtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        btn.classList.add("buttonclick");
        setTimeout(() => {
            btn.classList.remove("buttonclick");
        }, 100);
    });
});

const watchlist = new Set();

document.addEventListener('DOMContentLoaded', () => {
    const mtab = document.getElementById("movielist");
    const mli = document.getElementById("selectedlist");

    mtab.addEventListener("click", (event) => {

        if(event.target.dataset.action === "add") {
            const cell = event.target.closest('.cellcontent');
            if(!cell) return;

            let mname = "";
            for(const node of cell.childNodes) {
                if(node.nodeType === Node.TEXT_NODE) {
                    mname += node.textContent.trim();
                }
            }

            if(mname && !watchlist.has(mname)) {
                watchlist.add(mname);
                const li_ = document.createElement('li');
                li_.textContent = mname;
                mli.appendChild(li_);
            }
        }
    });

    const db = document.getElementById("dlmovielist");

    dlmovielist.addEventListener("click", () => {
        if(watchlist.size === 0) {
            alert("Your watchlist is empty!");
            return;
        }

        let mcontent = "WATCHLIST:\n\n";
        mcontent += Array.from(watchlist).join('\n');
        mcontent += "\n\nHope you have a great time watching these!";
        
        const blob = new Blob([mcontent], {type: 'text/plain'});

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'watchlist.txt';
        link.click();
    });
});

const diddy = document.getElementById("diddy");
function changebgimg(imgurl) {
    document.documentElement.style.backgroundImage = `url(${imgurl})`;
}

let ogcolor;
diddy.addEventListener("mouseenter", () => {
    changebgimg("images/diddyiscoming.png");
    document.documentElement.style.backgroundRepeat = "no-repeat";
    document.documentElement.style.backgroundAttachment = "fixed";
    document.documentElement.style.backgroundPosition = "center";
    document.documentElement.style.backgroundSize = "cover";

    if(!ogcolor) {
        ogcolor = window.getComputedStyle(document.documentElement).color;
    }
    document.documentElement.style.color = `#FFFFFF`;
});
diddy.addEventListener("mouseleave", () => {
    changebgimg("images/creepgridpink.png");
    document.documentElement.style.backgroundRepeat = "";
    document.documentElement.style.backgroundAttachment = "";
    document.documentElement.style.backgroundPosition = "";
    document.documentElement.style.backgroundSize = "";
    if(ogcolor) {
        document.documentElement.style.color = ogcolor;
    }
});