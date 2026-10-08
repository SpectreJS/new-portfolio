import{a as e,c as t,i as n,n as r,o as i,r as a,s as o,t as s}from"./three-B-JnBFw3.js";var c=`
uniform float uTime;
uniform float uIntensity;
uniform float uProgress;
uniform vec2 uPointer;
uniform float uPixelRatio;
attribute float aSeed;
varying float vDisplace;
varying float vSeed;

vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main(){
  vec3 p = position;
  float freq = mix(0.9, 2.2, uProgress);
  float n = snoise(p * freq + vec3(uTime * 0.18, uTime * 0.12, 0.0));
  float pull = smoothstep(1.6, 0.0, distance(normalize(p).xy, uPointer)) * uIntensity;
  float d = n * (0.22 + uProgress * 0.35) + pull * 0.45;
  p += normalize(p) * d;
  vDisplace = d;
  vSeed = aSeed;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.4 + aSeed * 2.2 + max(d, 0.0) * 6.0) * uPixelRatio * (4.0 / -mv.z);
}
`,l=`
uniform vec3 uBone;
uniform vec3 uAccent;
varying float vDisplace;
varying float vSeed;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c);
  if (r > 0.5) discard;
  float alpha = smoothstep(0.5, 0.0, r);
  float heat = smoothstep(0.05, 0.4, vDisplace);
  vec3 color = mix(uBone, uAccent, heat);
  gl_FragColor = vec4(color, alpha * (0.35 + vSeed * 0.55));
}
`,u=class{constructor(u){this.canvas=u,this.pointer={x:0,y:0,tx:0,ty:0},this.intensity={value:0,target:0},this.progress=0,this.running=!1,this.clockStart=performance.now(),this.renderer=new s({canvas:u,antialias:!1,alpha:!0,powerPreference:`high-performance`}),this.pixelRatio=Math.min(window.devicePixelRatio,1.5),this.renderer.setPixelRatio(this.pixelRatio),this.scene=new i,this.camera=new n(35,1,.1,50),this.camera.position.z=7;let d=new t(1.6,160,160),f=d.attributes.position.count,p=new Float32Array(f);for(let e=0;e<f;e++)p[e]=Math.random();d.setAttribute(`aSeed`,new r(p,1)),this.material=new o({vertexShader:c,fragmentShader:l,transparent:!0,depthWrite:!1,blending:2,uniforms:{uTime:{value:0},uIntensity:{value:0},uProgress:{value:0},uPointer:{value:[0,0]},uPixelRatio:{value:this.pixelRatio},uBone:{value:new a(`#efebe4`)},uAccent:{value:new a(`#ff4f1a`)}}}),this.points=new e(d,this.material),this.scene.add(this.points),this.tick=this.tick.bind(this),this.resize=this.resize.bind(this),this.resize(),window.addEventListener(`resize`,this.resize)}resize(){let{clientWidth:e,clientHeight:t}=this.canvas.parentElement;this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}setPointer(e,t){this.pointer.tx=e,this.pointer.ty=t,this.intensity.target=1}releasePointer(){this.intensity.target=0}setProgress(e){this.progress=e}start(){this.running||(this.running=!0,this.raf=requestAnimationFrame(this.tick))}stop(){this.running=!1,cancelAnimationFrame(this.raf)}tick(){if(!this.running)return;let e=(performance.now()-this.clockStart)/1e3,t=this.pointer;t.x+=(t.tx-t.x)*.06,t.y+=(t.ty-t.y)*.06,this.intensity.value+=(this.intensity.target-this.intensity.value)*.05;let n=this.material.uniforms;n.uTime.value=e,n.uIntensity.value=this.intensity.value,n.uProgress.value+=(this.progress-n.uProgress.value)*.08,n.uPointer.value=[t.x*1.6,t.y*1.6],this.points.rotation.y=e*.08+t.x*.35,this.points.rotation.x=-t.y*.25+this.progress*.6,this.renderer.render(this.scene,this.camera),this.raf=requestAnimationFrame(this.tick)}dispose(){this.stop(),window.removeEventListener(`resize`,this.resize),this.points.geometry.dispose(),this.material.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss?.()}};export{u as default};
//# sourceMappingURL=LabScene-CRyfEk8h.js.map