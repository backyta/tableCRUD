(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const N="/tableCRUD/assets/javascript-8dac5379.svg",w="/tableCRUD/vite.svg",P=`\r
<div class="modal-dialog">\r
    <form novalidate>\r
        <span>User </span>\r
        <input type="text" name="firstName" placeholder="First Name" />\r
        <input type="text" name="lastName" placeholder="Last Name" />\r
        <input type="number" name="balance" placeholder="Balance" />\r
\r
        <div>\r
            <input type="checkbox" id="is-active" name="isActive"/>\r
            <label for="is-active">is active?</label>\r
        </div>\r
\r
        <button type="submit">\r
            Save\r
        </button>\r
\r
    </form>\r
\r
</div>\r
\r
\r
<!-- cuando quire el atributo chekeced se cambia a falso -->`;class y{constructor({id:t,isActive:n,balance:a,avatar:s,firstName:r,lastName:c,gender:u}){this.id=t,this.isActive=n,this.balance=a,this.avatar=s,this.firstName=r,this.lastName=c,this.gender=u}}const f=e=>{const{avatar:t,balance:n,first_name:a,gender:s,id:r,isActive:c,last_name:u}=e;return new y({avatar:t,balance:n,firstName:a,gender:s,id:r,isActive:c,lastName:u})},T=async e=>{const t=`http://localhost:3001/users/${e}`,a=await(await fetch(t)).json(),s=f(a);return console.log({users:s}),s};let i,d,h={};const b=async e=>{if(i==null||i.classList.remove("hiden-modal"),h={},!e)return;const t=await T(e);E(t)},v=()=>{i==null||i.classList.add("hiden-modal"),d==null||d.reset()},E=e=>{d.querySelector('[name="firstName"]').value=e.firstName,d.querySelector('[name="lastName"]').value=e.lastName,d.querySelector('[name="balance"]').value=e.balance,d.querySelector('[name="isActive"]').checked=e.isActive,h=e,console.log(h)},S=(e,t)=>{i||(i=document.createElement("div"),i.innerHTML=P,i.className="modal-container hiden-modal",d=i.querySelector("form"),i.addEventListener("click",n=>{n.target.className==="modal-container"&&v()}),d.addEventListener("submit",async n=>{n.preventDefault();const a=new FormData(d),s={...h};console.log(s);for(const[r,c]of a){if(r==="balance"){s[r]=Number(c);continue}if(r==="isActive"){s[r]=c==="on";continue}if(!document.querySelector('[name="isActive"]').checked){s.isActive=!1;continue}s[r]=c}console.log(s),await t(s),v()}),e.append(i))};const $=e=>{const t=document.createElement("button");t.innerText="+",t.classList.add("fab-button"),e.append(t),t.addEventListener("click",()=>{b()})},p=async(e=1)=>{const t=`http://localhost:3001/users?_page=${e}`;return(await(await fetch(t)).json()).map(f)},o={currentPage:0,users:[]},A=async()=>{const e=await p(o.currentPage+1);e.length!==0&&(o.currentPage+=1,o.users=e)},L=async()=>{if(o.currentPage===1)return;const e=await p(o.currentPage-1);o.currentPage-=1,o.users=e},U=async e=>{let t=!1;o.users=o.users.map(n=>n.id===e.id?(t=!0,e):n),o.users.length<10&&!t&&o.users.push(e)},x=async()=>{const e=await p(o.currentPage);if(e.length===0){await L();return}o.users=e},l={loadNextPage:A,loadPreviousPage:L,onUserChanged:U,reloadPage:x,getUsers:()=>[...o.users],getCurrentPage:()=>o.currentPage},M=async e=>{const t=`http://localhost:3001/users/${e}`,a=await(await fetch(t,{method:"DELETE"})).json();return console.log({deleteResult:a}),!0};let m;const q=()=>{const e=document.createElement("table"),t=document.createElement("thead");t.innerHTML=`

        <tr>
            <th> #ID    </th>
            <th> Balance </th>
            <th> FirstName </th>
            <th> LasName </th>
            <th> isActive </th>
            <th> Actions </th>
        </tr>
    
    `;const n=document.createElement("tbody");return e.append(t,n),e},B=e=>{const t=e.target.closest(".select-user");if(!t)return;const n=t.getAttribute("data-id");b(n)},C=async e=>{const t=e.target.closest(".delete-user");if(!t)return;const n=t.getAttribute("data-id");try{await M(n),await l.reloadPage(),document.querySelector("#current-page").innerText=l.getCurrentPage(),g()}catch(a){console.log(a),alert("No se pudo eleminar")}},g=e=>{const t=l.getUsers();m||(m=q(),e.append(m),m.addEventListener("click",B),m.addEventListener("click",C));let n="";t.forEach(a=>{n=n+`
            <tr>
                <td> ${a.id}    </td>
                <td> ${a.balance} </td>
                <td> ${a.firstName} </td>
                <td> ${a.lastName} </td>
                <td> ${a.isActive} </td>
                <td> 
                    <a href="#/" class="select-user" data-id=${a.id}> Select </a>   
                    |
                    <a href="#/" class="delete-user" data-id=${a.id}> Delete </a>   
                </td>
            </tr>
        `}),m.querySelector("tbody").innerHTML=n};const k=e=>{const t=document.createElement("button");t.innerText="Next >";const n=document.createElement("button");n.innerText=" < Previous ";const a=document.createElement("span");a.id="current-page",a.innerHTML=l.getCurrentPage(),e.append(n,a,t),t.addEventListener("click",async()=>{await l.loadNextPage(),a.innerText=l.getCurrentPage(),g(e)}),n.addEventListener("click",async()=>{await l.loadPreviousPage(),a.innerText=l.getCurrentPage(),g(e)})},H=e=>{const{avatar:t,balance:n,gender:a,firstName:s,id:r,isActive:c,lastName:u}=e;return{avatar:t,balance:n,gender:a,first_name:s,id:r,isActive:c,last_name:u}},j=async e=>{const t=new y(e);if(!t.firstName||!t.lastName)throw"First & LastName is required";const n=H(t);console.log(n);let a;return t.id?a=await O(n):a=await D(n),console.log(a),f(a)},D=async e=>{const a=await(await fetch("http://localhost:3001/users",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json();return console.log({newUser:a}),a},O=async e=>{const t=`http://localhost:3001/users/${e.id}`,a=await(await fetch(t,{method:"PATCH",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json();return console.log({updatedUser:a}),a},F=async e=>{e.innerHTML="Loading.....",await l.loadNextPage(),e.innerHTML="",g(e),k(e),$(e),S(e,async t=>{const n=await j(t);await l.onUserChanged(n),g()})};document.querySelector("#app").innerHTML=`
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${w}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${N}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 id="app-title">CRUD APP</h1>
    <div class="card">

    </div>

  </div>
`;const _=document.querySelector(".card");F(_);
