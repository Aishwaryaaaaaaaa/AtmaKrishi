// ===============================
// ELEMENTS
// ===============================

const home = document.getElementById("home");
const chatArea = document.getElementById("chatArea");

const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".card");

const input = document.querySelector(".bottom input");
const send = document.querySelector(".send");

// ===============================
// CURRENT MODULE
// ===============================

let currentModule = "home";

// ===============================
// TAB SWITCHING
// ===============================

tabs.forEach(tab=>{

    tab.onclick=()=>{

        tabs.forEach(t=>t.classList.remove("active"));

        tab.classList.add("active");

        const text=tab.innerText.trim();

        if(text.includes("Crop")){

            openCrop();

        }

        else if(text.includes("CFO")){

            openFinance();

        }

        else if(text.includes("Market")){

            openMarket();

        }

        else if(text.includes("Reports")){

            openReports();

        }

        else{

            openVoice();

        }

    }

});

// ===============================
// HOME CARDS
// ===============================

cards.forEach(card=>{

    card.onclick=()=>{

        const title=card.querySelector("h3").innerText;

        if(title.includes("Crop")){

            openCrop();

        }

        else if(title.includes("CFO")){

            openFinance();

        }

        else if(title.includes("Market")){

            openMarket();

        }

        else if(title.includes("Report")){

            openReports();

        }

        else if(title.includes("Voice")){

            openVoice();

        }

        else{

            openCrop();

        }

    }

});

// ===============================
// OPEN CHAT
// ===============================

function openChat(){

    home.style.display="none";

    chatArea.style.display="block";

    chatArea.innerHTML="";

}

// ===============================
// USER BUBBLE
// ===============================

function addUser(text){

    chatArea.innerHTML+=`

    <div class="user-msg">

        ${text}

    </div>

    `;

    scrollBottom();

}

// ===============================
// AI BUBBLE
// ===============================

function addAI(text){

    const bubble=document.createElement("div");

    bubble.className="ai-msg";

    bubble.innerHTML="";

    chatArea.appendChild(bubble);

    let i=0;

    const speed=18;

    const typer=setInterval(()=>{

        bubble.innerHTML=text.substring(0,i);

        i++;

        scrollBottom();

        if(i>text.length){

            clearInterval(typer);

        }

    },speed);

}

// ===============================
// SCROLL
// ===============================

function scrollBottom(){

    chatArea.scrollTop=chatArea.scrollHeight;

}
// ===============================
// SEND MESSAGE
// ===============================

send.onclick=sendMessage;

input.addEventListener("keypress",e=>{

    if(e.key==="Enter"){

        sendMessage();

    }

});

function sendMessage(){

    const text=input.value.trim();

    if(text==="") return;

    addUser(text);

    input.value="";

    setTimeout(()=>{

        reply(text);

    },700);

}
// ===============================
// SIMPLE AI
// ===============================

function reply(message){

    let m=message.toLowerCase();

    if(currentModule==="finance"){

        if(m.includes("profit")){

            addAI("📈 Your estimated seasonal profit is <b>₹88,000</b>.");

            return;

        }

        if(m.includes("loan")){

            addAI("🏦 You are eligible for a Kisan Credit Card loan up to <b>₹2,00,000</b>.");

            return;

        }

        if(m.includes("subsidy")){

            addAI("🌱 Eligible schemes:<br><br>• PM-KISAN<br>• PM-KUSUM<br>• Drip Irrigation");

            return;

        }

        addAI("🤖 I can help analyze your farm finances, estimate profits, identify unnecessary expenses and suggest government schemes.");

        return;

    }

    if(currentModule==="crop"){

        addAI("🌾 Upload a crop image and I'll detect diseases and recommend both indigenous and modern remedies.");

        return;

    }

    if(currentModule==="market"){

        addAI("📈 Today's tomato prices are trending upward by approximately 11%.");

        return;

    }

    if(currentModule==="reports"){

        addAI("📄 Your AI Farm Report can be generated with one click.");

        return;

    }

    if(currentModule==="voice"){

        addAI("🎤 Voice Assistant is ready. Tap the microphone to begin speaking.");

        return;

    }

    addAI("👋 Welcome to AtmaKrishi AI!");

}
// ===================================
// FINANCE MODULE
// ===================================

function openFinance(){

currentModule="finance";

openChat();

setTimeout(()=>{

addAI(`

<h2>💰 Welcome to AI CFO</h2>

Helping farmers make smarter financial decisions.

<br><br>

<button class="action-btn" onclick="uploadSheet()">

📄 Upload Expense Sheet

</button>

<button class="action-btn whatsapp" onclick="openWhatsApp()">

💬 Continue on WhatsApp

</button>

<button class="action-btn voice" onclick="startVoice()">

🎤 Voice Analysis

</button>

`);

},400);

}
function uploadSheet(){

    const picker=document.createElement("input");

    picker.type="file";

    picker.accept=".xlsx,.xls,.csv";

    picker.onchange=()=>{

        const file=picker.files[0];

        if(!file) return;

        chatArea.innerHTML+=`

        <div class="user-msg">

            📄 ${file.name}

        </div>

        `;

        scrollBottom();

        setTimeout(showLoader,600);

    };

    picker.click();

}
function showLoader(){

chatArea.innerHTML+=`

<div class="ai-msg loading">

<div class="loader"></div>

<p>

Analyzing farm finances...

</p>

</div>

`;

scrollBottom();

setTimeout(showFinanceSummary,2600);

}
function showFinanceSummary(){

const loading=document.querySelector(".loading");

if(loading) loading.remove();

chatArea.innerHTML+=`

<div class="finance-card">

<h2>📊 Financial Summary</h2>

<div class="finance-grid">

<div>

<h4>Revenue</h4>

<h3 id="rev">₹0</h3>

</div>

<div>

<h4>Expenses</h4>

<h3 id="exp">₹0</h3>

</div>

<div>

<h4>Profit</h4>

<h3 id="profit">₹0</h3>

</div>

<div>

<h4>ROI</h4>

<h3 id="roi">0%</h3>

</div>

</div>

</div>

`;

scrollBottom();

animateValue("rev",182000,"₹");
animateValue("exp",94000,"₹");
animateValue("profit",88000,"₹");
animateValue("roi",48,"");

setTimeout(showRecommendations,1500);

}
function animateValue(id,target,prefix){

let value=0;

const step=target/60;

const timer=setInterval(()=>{

value+=step;

if(value>=target){

value=target;

clearInterval(timer);

}

document.getElementById(id).innerHTML=

prefix+

Math.round(value).toLocaleString("en-IN")+

(id==="roi"?"%":"");

},18);

}
function showRecommendations(){

chatArea.innerHTML+=`

<div class="finance-card">

<h2>

🧠 AI Recommendations

</h2>

<ul>

<li>

💰 Delay fertilizer purchase by 5 days

</li>

<li>

📈 Tomato prices expected to rise next week

</li>

<li>

🌾 Apply for PM-KISAN

</li>

<li>

🏦 Eligible for KCC Loan

</li>

</ul>

</div>

`;

scrollBottom();

setTimeout(showActions,1000);

}
function showActions(){

chatArea.innerHTML+=`

<div class="finance-card">

<h2>

Need more help?

</h2>

<button class="action-btn">

📄 Generate AI Report

</button>

<button class="action-btn whatsapp"

onclick="openWhatsApp()">

💬 Talk on WhatsApp

</button>

<button class="action-btn voice"

onclick="startVoice()">

🎤 Voice Assistant

</button>

</div>

`;

scrollBottom();

}
function openWhatsApp(){

window.open(

"https://wa.me/919999999999?text=Hello%20AtmaKrishi%20AI%20CFO",

"_blank"

);

}

function startVoice(){

alert("🎤 Voice Assistant Demo");

}
function startVoice(){

document.getElementById("voicePopup").style.display="flex";

}

function closeVoice(){

document.getElementById("voicePopup").style.display="none";

}
function openReport(){

    document.getElementById("reportModal").style.display="flex";

    document.body.style.overflow="hidden";

}

function closeReport(){

    document.getElementById("reportModal").style.display="none";

    document.body.style.overflow="auto";

}