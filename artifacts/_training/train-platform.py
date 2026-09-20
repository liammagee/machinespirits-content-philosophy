"""Reproducible offline training for the classroom platform game.
Run with Python + NumPy. No external dataset, service, or reader data.
One causal attention head + residual/tanh + vocabulary projection; all matrices
and token embeddings are learned. This is a small teaching decoder, not the full
Vaswani encoder-decoder. Padding is masked in loss and future keys are masked.
"""
from pathlib import Path
import json, hashlib, os
os.environ.setdefault('OPENBLAS_NUM_THREADS','1')
import numpy as np
ROOT=Path(__file__).resolve().parents[1]/'attention-assets'
TOPICS={
 'cat': ('cat','the cat sat on the mat'),
 'glass': ('glass','the mover wrapped the fragile glass'),
 'machines': ('machine','machines learn by paying attention')
}
FORMATS={
 'mystery': [
  'One {noun} clue changes everything . Read on to reveal the missing word .',
  'You saw {sentence} . But which word comes next ? Keep reading to find out .',
  'The hidden {noun} clue is waiting . Open the next card for the answer .'],
 'streak': [
  'Keep your streak alive . Finish this {noun} sentence and unlock the next one .',
  'One more {noun} challenge . Choose the missing word to keep your progress .',
  'Your next {noun} task is ready . Complete the sentence and continue your streak .'],
 'guide': [
  'Read {sentence} . Hold the earlier clue in mind while choosing a possible ending .',
  'Follow this {noun} example . Notice the clue and use it to finish the sentence .',
  'Look again at {sentence} . Connect the words and choose an ending that fits .'],
 'inquiry': [
  'Why this {noun} task ? Compare two endings and decide what you want to understand .',
  'Pause after {sentence} . Who chose this question and what else could you ask ?',
  'Discuss the {noun} example . Compare your reasons and choose whether to continue .']
}
records=[]
for topic,(noun,sentence) in TOPICS.items():
 for form,patterns in FORMATS.items():
  for variant,pattern in enumerate(patterns):
   prompt=['<start>',f'<{topic}>',f'<{form}>',f'<v{variant}>']
   tokens=pattern.format(noun=noun,sentence=sentence).split()+['<end>']
   features={'mystery':[.92,.65,.63,.1],'streak':[.55,.65,.95,.06],'guide':[.42,.93,.7,.26],'inquiry':[.38,.82,.45,.9]}[form].copy()
   features[0]=min(1,features[0]+(variant-1)*.04)
   # Fictional training labels: the institution's success rule is part of the data.
   historical=round(35+110*features[0]+90*features[1]+120*features[2]-180*features[3]+(variant-1)*3+(len(sentence)%5))
   records.append({'topic':topic,'format':form,'variant':variant,'prompt':prompt,'tokens':tokens,'features':features,'historicalCapturePer100':historical})
vocab=sorted({t for r in records for t in r['prompt']+r['tokens']})
ids={t:i for i,t in enumerate(vocab)}
B=len(records); D=24; T=max(len(r['prompt']+r['tokens'])-1 for r in records); V=len(vocab)
X=np.zeros((B,T),dtype=int); Y=X.copy(); mask=np.zeros((B,T))
for i,r in enumerate(records):
 seq=[ids[t] for t in r['prompt']+r['tokens']]
 X[i,:len(seq)-1]=seq[:-1];Y[i,:len(seq)-1]=seq[1:];mask[i,3:len(seq)-1]=1
rng=np.random.default_rng(479)
p={'E':rng.normal(0,.16,(V,D)),'Q':rng.normal(0,.12,(D,D)),'K':rng.normal(0,.12,(D,D)),'V':rng.normal(0,.12,(D,D)),'O':rng.normal(0,.12,(D,D)),'W':rng.normal(0,.12,(D,V)),'b':np.zeros(V)}
pos=np.array([[np.sin(t/(10000**(2*(d//2)/D))) if d%2==0 else np.cos(t/(10000**(2*(d//2)/D))) for d in range(D)] for t in range(T)])
causal=np.triu(np.ones((T,T),dtype=bool),1)
def softmax(z):
 e=np.exp(z-z.max(axis=-1,keepdims=True));return e/e.sum(axis=-1,keepdims=True)
def forward():
 x=p['E'][X]+pos;q=x@p['Q'];k=x@p['K'];v=x@p['V']
 scores=q@k.transpose(0,2,1)/np.sqrt(D);scores[:,causal]=-1e9
 a=softmax(scores);mix=a@v;h=np.tanh(x+mix@p['O']);probs=softmax(h@p['W']+p['b'])
 loss=-np.sum(np.log(probs[np.arange(B)[:,None],np.arange(T),Y]+1e-12)*mask)/mask.sum()
 return loss,(x,q,k,v,a,mix,h,probs)
m={k:np.zeros_like(v) for k,v in p.items()};u={k:np.zeros_like(v) for k,v in p.items()};losses=[]
for step in range(1,1001):
 loss,(x,q,k,v,a,mix,h,probs)=forward()
 if step==1 or step%100==0:losses.append({'step':step-1,'loss':float(loss)})
 dz=probs.copy();dz[np.arange(B)[:,None],np.arange(T),Y]-=1;dz*=mask[:,:,None]/mask.sum()
 g={};g['W']=np.einsum('btd,btv->dv',h,dz);g['b']=dz.sum(axis=(0,1))
 dr=(dz@p['W'].T)*(1-h*h);g['O']=np.einsum('btd,bte->de',mix,dr);dm=dr@p['O'].T
 da=dm@v.transpose(0,2,1);dv=a.transpose(0,2,1)@dm
 ds=a*(da-(da*a).sum(axis=-1,keepdims=True));dq=ds@k/np.sqrt(D);dk=ds.transpose(0,2,1)@q/np.sqrt(D)
 for name,deriv in [('Q',dq),('K',dk),('V',dv)]:g[name]=np.einsum('btd,bte->de',x,deriv)
 dx=dr+dq@p['Q'].T+dk@p['K'].T+dv@p['V'].T;g['E']=np.zeros_like(p['E']);np.add.at(g['E'],X,dx)
 for name in p:
  grad=np.clip(g[name],-1,1);m[name]=.9*m[name]+.1*grad;u[name]=.999*u[name]+.001*grad*grad
  p[name]-=(.012)*(m[name]/(1-.9**step))/(np.sqrt(u[name]/(1-.999**step))+1e-8)
final,c=forward();losses.append({'step':1000,'loss':float(final)})
accuracy=float(((c[-1].argmax(-1)==Y)*mask).sum()/mask.sum())
corpus=json.dumps(records,indent=2)+'\n';(ROOT/'platform-corpus.json').write_text(corpus)
rewardX=np.array([[1]+r['features'] for r in records]); rewardY=np.array([r['historicalCapturePer100'] for r in records]); rewardWeights=np.linalg.solve(rewardX.T@rewardX+.01*np.eye(5),rewardX.T@rewardY)
model={'parameterCount':sum(v.size for v in p.values()),'engagementWeights':rewardWeights.round(9).tolist(),'version':'479-platform-1','architecture':'one learned causal attention head, residual/tanh, learned output projection','dimension':D,'vocabulary':vocab,'parameters':{k:v.round(9).tolist() for k,v in p.items()},'training':{'seed':479,'examples':B,'steps':1000,'optimizer':'Adam, learning rate 0.012','loss':losses,'trainingTokenAccuracy':accuracy,'corpusSha256':hashlib.sha256(corpus.encode()).hexdigest(),'scope':'All examples are authored classroom text. No held-out evaluation or claim of generalization.'}}
(ROOT/'platform-model.json').write_text(json.dumps(model,separators=(',',':'))+'\n')
print(json.dumps({'examples':B,'vocabulary':V,'parameters':sum(v.size for v in p.values()),'initialLoss':losses[0]['loss'],'finalLoss':final,'trainingTokenAccuracy':accuracy,'modelBytes':(ROOT/'platform-model.json').stat().st_size}))
