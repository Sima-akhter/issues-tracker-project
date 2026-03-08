

let myData = [];

function startLogin() {
    const u = document.getElementById('user-input').value;
    const p = document.getElementById('pass-input').value;

    if (u === "admin" && p === "admin123") {
        document.getElementById('login-area').style.display = 'none';
        document.getElementById('main-app').classList.remove('hidden');
        getIssues();
    } else {
        alert("Incorrect credentials!");
    }
}

async function getIssues() {

    try {

        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();

        myData = data.data;

        showUI(myData);

    } catch (err) {
        console.log(err);
    }

}

function showUI(dataArray) {

    const list = document.getElementById('card-list');

    document.getElementById('info-text').innerText = dataArray.length + " Issues";

    list.innerHTML = "";

    dataArray.forEach(val => {

        const isOp = val.status === 'open';

        const borderClass = isOp ? 'issue-card-open' : 'issue-card-closed';

        const div = document.createElement('div');

        div.className = `bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer transition-all hover:shadow-md ${borderClass}`;

        div.onclick = () => showPopup(val.id);

        div.innerHTML = `
        <div class="flex justify-between items-start mb-4">

             <div class="flex items-center justify-center">
            
            ${
                val.status === "open"
                ? `<img src="./assets/Open-Status.png" alt="open">`
                : `<img src="./assets/Closed- Status .png" alt="closed">`
            }

        </div>

            <span class="text-[10px] font-black px-2 py-1 rounded uppercase border border-gray-100
            ${val.priority === 'HIGH' ? 'bg-red-50 text-red-500' : val.priority === 'MEDIUM' ? 'bg-orange-50 text-orange-500' : 'bg-gray-100 text-gray-500'}">
            ${val.priority}
            </span>

        </div>

        <h4 class="font-bold text-gray-800 text-[15px] mb-2 leading-snug line-clamp-2">
        ${val.title}
        </h4>

        <p class="text-[12px] text-gray-400 mb-5 font-medium line-clamp-2">
        ${val.description}
        </p>

        <div class="flex gap-2 mb-6">
            <span class="bg-red-50 text-red-500 text-[9px] font-black px-2 py-0.5 rounded border border-red-100 uppercase">BUG</span>
            <span class="bg-orange-50 text-orange-500 text-[9px] font-black px-2 py-0.5 rounded border border-orange-100 uppercase">HELP WANTED</span>
        </div>

        <div class="mt-auto pt-4 border-t border-gray-50 flex justify-between text-[10px] text-gray-400 font-bold">
            <span>#${val.id} by ${val.author}</span>
            <span>${new Date(val.createdAt).toLocaleDateString()}</span>
        </div>
        `;

        list.appendChild(div);

    });

}

function filterData(type) {

    const btns = ['all', 'open', 'closed'];

    btns.forEach(id => {
        document.getElementById(id).classList.remove('active-all', 'active-open', 'active-closed');
    });

    const target = document.getElementById(type);

    if (type === 'all') target.classList.add('active-all');
    if (type === 'open') target.classList.add('active-open');
    if (type === 'closed') target.classList.add('active-closed');

    const filtered = type === 'all' ? myData : myData.filter(i => i.status === type);

    showUI(filtered);

}

async function searchMe() {

    const word = document.getElementById('find-box').value;

    if (word === "") {
        showUI(myData);
        return;
    }

    try {

        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${word}`);

        const data = await res.json();

        showUI(data.data);

    } catch (err) {
        console.log(err);
    }

}

async function showPopup(id) {

    const modal = document.getElementById('item-modal');
    const box = document.getElementById('modal-data');

    modal.classList.replace('hidden', 'flex');

    try {

        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);

        const data = await res.json();

        const single = data.data;

        box.innerHTML = `
        <div class="flex flex-col">

        <h2 class="text-2xl font-black text-gray-900 mb-3">
        ${single.title}
        </h2>

        <div class="flex items-center gap-3 mb-6">

        <span class="${single.status === 'open' ? 'bg-green-500' : 'bg-purple-600'} text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase">
        ${single.status}
        </span>

        <span class="text-gray-400 text-[12px] font-medium">
        • Author: ${single.author}
        </span>

        </div>

        <p class="text-gray-600 text-sm leading-relaxed mb-8">
        ${single.description}
        </p>

        <div class="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">

        <div>
        <p class="text-[10px] text-gray-400 font-black uppercase mb-1">Priority:</p>
        <span class="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded uppercase">
        ${single.priority}
        </span>
        </div>

        <div>
        <p class="text-[10px] text-gray-400 font-black uppercase mb-1">Status:</p>
        <p class="font-bold text-gray-800">${single.status}</p>
        </div>

        </div>

        <div class="flex justify-end mt-8">
        <button onclick="hidePopup()" class="close-btn shadow-lg uppercase tracking-wider text-sm">
        Close
        </button>
        </div>

        </div>
        `;

    } catch (err) {
        console.log(err);
    }

}

function hidePopup() {
    document.getElementById('item-modal').classList.replace('flex', 'hidden');
}

