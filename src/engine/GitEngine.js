/**
 * GitEngine — Moteur de simulation Git complet.
 *
 * Maintient un état interne réaliste :
 *   - workingDir, stagingArea, commits[], branches{}, HEAD
 *   - stash[], remotes{}, config{}, tags{}
 */

let hashCounter = 0;
function generateHash() {
  hashCounter++;
  return (hashCounter.toString(36).padStart(3, '0') + Math.random().toString(36).slice(2, 6)).slice(0, 7);
}

export function createEngine(initialState = null) {
  const state = initialState ? JSON.parse(JSON.stringify(initialState)) : {
    workingDir: {}, stagingArea: {}, commits: [], branches: {},
    HEAD: null, stash: [], remotes: {}, config: {}, tags: {}, cwd: '~', initialized: false,
  };

  function execute(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return ok('');
    const p = parseCmd(cmd);
    const base = p[0];

    // Shell
    if (base === 'mkdir') return ok('');
    if (base === 'cd') { state.cwd = p[1] || '~'; return ok(''); }
    if (base === 'pwd') return ok(`/home/dev/${state.cwd.replace('~','projet')}`);
    if (base === 'ls') {
      const files = Object.keys(state.workingDir);
      if (cmd.includes('-l')) {
        let o = `total ${files.length+2}\ndrwxr-xr-x 3 dev dev 4096 .\ndrwxr-xr-x 5 dev dev 4096 ..\n`;
        if (state.initialized) o += 'drwxr-xr-x 8 dev dev 4096 .git\n';
        files.forEach(f => o += `-rw-r--r-- 1 dev dev ${(state.workingDir[f]||'').length} ${f}\n`);
        return ok(o.trimEnd());
      }
      return ok(files.join('  '));
    }
    if (base === 'touch') {
      if (!p[1]) return err('touch: opérande manquant');
      if (state.workingDir[p[1]] === undefined) state.workingDir[p[1]] = '';
      return ok('');
    }
    if (base === 'echo') {
      const r = cmd.match(/echo\s+(.+?)\s*>{1,2}\s*(\S+)/);
      if (r) {
        const content = r[1].replace(/^["']|["']$/g,'');
        state.workingDir[r[2]] = cmd.includes('>>') ? (state.workingDir[r[2]]||'') + content + '\n' : content + '\n';
        return ok('');
      }
      return ok(p.slice(1).join(' ').replace(/^["']|["']$/g,''));
    }
    if (base === 'cat') {
      if (!p[1]) return err('cat: opérande manquant');
      if (state.workingDir[p[1]] === undefined) return err(`cat: ${p[1]}: No such file or directory`);
      return ok(state.workingDir[p[1]] || '(fichier vide)');
    }
    if (base === 'rm') { const f = p.find(x=>!x.startsWith('-') && x!=='rm'); if(f) delete state.workingDir[f]; return ok(''); }
    if (base === 'clear') return ok('__CLEAR__');
    if (base === 'help') return ok('Commandes Git: init, add, commit, status, log, branch, checkout, switch,\nmerge, push, pull, fetch, clone, stash, reset, revert, reflog, cherry-pick,\nrebase, tag, restore, diff, remote, config\n\nShell: mkdir, cd, ls, touch, echo, cat, rm, pwd, clear');

    if (base !== 'git') return err(`bash: ${base}: command not found`);
    const g = p[1];
    if (!g) return err('usage: git <command>');

    // git init
    if (g === 'init') {
      if (state.initialized) return ok('Reinitialized existing Git repository');
      state.initialized = true; state.branches = { main: null }; state.HEAD = 'main';
      return ok('Initialized empty Git repository in .git/');
    }

    if (!state.initialized && !['clone','config','--version'].includes(g))
      return err('fatal: not a git repository');

    // git config
    if (g === 'config') {
      if (cmd.includes('--list')) return ok(Object.entries(state.config).map(([k,v])=>`${k}=${v}`).join('\n')||'(vide)');
      const nm = cmd.match(/user\.name\s+["'](.+?)["']/); if(nm){state.config['user.name']=nm[1]; return ok('');}
      const em = cmd.match(/user\.email\s+["'](.+?)["']/); if(em){state.config['user.email']=em[1]; return ok('');}
      const cf = cmd.match(/config\s+(?:--global\s+)?(\S+)\s+["']?(.+?)["']?\s*$/);
      if(cf){state.config[cf[1]]=cf[2]; return ok('');}
      return ok('');
    }
    if (g === '--version') return ok('git version 2.47.1');

    // git status
    if (g === 'status') return ok(buildStatus());

    // git add
    if (g === 'add') {
      const t = p[2];
      if (!t) return err('Nothing specified, nothing added.');
      if (t === '.' || t === '-A' || t === '--all') {
        Object.keys(state.workingDir).forEach(f => state.stagingArea[f] = state.workingDir[f]);
      } else {
        if (state.workingDir[t] === undefined) return err(`fatal: pathspec '${t}' did not match any files`);
        state.stagingArea[t] = state.workingDir[t];
      }
      return ok('');
    }

    // git commit
    if (g === 'commit') {
      if (cmd.includes('--amend')) {
        if (!state.commits.length) return err('fatal: no commits to amend');
        const mm = cmd.match(/-m\s+["'](.+?)["']/);
        const last = state.commits[state.commits.length-1];
        if(mm) last.message = mm[1];
        Object.assign(last.files, state.stagingArea);
        state.stagingArea = {};
        return ok(`[${state.HEAD} ${last.hash}] ${last.message}`);
      }
      const staged = Object.keys(state.stagingArea);
      if (!staged.length) return err('nothing to commit (use "git add" to stage files)');
      const mm = cmd.match(/-m\s+["'](.+?)["']/);
      if (!mm) return err("error: switch 'm' requires a value");
      const hash = generateHash();
      const parentHash = state.branches[state.HEAD] || null;
      const c = { hash, message: mm[1], parent: parentHash, parents: parentHash?[parentHash]:[],
        files: {...state.stagingArea}, branch: state.HEAD, timestamp: Date.now(),
        author: state.config['user.name']||'dev' };
      state.commits.push(c);
      state.branches[state.HEAD] = hash;
      state.stagingArea = {};
      return ok(`[${state.HEAD} ${hash}] ${c.message}\n ${staged.length} file${staged.length>1?'s':''} changed`);
    }

    // git log
    if (g === 'log') {
      if (!state.commits.length) return err('fatal: no commits yet');
      const oneline = cmd.includes('--oneline');
      const all = cmd.includes('--all');
      const commits = all ? [...state.commits].reverse() : getChain(state.branches[state.HEAD]);
      if (oneline) return ok(commits.map(c=>{
        const l=labels(c.hash); return `${c.hash}${l.length?` (${l.join(', ')})`:''} ${c.message}`;
      }).join('\n'));
      return ok(commits.map(c=>{
        const l=labels(c.hash);
        return `commit ${c.hash}${l.length?` (${l.join(', ')})`:''}\nAuthor: ${c.author}\n\n    ${c.message}`;
      }).join('\n\n'));
    }

    // git diff
    if (g === 'diff') {
      if (cmd.includes('--staged')||cmd.includes('--cached')) {
        const d=Object.keys(state.stagingArea);
        return ok(d.length?d.map(f=>`diff --git a/${f} b/${f}\n+++ staged`).join('\n'):'');
      }
      return ok('');
    }

    // git branch
    if (g === 'branch') {
      if (cmd.includes('-d ')||cmd.includes('-D ')) {
        const b=p[p.length-1];
        if(b===state.HEAD) return err(`error: Cannot delete branch '${b}' checked out`);
        if(!state.branches[b]) return err(`error: branch '${b}' not found`);
        const h=state.branches[b]; delete state.branches[b];
        return ok(`Deleted branch ${b} (was ${h}).`);
      }
      const nb=p[2];
      if(nb){
        if(state.branches[nb]!==undefined) return err(`fatal: A branch named '${nb}' already exists.`);
        state.branches[nb] = state.branches[state.HEAD]||null;
        return ok('');
      }
      return ok(Object.keys(state.branches).map(b=>b===state.HEAD?`* ${b}`:`  ${b}`).join('\n'));
    }

    // git checkout / switch
    if (g === 'checkout' || g === 'switch') {
      const create = cmd.includes('-b')||cmd.includes('-c');
      const bn = p[p.length-1];
      if (create) {
        if (state.branches[bn]!==undefined) return err(`fatal: branch '${bn}' already exists.`);
        state.branches[bn] = state.branches[state.HEAD]||null;
        state.HEAD = bn;
        return ok(`Switched to a new branch '${bn}'`);
      }
      if (!state.branches[bn]) return err(`error: '${bn}' did not match any branch`);
      state.HEAD = bn;
      return ok(`Switched to branch '${bn}'`);
    }

    // git merge
    if (g === 'merge') {
      const bn=p[2];
      if(!bn) return err('fatal: no branch specified');
      if(!state.branches[bn]) return err(`merge: ${bn} - not something we can merge`);
      const cur=state.branches[state.HEAD], mrg=state.branches[bn];
      if(cur===mrg) return ok('Already up to date.');
      // Fast-forward check
      const canFF = !cur || getChain(mrg).some(c=>c.hash===cur);
      if(canFF) { state.branches[state.HEAD]=mrg; return ok(`Fast-forward\n ${cur||'000'}..${mrg}`); }
      const hash=generateHash();
      state.commits.push({ hash, message:`Merge branch '${bn}' into ${state.HEAD}`,
        parent:cur, parents:[cur,mrg].filter(Boolean), files:{}, branch:state.HEAD,
        timestamp:Date.now(), author:state.config['user.name']||'dev', isMerge:true });
      state.branches[state.HEAD]=hash;
      return ok("Merge made by the 'ort' strategy.");
    }

    // git remote
    if (g === 'remote') {
      if(p[2]==='add'){
        const n=p[3],u=p[4];
        if(!n||!u) return err('usage: git remote add <name> <url>');
        if(state.remotes[n]) return err(`fatal: remote ${n} already exists.`);
        state.remotes[n]={url:u,branches:{}}; return ok('');
      }
      if(cmd.includes('-v')) return ok(Object.entries(state.remotes).map(([n,r])=>`${n}\t${r.url} (fetch)\n${n}\t${r.url} (push)`).join('\n'));
      return ok(Object.keys(state.remotes).join('\n'));
    }

    // git clone
    if (g === 'clone') {
      const url=p[2]; if(!url) return err('usage: git clone <url>');
      state.initialized=true; state.branches={main:null}; state.HEAD='main';
      state.remotes.origin={url,branches:{}};
      return ok(`Cloning into '${url.split('/').pop()?.replace('.git','')}'...\nReceiving objects: 100%, done.`);
    }

    // git push
    if (g === 'push') {
      const rn=p[2]||'origin', bn=p[3]||state.HEAD;
      if(!state.remotes[rn]) return err(`fatal: '${rn}' does not appear to be a git repository`);
      state.remotes[rn].branches[bn]=state.branches[state.HEAD];
      return ok(`To ${state.remotes[rn].url}\n   ${bn} -> ${bn}`);
    }
    if (g === 'pull') return ok('Already up to date.');
    if (g === 'fetch') return ok('');

    // git stash
    if (g === 'stash') {
      const sub=p[2];
      if(!sub||sub==='push') {
        const hasChanges = Object.keys(state.stagingArea).length>0 || getUntracked().length>0 || getModified().length>0;
        if(!hasChanges) return err('No local changes to save');
        const mm=cmd.match(/-m\s+["'](.+?)["']/);
        state.stash.push({ workingDir:{...state.workingDir}, stagingArea:{...state.stagingArea},
          message: mm?mm[1]:`WIP on ${state.HEAD}`, branch:state.HEAD });
        const lc=state.commits.find(c=>c.hash===state.branches[state.HEAD]);
        if(lc) state.workingDir={...lc.files}; state.stagingArea={};
        return ok(`Saved working directory and index state`);
      }
      if(sub==='list') return ok(state.stash.length?state.stash.map((s,i)=>`stash@{${state.stash.length-1-i}}: ${s.message}`).reverse().join('\n'):'');
      if(sub==='pop'||sub==='apply') {
        if(!state.stash.length) return err('No stash entries found.');
        const e=sub==='pop'?state.stash.pop():state.stash[state.stash.length-1];
        Object.assign(state.workingDir, e.workingDir); state.stagingArea={...e.stagingArea};
        return ok(`Changes restored.${sub==='pop'?'\nDropped refs/stash@{0}':''}`);
      }
      if(sub==='drop'){if(!state.stash.length) return err('No stash entries.'); state.stash.pop(); return ok('Dropped refs/stash@{0}');}
      if(sub==='clear'){state.stash=[]; return ok('');}
      return err('usage: git stash [push|pop|apply|list|drop|clear]');
    }

    // git reset
    if (g === 'reset') {
      const hard=cmd.includes('--hard'), soft=cmd.includes('--soft');
      const tm=cmd.match(/HEAD~(\d+)/); const steps=tm?parseInt(tm[1]):1;
      if(!state.commits.length) return err('fatal: no commits');
      let th=state.branches[state.HEAD];
      for(let i=0;i<steps&&th;i++){const c=state.commits.find(x=>x.hash===th); if(c)th=c.parent;}
      state.branches[state.HEAD]=th;
      if(hard){const tc=state.commits.find(c=>c.hash===th); state.workingDir=tc?{...tc.files}:{}; state.stagingArea={}; return ok(`HEAD is now at ${th||'(root)'}`);}
      if(soft) return ok('');
      state.stagingArea={}; return ok('Unstaged changes after reset.');
    }

    // git revert
    if (g === 'revert') {
      const th=p[2]; if(!th) return err('usage: git revert <commit>');
      const src=state.commits.find(c=>c.hash===th);
      const hash=generateHash();
      state.commits.push({hash, message:`Revert "${src?.message||th}"`, parent:state.branches[state.HEAD],
        parents:[state.branches[state.HEAD]].filter(Boolean), files:{}, branch:state.HEAD,
        timestamp:Date.now(), author:state.config['user.name']||'dev'});
      state.branches[state.HEAD]=hash;
      return ok(`[${state.HEAD} ${hash}] Revert`);
    }

    if (g === 'reflog') return ok(state.commits.length?[...state.commits].reverse().map((c,i)=>`${c.hash} HEAD@{${i}}: commit: ${c.message}`).join('\n'):'(empty)');

    // git cherry-pick
    if (g === 'cherry-pick') {
      const th=p[2]; if(!th) return err('usage: git cherry-pick <commit>');
      const src=state.commits.find(c=>c.hash===th); if(!src) return err(`fatal: bad object ${th}`);
      const hash=generateHash();
      state.commits.push({hash,message:src.message,parent:state.branches[state.HEAD],
        parents:[state.branches[state.HEAD]].filter(Boolean),files:{...src.files},branch:state.HEAD,
        timestamp:Date.now(),author:state.config['user.name']||'dev'});
      state.branches[state.HEAD]=hash;
      Object.assign(state.workingDir, src.files);
      return ok(`[${state.HEAD} ${hash}] ${src.message}`);
    }

    if (g === 'rebase') {
      const tb=p[p.length-1];
      if(!tb||!state.branches[tb]) return err(`fatal: invalid upstream '${tb}'`);
      state.branches[state.HEAD]=state.branches[tb];
      return ok(`Successfully rebased and updated refs/heads/${state.HEAD}.`);
    }

    // git tag
    if (g === 'tag') {
      const hasA=cmd.includes('-a');
      const tn=hasA?p[3]:p[2];
      if(!tn) return ok(Object.keys(state.tags).sort().join('\n'));
      state.tags[tn]=state.branches[state.HEAD]; return ok('');
    }

    // git restore
    if (g === 'restore') {
      if(cmd.includes('--staged')){const f=p[p.length-1]; if(f!=='--staged')delete state.stagingArea[f]; else state.stagingArea={}; return ok('');}
      const f=p[2]; if(f){const lc=state.commits.find(c=>c.hash===state.branches[state.HEAD]); if(lc?.files[f]!==undefined)state.workingDir[f]=lc.files[f];}
      return ok('');
    }

    if (g === 'blame') {
      const f=p[2]; if(!f) return err('usage: git blame <file>');
      const c=state.workingDir[f]; if(c===undefined) return err(`fatal: no such path '${f}'`);
      const lines=(c||'').split('\n').filter(Boolean);
      const h=state.branches[state.HEAD]||'0000000';
      return ok(lines.map((l,i)=>`${h} (${state.config['user.name']||'dev'} ${i+1}) ${l}`).join('\n')||'(empty)');
    }

    return err(`git: '${g}' is not a git command.`);
  }

  function ok(output){return {output,error:false,state:JSON.parse(JSON.stringify(state))};}
  function err(msg){return {output:msg,error:true,state:JSON.parse(JSON.stringify(state))};}

  function getModified(){
    const lc=state.commits.find(c=>c.hash===state.branches[state.HEAD]);
    const cf=lc?.files||{};
    return Object.keys(state.workingDir).filter(f=>cf[f]!==undefined&&cf[f]!==state.workingDir[f]&&!state.stagingArea[f]);
  }
  function getUntracked(){
    const lc=state.commits.find(c=>c.hash===state.branches[state.HEAD]);
    const cf=lc?.files||{}; const sa=state.stagingArea;
    return Object.keys(state.workingDir).filter(f=>cf[f]===undefined&&!sa[f]);
  }

  function buildStatus(){
    let lines=[`On branch ${state.HEAD}`];
    if(!state.commits.length) lines.push('\nNo commits yet\n'); else lines.push('');
    const staged=Object.keys(state.stagingArea), modified=getModified(), untracked=getUntracked();
    if(staged.length){lines.push('Changes to be committed:'); staged.forEach(f=>lines.push(`  new file:   ${f}`)); lines.push('');}
    if(modified.length){lines.push('Changes not staged for commit:'); modified.forEach(f=>lines.push(`  modified:   ${f}`)); lines.push('');}
    if(untracked.length){lines.push('Untracked files:'); untracked.forEach(f=>lines.push(`  ${f}`)); lines.push('');}
    if(!staged.length&&!modified.length&&!untracked.length) lines.push('nothing to commit, working tree clean');
    return lines.join('\n');
  }

  function labels(hash){
    const l=[];
    Object.entries(state.branches).forEach(([n,h])=>{if(h===hash){if(n===state.HEAD)l.unshift(`HEAD -> ${n}`);else l.push(n);}});
    Object.entries(state.tags).forEach(([n,h])=>{if(h===hash)l.push(`tag: ${n}`);});
    return l;
  }
  function getChain(hash){
    const chain=[],vis=new Set(); let cur=hash;
    while(cur&&!vis.has(cur)){vis.add(cur);const c=state.commits.find(x=>x.hash===cur);if(!c)break;chain.push(c);cur=c.parent;}
    return chain;
  }

  function parseCmd(cmd){
    const parts=[];let cur='',inQ=null;
    for(let i=0;i<cmd.length;i++){const ch=cmd[i];if(inQ){if(ch===inQ)inQ=null;else cur+=ch;}else if(ch==='"'||ch==="'")inQ=ch;else if(ch===' '){if(cur){parts.push(cur);cur='';}}else cur+=ch;}
    if(cur)parts.push(cur);return parts;
  }

  return { execute, getState:()=>JSON.parse(JSON.stringify(state)) };
}
