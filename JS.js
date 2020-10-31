//----------------------------------------------------toggle operations below-------------------------------------------------
slider=document.querySelector('#slider');
letter=document.querySelector('#letter');
assignment=document.querySelector('#assignment');
assignment.addEventListener('click',()=>{mode='assignment';togglemode();});
letter.addEventListener('click',()=>{mode='letter';togglemode();});
var mode='letter';
function togglemode(){
	if(mode=='letter')
		{slider.setAttribute('style',`left:${letter.offsetLeft-13}px;top:${letter.offsetTop}px;background-color:#48C9B0;`);
		pagestyle(1);}
	if(mode=='assignment')
		{slider.setAttribute('style',`left:${assignment.offsetLeft-13}px;top:${assignment.offsetTop}px;background-color: #FE4365;width:185px;`);
		 pagestyle(1);
			}
}
togglemode();
//----------------------------------------------------toggle operations above-------------------------------------------------
//----------------------------------------------------left bar below-------------------------------------------------
slider1=document.querySelector('#slider1');
penColor=document.querySelector('#penColor');
pageStyle=document.querySelector('#pageStyle');
handwriting=document.querySelector('#handwriting');

color=document.querySelector('#color');
style=document.querySelector('#style');
writing=document.querySelector('#writing');

penColor.addEventListener('click',()=>{
							console.log('ok');
							leftBarOption='penColor';
							toggleLeftBarOption();
							
						});
pageStyle.addEventListener('click',()=>{
							leftBarOption='pageStyle';
							toggleLeftBarOption();
							console.log('ok');
						});
handwriting.addEventListener('click',()=>{
							leftBarOption='handwriting';
							toggleLeftBarOption();
							console.log('ok');
						});
slider1.setAttribute('style',`left:${penColor.offsetLeft-13}px;top:${penColor.offsetTop-2}px;background-color:#2980B9;width:200px;`);

var leftBarOption='penColor';
function toggleLeftBarOption(){
	if(leftBarOption=='penColor')
	{
		color.setAttribute('style','height:90px;');
		style.setAttribute('style','height:0px;');
		writing.setAttribute('style','height:0px;');
		slider1.setAttribute('style',`left:${penColor.offsetLeft-13}px;top:${penColor.offsetTop-2}px;background-color:#2980B9;width:200px;`);
	}
	if(leftBarOption=='pageStyle')
	{
		color.setAttribute('style','height:0px;');
		style.setAttribute('style','height:70px;');
		writing.setAttribute('style','height:0px;');
		slider1.setAttribute('style',`left:${pageStyle.offsetLeft-13}px;top:${pageStyle.offsetTop-2}px;background-color:#83AF9B;width:200px;`);
	}
	if(leftBarOption=='handwriting')
	{	
		color.setAttribute('style','height:0px;');
		style.setAttribute('style','height:0px;');
		writing.setAttribute('style','height:125px;');
		slider1.setAttribute('style',`left:${handwriting.offsetLeft-13}px;top:${handwriting.offsetTop-2}px;background-color:#FC9D9A;width:200px;`);
	}
}
//----------------------------------------------------left bar above-------------------------------------------------
//----------------------------------------------------Voice recognition below-------------------------------------------------
window.SpeenchRecognition=window.SpeenchRecognition||window.webkitSpeechRecognition;
const recognition=new SpeenchRecognition();
recognition.interimResults=true;
console.log(recognition);

let para=document.createElement('p');
paper=document.querySelector('#paper');
paper.appendChild(para);
var turnSwitch=1;
recognition.addEventListener('result',e=>{
		const wordsspoken=Array.from(e.results)
		                  .map(item=>item[0])
		                  .map(item=>item.transcript)
		                  .join("");
        para.textContent=wordsspoken; 
        if(e.results[0].isFinal){
        	                  para=document.createElement('p');
        	                  paper.appendChild(para);
                               }                          
              })

recognition.addEventListener('end',()=>{
	if(turnSwitch==1)
	recognition.start();
	});
function turnoff(){
	turnSwitch==1?turnoffmicrophone():turnonmicrophone();
	function turnoffmicrophone(){turnSwitch=0;
	recognition.stop();
	document.querySelector('#mic').classList.remove("fa-microphone-slash");
	document.querySelector('#mic').classList.add("fa-microphone");
	document.querySelector('#mic').setAttribute('style','padding-left:20px;');
	window.alert('Microphone turned off.');
    }
    function turnonmicrophone(){turnSwitch=1;
	recognition.start();
	document.querySelector('#mic').classList.remove("fa-microphone");
	document.querySelector('#mic').classList.add("fa-microphone-slash");
	document.querySelector('#mic').setAttribute('style','padding-left:0px;');
    }
}

recognition.start();     //start automatically on start
//----------------------------------------------------Voice recognition above-------------------------------------------------
//----------------------------------------------------Save content below-------------------------------------------------
strip=document.querySelector('#savingStrip');
let photonumber=1;
function clickphoto(){
				snap=document.querySelector('#snap');
				snap.currentTime=0;
				snap.play();

				document.querySelector("#paper");
				savingStrip=document.querySelector("#savingStrip");

				html2canvas(document.querySelector("#paper")).then(canvas => {
    			document.body.appendChild(canvas);
    			titel=document.createElement('h4');
    			titel.textContent='Click to download:';
    			photonumber==1?savingStrip.appendChild(titel):null;
    			const data=canvas.toDataURL('images/jpeg');
    			const link=document.createElement('a');
    			link.href=data;
    			link.setAttribute('download',`page${photonumber}`);
    			photonumber++;
    			link.innerHTML=`<img src="${data}">`;
    			savingStrip.appendChild(link);
				});

            }
//----------------------------------------------------Save content above-------------------------------------------------
//----------------------------------------------------edit pen style writhing below-------------------------------------------------
var storecolor='#8D8689',storestyle=1,storemode='l',storewriting='Dawning of a New Day';
function pencolour(color){
	storecolor=color;
	paper.setAttribute('style',`color:${color};background-image: url('asset/${storemode}${storestyle}.jpg');font-family:${storewriting};`);
}
function pagestyle(style){
	mode=='letter'?a='l':a='a';
	storestyle=style;
	storemode=a;
	paper.setAttribute('style',`background-image: url('asset/${a}${style}.jpg');color:${storecolor};font-family:${storewriting};`);
}
function hwriting(writ){
	storewriting=writ;
	paper.setAttribute('style',`font-family:${writ};background-image: url('asset/${storemode}${storestyle}.jpg');color:${storecolor}`);
}
//----------------------------------------------------edit pen style writhing above-------------------------------------------------
//----------------------------------------------------Speech Synthesis below-------------------------------------------------
const msg=new SpeechSynthesisUtterance();
msg.text='page is empty.';
speechSynthesis.addEventListener('voiceschanged',null);
flagspeaking=0
defalutTextOnPage=document.querySelector('#paper').textContent;
function speak(){
	paraToSpeak=document.querySelectorAll('p');
	pageToSpeak=document.querySelector('#paper');
	if(pageToSpeak.textContent!=defalutTextOnPage)
		{	tospeak=[];
			if(paraToSpeak[0].textContent!='')
				{	
					paraToSpeak.forEach(ele=>{tospeak.push(ele.textContent);});
					msg.text=tospeak.map(ele=>ele).join("");
				}
				else
					msg.text=pageToSpeak.textContent;
		}
	flagspeaking%2==0?speechSynthesis.speak(msg):speechSynthesis.cancel();
	flagspeaking++;
}


//----------------------------------------------------Speech Synthesis above-------------------------------------------------