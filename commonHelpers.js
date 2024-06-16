import{a as g,S as h,i as l}from"./assets/vendor-c493984e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const y="https://pixabay.com/api/",b="44415141-73aa0910a2180b32b461f4de8";async function v(s,t,o){const n=new URLSearchParams({key:b,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:t,page:o});return(await g.get(`${y}?${n.toString()}`)).data}const a={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),searchInput:document.querySelector('input[name="searchQuery"]'),searchButton:document.querySelector('button[type="submit"]')};let c=0,p=1;const S=40,L=new h(".gallery a",{}),u=new IntersectionObserver(w,{root:null,rootMargin:"300px",threshold:.3});function w(s){s.forEach(t=>{t.isIntersecting&&m()})}function I(){a.searchButton.disabled=!a.searchInput.value.trim()}async function $(s){s.preventDefault(),c=0,p=1,a.gallery.innerHTML="",await m()}async function m(){const s=a.searchInput.value;try{const{hits:t,totalHits:o}=await v(s,S,p);if(o===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"});return}o>0&&c===0&&l.success({title:"Success",message:`Hooray! We found ${o} images.`,position:"topRight"}),O(t),L.refresh(),c+=t.length,p+=1;const n=a.gallery.querySelectorAll(".photo-card"),e=n[n.length-1];e&&u.observe(e),c>=o&&u.disconnect()}catch(t){console.log(t),l.error({title:"Error",message:"Oops! Something went wrong! Try reloading the page!",position:"topRight"})}}function O(s){const t=s.map(({tags:o,likes:n,views:e,comments:r,downloads:i,largeImageURL:d,webformatURL:f})=>`
        <a href="${d}" class="card-link">
          <div class="photo-card">
            <img src="${f}" alt="${o}" loading="lazy" class="image" />
            <div class="info">
              <p class="info-item">
                <span><b>Likes</b></span>
                <span>${n}</span>
              </p>
              <p class="info-item">
                <span><b>Views</b></span>
                <span>${e}</span>
              </p>
              <p class="info-item">
                <span><b>Comments</b></span>
                <span>${r}</span>
              </p>
              <p class="info-item">
                <span><b>Downloads</b></span>
                <span>${i}</span>
              </p>
            </div>
          </div>
        </a>`).join("");a.gallery.insertAdjacentHTML("beforeend",t)}a.searchForm.addEventListener("submit",$,!1);a.searchInput.addEventListener("input",I,!1);
//# sourceMappingURL=commonHelpers.js.map
