const Base_Url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("button");

const fromCurr=document.querySelector(".from select ");

const toCurr=document.querySelector(".to select ");

const msg=document.querySelector(".msg");

for (let select of dropdowns){
    for(currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name==="from"&& currcode==="USD"){
            newoption.selected="selected";
        }
        else if(select.name==="to"&& currcode==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption)
    }
    select.addEventListener("click",(event)=>{
        updateFlags(event.target);
    })
}

window.addEventListener("load",()=>{
    updateExchangeRate();
});

const updateFlags=(element)=>{
    let currcode=element.value;
    let countryCode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png` ;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();

});

const updateExchangeRate= async ()=>{
    let amount = document.querySelector("input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const URL=`${Base_Url}/${fromCurr.value.toLowerCase()}.json`; //api calling
    let reponse=await fetch(URL);
    let data=await reponse.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount.toFixed(2)}${toCurr.value}`;
}
