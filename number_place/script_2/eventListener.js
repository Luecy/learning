(()=>{"use strict";let{img:e}=self["load_2.js"],{canvas:l,canvas2:t,cui:a,state:u,context:c}=self["constant.js"],{drawMass:n,loadData:o,focus:f}=self["function.js"];a.oninput=(()=>{let e={help:/^help\n$/,draw:/^\d\d\d?\n$/,allClear:/^0\n$/,save:/^\n$/,load:/^\d{81}\n$/,focus:/^focus\d\d?\n$/};return()=>{if(a.value.match(e.help)){let l=Object.keys(e),t="";for(let c=0;c<l.length;c++)t+=`${l[c]}: ${e[l[c]]}
`;a.value=t}else if(a.value.match(e.draw)){let i=String(a.value.match(/^\d\d\d?/)),r,d;2===i.length?(r=Number(i[0]),d=Number(i[1])):3===i.length&&(r=Number(i[0]+i[1]),d=Number(i[2])),n(r,d),a.value=a.value.replace(/\n$/,"")}else if(a.value.match(e.allClear))n(-1),a.value=a.value.replace(/\n$/,"");else if(a.value.match(e.save)){let h="";for(let s of u)h+=s;a.value=h}else if(a.value.match(e.load)){let $=String(a.value.match(/^\d{81}/));u.load($),o(),a.value=""}else if(a.value.match(e.focus)){let _=Number(a.value.match(/\d\d?/));81===_&&(_=-1),f(_),a.value=a.value.replace(/\n$/,"")}}})``,l.onclick=(()=>{let e=(e,l)=>{let t=-1,a=-1,u=0;for(let c=0;c<3;c++){for(let n=0;n<3;n++){for(let o=0;o<3;o++){for(let f=0;f<3;f++)if(a++,t++,a===e&&u===l)return t;a-=3,u++}a+=3,u-=3}a=-1,u+=3}},[t,a]=(()=>{let e=l.getBoundingClientRect(),t=e.left,a=e.top;return[t,a]})``,c=Math.ceil(l.clientWidth/9);return l=>{let n=l.pageX-t,o=l.pageY-a;n=Math.floor(n/c),o=Math.floor(o/c);{let i=e(n,o);i===u.focus&&(i=-1),f(i)}}})``,t.onclick=(()=>{let l=t,a=l.getContext("2d");l.width=514,l.height=58,a.fillStyle="#000000",a.fillRect(0,0,l.width,1),a.fillRect(0,l.height-1,l.width,1);for(let c=0;c<l.width;c+=57)a.fillRect(c,0,1,l.height);for(let o=1,i=1;o<=9;o++)a.drawImage(e[o],i,1),i+=57;{let r=(()=>{let e=l.getBoundingClientRect(),t=e.left;return t})``,d=Math.ceil(l.clientWidth/9);return e=>{let l=e.pageX-r;l=Math.floor(l/d),l+=1,-1!==u.focus&&(u[u.focus]===l&&(l=0),n(u.focus,l),f(u.focus))}}})``})``;