// Store only a display preference. Predictions and simulation runs stay in memory.
(() => {
 const key='attention-theme';
 function setTheme(theme,persist=false){
  document.documentElement.dataset.theme=theme;
  document.querySelectorAll('[data-theme-choice]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.themeChoice===theme));
  for(const frame of document.querySelectorAll('iframe')){
   try{if(frame.contentDocument?.documentElement)frame.contentDocument.documentElement.dataset.theme=theme;}catch{/* A future cross-origin frame may not share this preference. */}
  }
  if(persist)try{localStorage.setItem(key,theme);}catch{/* Storage may be unavailable in private contexts. */}
 }
 let theme='light';try{if(localStorage.getItem(key)==='dark')theme='dark';}catch{}
 setTheme(theme);
 document.querySelectorAll('[data-theme-choice]').forEach(b=>b.addEventListener('click',()=>setTheme(b.dataset.themeChoice,true)));
 document.querySelectorAll('iframe').forEach(f=>f.addEventListener('load',()=>setTheme(document.documentElement.dataset.theme)));
})();
