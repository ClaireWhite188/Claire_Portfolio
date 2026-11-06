'use strict';
const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
const grid = document.querySelector('#project-grid');
const dialog = document.querySelector('#project-dialog');
const content = document.querySelector('#dialog-content');
const filters = [...document.querySelectorAll('.filter')];
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeAsset = path => typeof path === 'string' && /^assets\/[a-zA-Z0-9_./-]+$/.test(path) && !path.includes('..') ? path : '';
const safeLink = url => {try { const u = new URL(url, location.href); return ['https:','http:'].includes(u.protocol) ? u.href : ''; } catch {return '';}};
const coverHTML = (p,large=false) => {const asset=safeAsset(p.cover);return asset?`<img src="${esc(asset)}" alt="${esc(p.title)} project preview" loading="lazy">`:`<div class="cover-placeholder"><span class="cover-glyph">✳</span><span class="cover-name">${esc(p.title)}</span></div>`;};
function renderProjects(category='All'){
  grid.replaceChildren();
  const shown=projects.filter(p=>category==='All'||p.category===category);
  document.querySelector('#project-empty').hidden=shown.length>0;
  shown.forEach(p=>{
    const card=document.createElement('article');card.className='project-card';
    const button=document.createElement('button');button.type='button';button.className='project-link';button.setAttribute('aria-label',`View ${p.title} case study`);
    button.innerHTML=`<div class="project-cover">${coverHTML(p)}<span class="cover-corner">${esc(p.category)}</span></div><div class="project-info"><div><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p></div><span class="project-arrow" aria-hidden="true">↗</span></div>`;
    button.addEventListener('click',()=>openProject(p.slug));card.append(button);grid.append(card);
  });
}
function openProject(slug,updateURL=true){
  const p=projects.find(item=>item.slug===slug);if(!p)return;
  const fields=[['The challenge',p.problem],['My process',p.process],['Testing & feedback',p.testing],['Outcome',p.outcome],['Reflection',p.reflection]];
  const sections=fields.filter(([,v])=>v).map(([name,value])=>`<section class="case-section"><h3>${esc(name)}</h3><p>${esc(value)}</p></section>`).join('');
  const imgs=(p.images||[]).map(img=>{const src=safeAsset(typeof img==='string'?img:img.src);const alt=typeof img==='string'?p.title:(img.alt||p.title);return src?`<img class="case-image" src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`:''}).join('');
  const links=(p.links||[]).map(l=>{const href=safeLink(l.url);return href?`<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(l.label||'View project')} ↗</a>`:''}).join('');
  content.innerHTML=`<article class="case-content"><p class="eyebrow">${esc(p.category)} / CASE STUDY</p><h2 id="dialog-title">${esc(p.title)}</h2><p class="case-summary">${esc(p.summary)}</p><div class="case-hero">${coverHTML(p,true)}</div><div class="case-meta"><div><small>My role</small><span>${esc(p.role||'—')}</span></div><div><small>Timeline</small><span>${esc(p.timeline||'—')}</span></div><div><small>Skills / Tools</small><span>${esc((p.tools||[]).join(', ')||'—')}</span></div></div><section class="case-section"><h3>Overview</h3><p>${esc(p.overview||'')}</p></section>${sections}${imgs}${links?`<div class="case-links">${links}</div>`:''}</article>`;
  dialog.showModal();if(updateURL)history.pushState({project:slug},'',`#project/${encodeURIComponent(slug)}`);
}
function closeProject(updateURL=true){if(dialog.open)dialog.close();if(updateURL&&location.hash.startsWith('#project/'))history.replaceState(null,'','#work');}
filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn));});renderProjects(btn.dataset.filter);}));
document.querySelector('.close-dialog').addEventListener('click',()=>closeProject());
dialog.addEventListener('cancel',e=>{e.preventDefault();closeProject();});
dialog.addEventListener('click',e=>{if(e.target===dialog)closeProject();});
document.querySelector('#dialog-home').addEventListener('click',()=>closeProject(false));
const menu=document.querySelector('#menu-toggle'),nav=document.querySelector('#main-nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));
document.querySelector('#year').textContent=new Date().getFullYear();
// Add your profile URLs here; empty values keep the links hidden.
const socialLinks={linkedin:'',github:''};
Object.entries(socialLinks).forEach(([key,url])=>{const link=document.querySelector(`#${key}-link`);const href=url&&safeLink(url);if(href){link.href=href;link.hidden=false;}});
renderProjects();
function syncRoute(){const slug=location.hash.startsWith('#project/')?decodeURIComponent(location.hash.slice(9)):null;if(slug){if(!dialog.open)openProject(slug,false);}else if(dialog.open)closeProject(false);}
window.addEventListener('popstate',syncRoute);window.addEventListener('hashchange',syncRoute);syncRoute();
