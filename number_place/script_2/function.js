(()=>{"use strict";let{img:e}=self["load_2.js"],{state:l,storage:f,context:t}=self["constant.js"],_=(()=>{let e=[[4,4],[178,4],[352,4],[4,178],[178,178],[352,178],[4,352],[178,352],[352,352]],l=[[0,0],[57,0],[114,0],[0,57],[57,57],[114,57],[0,114],[57,114],[114,114]];return f=>{let t=Math.floor(f/9),_=f%9,r=e[t][0]+l[_][0],s=e[t][1]+l[_][1];return[r,s]}})``,r=(()=>{let r=e=>{let[f,r]=_(e);t.fillStyle="#ffffff",t.fillRect(f,r,56,56),l.changeMass(e,0)};return(s,a)=>{if(-1===s)t.drawImage(e[0],0,0),l.allClear();else{if(0===a)r(s);else{let[$,c]=_(s);t.drawImage(e[a],$,c),l.changeMass(s,a)}f.save()}}})``,s=()=>{for(let e=0;e<l.length;e++)r(e,l[e])},a=(()=>{let e=(e,l)=>{t.fillRect(e,l,56,2),t.fillRect(e,l+54,56,2),t.fillRect(e,l,2,56),t.fillRect(e+54,l,2,56)},f=l=>{let[f,r]=_(l);t.fillStyle="orange",e(f,r)},r=()=>{if(-1===l.focus)return;let[f,r]=_(l.focus);t.fillStyle="#ffffff",e(f,r)};return e=>{-1===e?r():(r(),f(e)),l.focus=e}})``;defineProperty("function.js",Object.freeze({getPosition:_,drawMass:r,loadData:s,focus:a}))})``;