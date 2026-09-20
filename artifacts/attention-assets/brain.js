import * as THREE from './vendor/three.module.min.js';

// fsaverage5 supplies cortical geometry only. The network coordinates, widths,
// colors and emphasis are author illustrations, not registered activation data.
export async function createBrain({canvas,labels,moments,emphasis,reduced,onError,flow=false}) {
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,preserveDrawingBuffer:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.setClearColor(0x111216,0);
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(36,1,.1,100),root=new THREE.Group();scene.add(root);
 scene.add(new THREE.AmbientLight(0xffffff,.55));
 const key=new THREE.DirectionalLight(0xffffff,2.1);key.position.set(2.5,4,3);scene.add(key);
 const fill=new THREE.DirectionalLight(0xffffff,.9);fill.position.set(-3,1,-3);scene.add(fill);
 const rim=new THREE.DirectionalLight(0xffffff,.7);rim.position.set(1,-1,-4);scene.add(rim);
 const convert=p=>new THREE.Vector3(p[0]/100,p[2]/100,-p[1]/100);
 const colors=moments.map(m=>new THREE.Color(m.color));
 let yaw=2.25,pitch=.22,distance=3.65,visible=true,playing=false,opacity=.5,transparent=true,hemisphere='both',selected=0,frame=0,lastFrame=0;
 let levels=emphasis.map(r=>r[0]),targets=[...levels],activityMode=false,signalTime=0;
 const surfaces=[];
 for(const side of ['left','right']){
  const response=await fetch(new URL(`fsaverage5-${side}.bin`,import.meta.url));if(!response.ok)throw new Error('Surface file unavailable');
  const data=await response.arrayBuffer(),header=new Uint32Array(data,0,2),n=header[0],triangles=header[1];
  if(n!==10242||triangles!==20480)throw new Error('Unexpected surface format');
  const native=new Float32Array(data,8,n*3),sulc=new Float32Array(data,8+n*12,n),indices=new Uint16Array(data,8+n*16,triangles*3),pos=new Float32Array(n*3);
  for(let i=0;i<n;i++){pos[i*3]=native[i*3]/100;pos[i*3+1]=native[i*3+2]/100;pos[i*3+2]=-native[i*3+1]/100;}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(pos,3));geometry.setIndex(new THREE.BufferAttribute(indices,1));geometry.computeVertexNormals();
  const paint=new Float32Array(n*3),base=new Float32Array(n),heat=moments.map(()=>new Float32Array(n));
  for(let i=0;i<n;i++){
   // Positive sulcal depth marks inward folds: darken for visible anatomy.
   base[i]=.19-.085*Math.tanh(sulc[i]*.7);
   moments.forEach((m,g)=>{for(const node of m.nodes){if(node[3])continue;const [x,y,z]=node[2],dx=native[i*3]-x,dy=native[i*3+1]-y,dz=native[i*3+2]-z;const width=g===0?23:16;heat[g][i]=Math.max(heat[g][i],Math.exp(-(dx*dx+dy*dy+dz*dz)/(2*width*width)));}});
  }
  geometry.setAttribute('color',new THREE.BufferAttribute(paint,3));
  const material=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.88,metalness:0,side:THREE.FrontSide,transparent:true,opacity,depthWrite:false});
  // A separate, unlit RGBA surface keeps region lights bright when the cortex
  // is made transparent. Only the anatomical mesh obeys the opacity slider.
  const glowPaint=new Float32Array(n*4),glowGeometry=new THREE.BufferGeometry();
  glowGeometry.setAttribute('position',geometry.attributes.position);glowGeometry.setIndex(geometry.index);glowGeometry.setAttribute('color',new THREE.BufferAttribute(glowPaint,4));
  const glow=new THREE.Mesh(glowGeometry,new THREE.MeshBasicMaterial({vertexColors:true,transparent:true,depthWrite:false,depthTest:true,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1,toneMapped:false}));glow.renderOrder=1;
  const mesh=new THREE.Mesh(geometry,material);root.add(mesh,glow);surfaces.push({mesh,glow,glowPaint,base,heat,paint,side,n,native});
 }
 const markers=new THREE.Group(),signals=new THREE.Group();root.add(markers,signals);let signalCurves=[];
 function lightTexture(ring=false){const image=document.createElement('canvas');image.width=image.height=128;const ctx=image.getContext('2d');if(ring){ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.shadowColor='#fff';ctx.shadowBlur=5;ctx.beginPath();ctx.arc(64,64,49,0,Math.PI*2);ctx.stroke();}else{const gradient=ctx.createRadialGradient(64,64,0,64,64,64);gradient.addColorStop(0,'rgba(255,255,255,1)');gradient.addColorStop(.2,'rgba(255,255,255,.85)');gradient.addColorStop(.5,'rgba(255,255,255,.25)');gradient.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);}return new THREE.CanvasTexture(image);}
 const haloTexture=lightTexture(),ringTexture=lightTexture(true);
 const projected=[];
 function label(text){const el=document.createElement('span');el.className='brain-label';el.textContent=text;labels.append(el);return el;}
 function nearest(p){let best=Infinity,result=p.clone();for(const surface of surfaces){const a=surface.mesh.geometry.attributes.position.array;for(let i=0;i<a.length;i+=3){const d=(a[i]-p.x)**2+(a[i+1]-p.y)**2+(a[i+2]-p.z)**2;if(d<best){best=d;result.set(a[i],a[i+1],a[i+2]);}}}return result;}
 const orientations=[['L',[-86,0,35]],['R',[86,0,35]],['Front',[0,83,-5]],['Back',[0,-115,-5]]];
 function buildMarkers(){
  for(const mesh of [...markers.children]){mesh.traverse(object=>{if(object.isMesh)object.geometry.dispose();object.material?.dispose();});markers.remove(mesh);}labels.replaceChildren();projected.length=0;
  moments[selected].nodes.forEach((node,i)=>{const deep=!!node[3],pos=deep?convert(node[2]):nearest(convert(node[2]));const dot=new THREE.Mesh(new THREE.SphereGeometry(deep?.048:.032,16,12),new THREE.MeshBasicMaterial({color:0xffffff,depthTest:!transparent,depthWrite:false}));dot.position.copy(pos);dot.renderOrder=3;dot.userData={deep,side:node[2][0]<-5?'left':node[2][0]>5?'right':'mid'};
   const halo=new THREE.Sprite(new THREE.SpriteMaterial({map:haloTexture,color:0xff8c80,depthTest:!transparent,depthWrite:false,transparent:true,opacity:.85}));halo.scale.setScalar(deep?.25:.2);halo.renderOrder=2;dot.add(halo);
   const ring=new THREE.Sprite(new THREE.SpriteMaterial({map:ringTexture,color:0xff8c80,depthTest:!transparent,depthWrite:false,transparent:true,opacity:0}));ring.renderOrder=5;dot.add(ring);dot.userData.ring=ring;
   markers.add(dot);const el=label(String(i+1)),leader=document.createElement('i');el.classList.add('brain-region-label');leader.className='brain-leader';labels.prepend(leader);projected.push({pos,el,leader,deep,dot});});
  if(flow){
   for(const object of [...signals.children]){object.geometry.dispose();object.material.dispose();signals.remove(object);}signalCurves=[];
   const nodes=markers.children;
   for(let i=1;i<nodes.length;i++){
    const start=nodes[i-1].position.clone(),end=nodes[i].position.clone(),middle=start.clone().add(end).multiplyScalar(.5);middle.z+=.14;
    const curve=new THREE.QuadraticBezierCurve3(start,middle,end);
    const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(32)),new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.5,depthTest:!transparent,depthWrite:false}));line.renderOrder=4;signals.add(line);
    const packet=new THREE.Mesh(new THREE.SphereGeometry(.033,12,10),new THREE.MeshBasicMaterial({color:0xffffff,depthTest:!transparent,depthWrite:false}));packet.renderOrder=5;signals.add(packet);signalCurves.push({curve,packet,line,start:nodes[i-1],end:nodes[i],offset:(i-1)/nodes.length});
   }
  }
  orientations.forEach(([name,pos])=>projected.push({pos:convert(pos),el:label(name),orientation:true}));
 }
 function paintSurface(){const pulse=playing&&!reduced?.78+.22*Math.sin(signalTime*Math.PI/1100):1;
  for(const s of surfaces){
   s.mesh.visible=s.glow.visible=hemisphere==='both'||hemisphere===s.side;
   for(let i=0;i<s.n;i++){
    const b=s.base[i];s.paint[i*3]=s.paint[i*3+1]=s.paint[i*3+2]=b;
    let strength=0;for(let k=0;k<5;k++)strength+=s.heat[k][i]*levels[k]*(activityMode?.82:(k===selected?1:.045));
    const a=THREE.MathUtils.smoothstep(strength,.12,.72),c=colors[selected];
    s.glowPaint[i*4]=c.r;s.glowPaint[i*4+1]=c.g;s.glowPaint[i*4+2]=c.b;s.glowPaint[i*4+3]=a*(.78+.2*pulse);
   }s.mesh.geometry.attributes.color.needsUpdate=true;s.glow.geometry.attributes.color.needsUpdate=true;
  }
 }
 function positionCamera(){camera.position.set(distance*Math.max(1,.8/camera.aspect)*Math.sin(yaw)*Math.cos(pitch),distance*Math.max(1,.8/camera.aspect)*Math.sin(pitch)+.1,distance*Math.max(1,.8/camera.aspect)*Math.cos(yaw)*Math.cos(pitch));camera.lookAt(0,.1,.12);camera.updateMatrixWorld();key.position.copy(camera.position).add(new THREE.Vector3(-1,2,0));}
 function layoutLabels(){
  const w=canvas.clientWidth,h=canvas.clientHeight,occupied=[];
  for(const p of projected){
   let show=true;
   if(p.dot){const d=p.dot.userData;show=(!d.deep||transparent)&&(hemisphere==='both'||d.side==='mid'||d.side===hemisphere);if(!d.deep&&!transparent){const facing=p.pos.clone().sub(new THREE.Vector3(0,.1,.12)).dot(camera.position.clone().sub(p.pos));show=show&&facing>-.03;}p.dot.visible=show;}
   const v=p.pos.clone().project(camera),ax=(v.x+1)*w/2,ay=(1-v.y)*h/2;
   show=show&&Math.abs(v.x)<=1&&Math.abs(v.y)<=1&&v.z<=1;p.el.hidden=!show;if(p.leader)p.leader.hidden=!show;if(!show)continue;
   const lw=p.orientation?Math.max(22,p.el.textContent.length*7+10):22,lh=23;
   let x=ax,y=ay-(p.orientation?0:20);
   // Keep adjacent deep-region labels distinct and tether them to their markers.
   const offsets=p.orientation?[[0,0],[0,25],[25,0],[-25,0]]:[[0,-20],[0,-43],[28,-20],[-28,-20],[28,15],[-28,15],[0,38],[48,-43],[-48,-43]];
   for(const [dx,dy] of offsets){const cx=Math.max(lw/2,Math.min(w-lw/2,ax+dx)),cy=Math.max(lh/2,Math.min(h-lh/2,ay+dy));x=cx;y=cy;if(!occupied.some(r=>Math.abs(cx-r.x)<(lw+r.w)/2+3&&Math.abs(cy-r.y)<(lh+r.h)/2+2))break;}
   occupied.push({x,y,w:lw,h:lh});p.el.style.left=x+'px';p.el.style.top=y+'px';
   if(p.leader){const dx=x-ax,dy=y-ay;p.leader.style.left=ax+'px';p.leader.style.top=ay+'px';p.leader.style.width=Math.hypot(dx,dy)+'px';p.leader.style.transform=`rotate(${Math.atan2(dy,dx)}rad)`;}
  }
 }

 function render(t=0){frame=0;if(!visible||!canvas.clientWidth)return;const w=canvas.clientWidth,h=canvas.clientHeight;if(canvas.width!==Math.round(w*renderer.getPixelRatio())||canvas.height!==Math.round(h*renderer.getPixelRatio())){renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
  const dt=Math.min(.1,(t-lastFrame)/1000||.016);lastFrame=t;let changing=false;
  levels=levels.map((x,i)=>{if(reduced)return targets[i];const next=x+(targets[i]-x)*Math.min(1,dt*5);if(Math.abs(next-targets[i])>.002)changing=true;return next;});
  if(playing&&!reduced)signalTime+=dt*1000;
  positionCamera();paintSurface();layoutLabels();
  for(const dot of markers.children){const phase=(signalTime/2200)%1,ring=dot.userData.ring;ring.visible=playing&&!reduced;ring.scale.setScalar(.12+phase*.52);ring.material.opacity=(1-phase)*.85;}
  if(flow){for(const s of signalCurves){s.line.visible=s.start.visible&&s.end.visible;s.packet.visible=s.line.visible;s.packet.position.copy(s.curve.getPoint((signalTime/2200+s.offset)%1));}canvas.dataset.signalTime=signalTime.toFixed(0);}
  renderer.render(scene,camera);canvas.dataset.moment=selected;canvas.dataset.opacity=opacity.toFixed(2);canvas.dataset.triangles='40960';canvas.dataset.rotation=yaw.toFixed(3)+','+pitch.toFixed(3);
  if(changing||(playing&&!reduced))frame=requestAnimationFrame(render);
 }
 function request(){if(visible&&!frame)frame=requestAnimationFrame(render);}
 function reset(){yaw=2.25;pitch=.22;distance=3.65;request();}
 function rotate(x,y){yaw+=x;pitch=Math.max(-1.35,Math.min(1.5,pitch+y));request();}
 let drag=null;
 canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
 canvas.addEventListener('pointermove',e=>{if(!drag)return;rotate(-(e.clientX-drag.x)*.009,(e.clientY-drag.y)*.007);drag={x:e.clientX,y:e.clientY};});
 for(const event of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(event,()=>{drag=null;});
 canvas.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','+','=','-'].includes(e.key))e.preventDefault();else return;if(e.key==='ArrowLeft')rotate(-.2,0);if(e.key==='ArrowRight')rotate(.2,0);if(e.key==='ArrowUp')rotate(0,.15);if(e.key==='ArrowDown')rotate(0,-.15);if(e.key==='Home')reset();if(e.key==='+'||e.key==='='){distance=Math.max(2.5,distance-.2);request();}if(e.key==='-'){distance=Math.min(5,distance+.2);request();}});
 new ResizeObserver(request).observe(canvas);
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();visible=false;cancelAnimationFrame(frame);frame=0;if(onError)onError();else{document.getElementById('brain-fallback').hidden=false;document.getElementById('brain-status').textContent='3D context lost · text view active';}});
 buildMarkers();request();
 return {
  setMoment(i,isPlaying){activityMode=false;selected=i;playing=isPlaying;targets=emphasis.map(r=>r[i]);buildMarkers();request();},
  setActivity(values,i,isPlaying){activityMode=true;playing=isPlaying;targets=values.map(v=>Math.max(0,Math.min(1,v)));if(i!==selected){selected=i;buildMarkers();}request();},
  setPlaying(on){playing=on;request();},setVisible(on){visible=on;if(on)request();else{cancelAnimationFrame(frame);frame=0;}},
  setReducedMotion(on){reduced=on;request();},rotate,reset,
  top(){yaw=0;pitch=1.49;request();},
  setOpacity(value){opacity=Math.max(.1,Math.min(1,value));transparent=opacity<1;for(const s of surfaces){s.mesh.material.transparent=transparent;s.mesh.material.opacity=opacity;s.mesh.material.depthWrite=!transparent;s.mesh.material.needsUpdate=true;}markers.traverse(object=>{if(object.material)object.material.depthTest=!transparent;});for(const object of signals.children)object.material.depthTest=!transparent;request();},
  setHemisphere(value){hemisphere=value;request();}
 };
}
