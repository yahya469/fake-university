const formone= document.getElementById('formone')
const formtow= document.forms[1]
const formthree= document.forms[2]
const steps= document.getElementById('steps').children
const lodings=document.getElementById('loding')
const buttonone=document.getElementById('buttonone')
const buttontow=document.getElementById('buttontow')
const buttonthree=document.getElementById('buttonthree')
const sectionend=document.getElementById('sectionend')
const sure=document.getElementById('sure')
const oksure=document.getElementById('oksure')
const info=document.getElementById('info')
const infochild=document.getElementById('info').children

const timeing= 1000

const ser=[[2020],[2021]]
for (let i=0;i<ser.length;i++) {

  // console.log(ser[i].includes(2020))
  if (ser[i].includes(2021)){
    console.log(i)
    break
  }
}
// formone
let a= {
  name:null,
  sittingnumber:null,
  total:null,
  average:null,
  graduation:null,
  university:null,
  college:null,
  specialization:null,
  system:null,
  phone:null,
  email:null,
  birth:null,
}

function formsend(obj) {
  let formd= new FormData()
  for (let key in obj) {
    formd.append(key,obj[key])
  }
  return formd
}
function sss(n) {
  lodings.classList.add("d-none")
  steps[n].classList.remove('opacity-50')
  steps[n].classList.add('bc-green')
}

function distrue(evarr) {
  for (let i=0; i< evarr.length;i++) {
    evarr[i].setAttribute('disabled','true')
  }
}

function disfalse(evarr) {
  for (let i=0; i< evarr.length;i++) {
    evarr[i].removeAttribute('disabled')
  }
}

function infoch(a,b,obj,err) {
  for (let i=a;i<b;i++) {
    if (obj[Object.keys(obj)[i]]) infochild[i-err].classList.remove("d-none")
    infochild[i-err].children[1].innerHTML=obj[Object.keys(obj)[i]]
  }
}

function cheching(el,minnum,maxnum,text) {
  let cut=false
  let num= Number(el.value)
  if (num>maxnum||num<=minnum) {
    el.value=''
    el.setAttribute('placeholder',text)
  }else {
    cut=true
  }
  return cut
}
const d= new Date().getFullYear()



formone.addEventListener("submit",function (e) {
  e.preventDefault()
  const aa=cheching(formone.children[2].children[1],0,800,'ادخل رقم من 1 - 800 فقط')
  const b=cheching(formone.children[3].children[1],1999,d,`ادخل عام من ${2000} الى ${d}`)
  if (aa && b) formoneifing(e)
})

function formoneifing(e) {
  a.name=e.target[0].value
  a.sittingnumber=e.target[1].value
  a.total=Number(e.target[2].value)
  a.average=Number(e.target[2].value)/8
  a.graduation=e.target[3].value
  distrue(Array.from(e.target))
  lodings.classList.remove("d-none")
  setTimeout(function() {
    sss(1)
    formone.parentElement.classList.add('d-none')
    formtow.parentElement.classList.remove("d-none")
    disfalse(Array.from(e.target))
    info.classList.remove("d-none")
    info.classList.add("d-grid")
    infoch(0,4,a,0)
  },timeing)
}

formtow.addEventListener('submit',function(e) {
  e.preventDefault()
  a.university=e.target[0].value
  a.college=e.target[1].value
  a.specialization=e.target[2].value
  a.system=e.target[3].value
  distrue(Array.from(e.target))
  lodings.classList.remove("d-none")
  setTimeout(function() {
    sss(2)
    formtow.parentElement.classList.add('d-none')
    formthree.parentElement.classList.remove("d-none")
    disfalse(Array.from(e.target))
    infoch(5,9,a,1)
  },timeing)
})

function retu(but,form2,form1) {
  but.addEventListener('click',function(e) {
    form2.parentElement.classList.add('d-none')
    form1.parentElement.classList.remove("d-none")
})
}

retu(buttonone,formtow,formone)

formthree.addEventListener('submit',function(e) {
  e.preventDefault()
  a.phone=e.target[0].value
  a.email=e.target[1].value
  a.birth=e.target[2].value
  distrue(Array.from(e.target))
  lodings.classList.remove("d-none")
  setTimeout(function() {
    sss(3)
    formthree.parentElement.classList.add('d-none')
    sectionend.classList.remove("d-none")
    disfalse(Array.from(e.target))
    infoch(9,12,a,1)
  },timeing)
})

retu(buttontow,formthree,formtow)
// formsend(a)
buttonthree.addEventListener('click',function() {
  if (navigator.onLine) {
    senddata()
  }else {
    const int= document.getElementById('inter')
    int.style.bottom='90%'
    setTimeout(()=>{int.style.bottom='100%'},3000)
  }
})

function senddata() {
  buttonthree.setAttribute('disabled','true')
  lodings.classList.remove("d-none")
  setTimeout(function() {
    fetch('https://script.google.com/macros/s/AKfycbxSfgbF8IZWp5970JuUW56aLpKT3qU8mzt76zQYQC1TBi5p8xCZa0EroDrbP3HRTP_80Q/exec',{
      method:'POST',
      headers:{"Content-Type":'application/x-www-form-urlencoded'},
      body:new URLSearchParams(formsend(a))
    }).then(rej=>rej.json()).then(rej=> {
      sure.classList.add('d-none')
      document.getElementById('numholster').innerHTML=rej.holster
      oksure.classList.remove('d-none')
    }).catch(rrr=>buttonthree.removeAttribute("disabled"))
    .finally(rrr=>lodings.classList.add("d-none"))
  },0)
}

document.body.addEventListener('click',function (e) {
  if (e.target.dataset.drop==='dropdown') {
    const ddd=Array.from(document.querySelectorAll('[data-drop="dropdown"]'))
    // console.log(ddd)
    
    e.target.nextElementSibling.classList.remove('d-none')
    // حدث لجميع الدروب داون للفورم الثاني
    e.target.nextElementSibling.addEventListener('click',function(c) {
      if (c.target!==this) {
        e.target.value=c.target.innerHTML
        clr(ddd,e.target)
      }
    })
  }
  hidedrop (e)
})

function clr(arrdd,ev) {
  let n=0
  arrdd.forEach((el,ind)=>{
    if (el===ev) {
      n=ifing(ind)
    }
  })

  function ifing(innd) {
    n=innd+1
    if (n<arrdd.length){
      arrdd[n].removeAttribute('disabled')
      lopy()
    }
    return n
  }
  
  function lopy() {
    arrdd[n].value=''
    for (let i=n+1;i<arrdd.length;i++){
      arrdd[i].value=''
      arrdd[i].setAttribute('disabled','')
    }
  }
}

function hidedrop (ev) {
  const ddd= document.querySelectorAll('[data-drop="dropdown"]')
  for (let i=0;i<ddd.length;i++) {
    if (ddd[i]!==ev.target) {ddd[i].nextElementSibling.classList.add('d-none')}
  }
}


