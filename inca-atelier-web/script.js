var P=[
 {n:'Vestido Imperial Bordado',c:'Novias',d:'Satén con bordado andino',p:12500,img:'novia-lago',f:'',t:'A medida'},
 {n:'Vestido Casona Cusco',c:'Novias',d:'Organza y flores bordadas',p:14800,img:'novia-cusco',f:'',t:'A medida'},
 {n:'Vestido Negro Bordado Oro',c:'Vestidos',d:'Crepé con mangas bordadas',p:3900,img:'vestido-negro',f:''},
 {n:'Vestido Encaje Dorado',c:'Vestidos',d:'Encaje sobre base dorada',p:4600,img:'vestido-encaje',f:''},
 {n:'Blusa Brocado Andino',c:'Blusas',d:'Rayas y bordado dorado',p:1450,img:'blusa-brocado',f:'cut',t:'Nuevo'},
 {n:'Blusa Floral Bordada',c:'Blusas',d:'Bordado a mano en seda',p:1680,img:'blusa-floral',f:'wb'},
 {n:'Blusa Roja Bordada',c:'Blusas',d:'Algodón con bordado floral',p:1590,img:'blusa-roja',f:'wb'},
 {n:'Chompa Llamas Rosa',c:'Tejidos',d:'Baby alpaca, diseño de llamas',p:890,img:'chompa-rosa',f:''},
 {n:'Chompa Geométrica Andina',c:'Tejidos',d:'Alpaca, patrones de telar',p:980,img:'chompa-geometrica',f:'blur'},
 {n:'Chompa Llamas Selva',c:'Tejidos',d:'Alpaca, edición numerada',p:1150,img:'chompa-selva',f:'blur',t:'Reserve'},
 {n:'Pantalón Rayas Andino',c:'Pantalones',d:'Algodón tejido en telar',p:520,img:'pantalon-rayas',f:'cut'},
 {n:'Jean Bordado Flores',c:'Pantalones',d:'Denim con aplicaciones',p:780,img:'jean-bordado',f:'cut'},
 {n:'Cargo Verde Oliva',c:'Pantalones',d:'Gabardina de algodón',p:590,img:'cargo-verde',f:'cut'},
 {n:'Cargo Beige',c:'Pantalones',d:'Corte recto, bolsillos laterales',p:560,img:'cargo-beige',f:'cut'}
];
var F=['Todo','Novias','Vestidos','Blusas','Tejidos','Pantalones'];
var cur='Todo',cart=0;
var grid=document.getElementById('grid'),chips=document.getElementById('chips'),toast=document.getElementById('toast');
function money(n){return 'S/ '+n.toLocaleString('es-PE')}
function show(m){toast.textContent=m;toast.classList.add('show');clearTimeout(show.t);show.t=setTimeout(function(){toast.classList.remove('show')},2200)}
function renderChips(){
  chips.innerHTML=F.map(function(f){return '<button class="chip" data-f="'+f+'" aria-pressed="'+(f===cur)+'">'+f+'</button>'}).join('');
}
function renderGrid(){
  var list=P.filter(function(x){return cur==='Todo'||x.c===cur});
  grid.innerHTML=list.map(function(x){
    var src='images/'+x.img+'.webp';
    return '<article class="prod"><div class="thumb '+x.f+'" style="--img:url('+src+')">'+
      (x.t?'<span class="tag">'+x.t+'</span>':'')+
      '<img src="'+src+'" alt="'+x.n+'" loading="lazy" decoding="async">'+
      '<button class="add" data-n="'+x.n+'">Agregar a la bolsa</button></div>'+
      '<h3>'+x.n+'</h3><small>'+x.d+'</small><div class="price">'+money(x.p)+'</div></article>';
  }).join('');
}
function setFilter(f,scroll){
  cur=f;renderChips();renderGrid();
  if(scroll){document.getElementById('coleccion').scrollIntoView({behavior:'smooth'})}
}
chips.addEventListener('click',function(e){var b=e.target.closest('.chip');if(b)setFilter(b.dataset.f,false)});
document.querySelectorAll('[data-f]').forEach(function(el){
  if(el.classList.contains('chip'))return;
  el.addEventListener('click',function(e){e.preventDefault();setFilter(el.dataset.f,true)});
});
grid.addEventListener('click',function(e){
  var b=e.target.closest('.add');if(!b)return;
  cart++;document.getElementById('cartN').textContent=cart;show('Agregado: '+b.dataset.n);
});
document.getElementById('cartBtn').addEventListener('click',function(){
  show(cart?('Tienes '+cart+' pieza'+(cart>1?'s':'')+' en la bolsa'):'Tu bolsa está vacía');
});
var nav=document.getElementById('nav'),mb=document.getElementById('menuBtn');
mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
nav.addEventListener('click',function(e){if(e.target.closest('a')){nav.classList.remove('open');mb.setAttribute('aria-expanded','false')}});
document.getElementById('form').addEventListener('submit',function(e){
  e.preventDefault();
  var n=document.getElementById('f-nombre').value.trim(),c=document.getElementById('f-correo').value.trim(),ok=document.getElementById('ok');
  ok.hidden=false;
  if(!n||!/^\S+@\S+\.\S+$/.test(c)){ok.textContent='Escribe tu nombre y un correo válido para solicitar la cita.';return}
  ok.textContent='Gracias, '+n.split(' ')[0]+'. Hemos recibido tu solicitud para el showroom de '+document.getElementById('f-sede').value+'. Te escribiremos a '+c+' para confirmar la cita.';
  e.target.reset();
});
renderChips();renderGrid();