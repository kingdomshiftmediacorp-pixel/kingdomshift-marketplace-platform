import { useState, useEffect, useRef } from "react";

// ─── FIVEFOLD MINISTRY DATA ───────────────────────────────────────────────────
const FIVEFOLD = [
  {
    id: "apostle",
    title: "Apostle",
    icon: "⚜",
    color: "#c8a96e",
    gradient: "linear-gradient(135deg,#c8a96e,#8a6530)",
    role: "Kingdom Architect & Sent One",
    mandate: "Establish foundations, plant new works, govern with authority",
    marketingFocus: "Vision casting, movement building, pioneering launches",
    aiAgent: "Aria",
    agentRole: "Strategic Launch Director",
    agentAvatar: "A",
    campaigns: ["Movement Launch", "Vision Declaration", "Territory Expansion", "Apostolic Network"],
    businesses: ["Church Planting Network", "Kingdom Enterprise Hub", "Leadership Academy", "Regional Ministries"],
  },
  {
    id: "prophet",
    title: "Prophet",
    icon: "◈",
    color: "#9b7fd4",
    gradient: "linear-gradient(135deg,#9b7fd4,#6347a8)",
    role: "Voice & Seer",
    mandate: "Declare God's word, intercede, reveal hidden things",
    marketingFocus: "Prophetic declarations, word releases, intercessory calls",
    aiAgent: "Elias",
    agentRole: "Message & Voice Strategist",
    agentAvatar: "E",
    campaigns: ["Prophetic Word Release", "Intercession Rally", "Revelation Series", "Night Watch"],
    businesses: ["Prophetic School", "Prayer Ministry", "Seer Training Institute", "Healing Rooms"],
  },
  {
    id: "evangelist",
    title: "Evangelist",
    icon: "◎",
    color: "#e8834a",
    gradient: "linear-gradient(135deg,#e8834a,#b55520)",
    role: "Harvester & Soul Winner",
    mandate: "Win souls, spread the Gospel, ignite fire in believers",
    marketingFocus: "Outreach campaigns, crusade promotion, salvation calls",
    aiAgent: "Zoe",
    agentRole: "Outreach & Conversion Specialist",
    agentAvatar: "Z",
    campaigns: ["Crusade Promo", "Street Evangelism", "Online Gospel Push", "Harvest Festival"],
    businesses: ["Evangelism Training Center", "Gospel Media Studio", "Outreach Supplies Co.", "Mission Trips Org"],
  },
  {
    id: "pastor",
    title: "Pastor",
    icon: "♥",
    color: "#68b89a",
    gradient: "linear-gradient(135deg,#68b89a,#3a8065)",
    role: "Shepherd & Caregiver",
    mandate: "Nurture, protect, disciple, and grow the flock",
    marketingFocus: "Community care, member retention, discipleship programs",
    aiAgent: "Grace",
    agentRole: "Community & Care Coordinator",
    agentAvatar: "G",
    campaigns: ["Discipleship Series", "Care Campaign", "Family Ministry", "Counseling Outreach"],
    businesses: ["Pastoral Counseling Center", "Family Life Ministry", "Care Groups Network", "Wellness Chapel"],
  },
  {
    id: "teacher",
    title: "Teacher",
    icon: "✦",
    color: "#7c9cbf",
    gradient: "linear-gradient(135deg,#7c9cbf,#4a7098)",
    role: "Equipper & Truth Revealer",
    mandate: "Teach the Word, equip saints, bring understanding",
    marketingFocus: "Course launches, study series, educational content",
    aiAgent: "Solomon",
    agentRole: "Education & Content Strategist",
    agentAvatar: "S",
    campaigns: ["Course Launch", "Bible Study Series", "Equipping Conference", "Truth Campaign"],
    businesses: ["Kingdom Bible Institute", "Online Course Platform", "Christian School", "Book & Media Ministry"],
  },
];

const BUSINESS_CATEGORIES = [
  { id: "tech", label: "Kingdom Tech", icon: "◻", color: "#7c9cbf" },
  { id: "finance", label: "Finance & Wealth", icon: "◈", color: "#c8a96e" },
  { id: "health", label: "Health & Wellness", icon: "♥", color: "#68b89a" },
  { id: "media", label: "Media & Creative", icon: "◎", color: "#e8834a" },
  { id: "education", label: "Education", icon: "✦", color: "#9b7fd4" },
  { id: "realestate", label: "Real Estate", icon: "⬡", color: "#d4a76a" },
];

const AGENT_TASKS = [
  { id: 1, agent: "Aria", task: "Drafting apostolic launch email sequence", status: "running", progress: 72, ministry: "apostle" },
  { id: 2, agent: "Zoe", task: "Writing crusade social media posts (7 days)", status: "running", progress: 45, ministry: "evangelist" },
  { id: 3, agent: "Solomon", task: "Creating course launch nurture sequence", status: "completed", progress: 100, ministry: "teacher" },
  { id: 4, agent: "Grace", task: "Building pastoral care email flow", status: "queued", progress: 0, ministry: "pastor" },
  { id: 5, agent: "Elias", task: "Scheduling prophetic word release posts", status: "running", progress: 88, ministry: "prophet" },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
  :root {
    --bg:#0a0907; --surface:#0f0d0a; --card:#161310; --card2:#1c1914;
    --border:rgba(200,169,110,0.13); --border2:rgba(200,169,110,0.07);
    --gold:#c8a96e; --gold-l:#e8cc96; --gold-d:rgba(200,169,110,0.4);
    --text:#f2eadb; --muted:#8b7355; --accent:#7c4f1e;
    --green:#48bb78; --orange:#ed8936; --red:#e05252; --purple:#9b7fd4;
    --teal:#68b89a; --blue:#7c9cbf;
    --fd:'Cinzel',serif; --fb:'Crimson Pro',serif; --fm:'JetBrains Mono',monospace;
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{background:var(--bg);color:var(--text);font-family:var(--fb);line-height:1.6;}
  ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-track{background:transparent;} ::-webkit-scrollbar-thumb{background:rgba(200,169,110,0.2);border-radius:99px;}
  input,select,textarea{background:rgba(200,169,110,0.04);border:1px solid var(--border);border-radius:10px;color:var(--text);font-family:var(--fb);font-size:14px;padding:11px 14px;outline:none;width:100%;transition:border .2s,box-shadow .2s;resize:vertical;}
  input:focus,select:focus,textarea:focus{border-color:var(--gold-d);box-shadow:0 0 0 3px rgba(200,169,110,0.07);}
  select option{background:#161310;color:var(--text);}
  button{cursor:pointer;font-family:var(--fd);border:none;transition:all .18s;}
  table{border-collapse:collapse;width:100%;}
  th{font-family:var(--fm);font-size:10px;letter-spacing:.1em;color:var(--muted);text-align:left;padding:10px 14px;border-bottom:1px solid var(--border2);text-transform:uppercase;}
  td{padding:13px 14px;border-bottom:1px solid var(--border2);font-size:14px;vertical-align:middle;}
  tr:last-child td{border-bottom:none;}
  tr:hover td{background:rgba(200,169,110,0.025);}
  .bg{background:linear-gradient(135deg,#c8a96e,#9a7235);color:#0a0907;border-radius:10px;padding:11px 22px;font-size:11px;font-weight:700;letter-spacing:.1em;}
  .bg:hover{opacity:.85;transform:translateY(-1px);box-shadow:0 6px 24px rgba(200,169,110,0.25);}
  .bo{background:transparent;color:var(--gold);border:1px solid var(--border);border-radius:10px;padding:10px 18px;font-size:11px;font-weight:600;letter-spacing:.07em;}
  .bo:hover{border-color:var(--gold-d);background:rgba(200,169,110,0.06);}
  .bd{background:rgba(224,82,82,0.1);color:var(--red);border:1px solid rgba(224,82,82,0.18);border-radius:10px;padding:8px 16px;font-size:11px;font-weight:600;letter-spacing:.06em;}
  .bd:hover{background:rgba(224,82,82,0.18);}
  .tag{padding:2px 10px;border-radius:99px;font-size:11px;font-family:var(--fm);letter-spacing:.05em;}
  .fade{animation:fadeUp .4s ease both;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  .st>*{animation:fadeUp .45s ease both;}
  .st>*:nth-child(1){animation-delay:.04s}.st>*:nth-child(2){animation-delay:.09s}.st>*:nth-child(3){animation-delay:.14s}.st>*:nth-child(4){animation-delay:.19s}.st>*:nth-child(5){animation-delay:.24s}.st>*:nth-child(6){animation-delay:.29s}
  @keyframes spin{to{transform:rotate(360deg)}}
  .pulse{animation:pulse 2s ease-in-out infinite;}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
  .typing::after{content:'▋';animation:blink .7s step-end infinite;color:var(--gold);}
  @keyframes blink{50%{opacity:0}}
  .prose{font-family:var(--fb);font-size:15px;line-height:1.85;color:var(--text);white-space:pre-wrap;}
  .glow{box-shadow:0 0 40px rgba(200,169,110,0.07),inset 0 1px 0 rgba(200,169,110,0.1);}
  .agent-ring{animation:agentPulse 3s ease-in-out infinite;}
  @keyframes agentPulse{0%,100%{box-shadow:0 0 0 0 rgba(200,169,110,0.3)}50%{box-shadow:0 0 0 8px rgba(200,169,110,0)}}
  .progress-bar{height:6px;background:rgba(200,169,110,0.1);border-radius:99px;overflow:hidden;}
  .progress-fill{height:100%;border-radius:99px;transition:width 1s ease;}
  .ministry-card{border-radius:18px;padding:22px;cursor:pointer;transition:all .25s;position:relative;overflow:hidden;}
  .ministry-card:hover{transform:translateY(-3px);}
  .idea-input{background:rgba(200,169,110,0.04);border:1.5px solid rgba(200,169,110,0.2);border-radius:16px;padding:20px;color:var(--text);font-family:var(--fb);font-size:15px;line-height:1.7;resize:none;width:100%;min-height:120px;outline:none;transition:border .2s,box-shadow .2s;}
  .idea-input:focus{border-color:rgba(200,169,110,0.45);box-shadow:0 0 0 4px rgba(200,169,110,0.06);}
  .idea-input::placeholder{color:var(--muted);font-style:italic;}
`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = n => n >= 1000 ? (n/1000).toFixed(1)+"k" : n;
const pct = (a,b) => b===0?0:Math.round((a/b)*100);

const Badge = ({status}) => {
  const m={active:{bg:"rgba(72,187,120,0.12)",c:"#48bb78",l:"Active"},paused:{bg:"rgba(237,137,54,0.12)",c:"#ed8936",l:"Paused"},draft:{bg:"rgba(160,174,192,0.1)",c:"#a0aec0",l:"Draft"},completed:{bg:"rgba(200,169,110,0.12)",c:"#c8a96e",l:"Done"},queued:{bg:"rgba(124,156,191,0.12)",c:"#7c9cbf",l:"Queued"},running:{bg:"rgba(72,187,120,0.12)",c:"#48bb78",l:"Running"},inactive:{bg:"rgba(237,137,54,0.1)",c:"#ed8936",l:"Inactive"}};
  const s=m[status]||m.draft;
  return <span className="tag" style={{background:s.bg,color:s.c}}>{s.l.toUpperCase()}</span>;
};

const Progress = ({value,color="var(--gold)"}) => (
  <div className="progress-bar">
    <div className="progress-fill" style={{width:`${Math.min(100,value)}%`,background:color}} />
  </div>
);

const Toggle = ({on,onChange}) => (
  <div onClick={onChange} style={{width:38,height:20,borderRadius:99,background:on?"rgba(72,187,120,0.2)":"rgba(139,115,85,0.15)",border:`1px solid ${on?"#48bb78":"var(--border)"}`,display:"flex",alignItems:"center",padding:"0 3px",cursor:"pointer",flexShrink:0,transition:"all .25s"}}>
    <div style={{width:13,height:13,borderRadius:"50%",background:on?"#48bb78":"var(--muted)",transition:"transform .22s",transform:on?"translateX(18px)":"none"}} />
  </div>
);

// ─── AI PERSONAL MARKETING TEAM ──────────────────────────────────────────────
function AIMarketingTeam({showToast}) {
  const [step, setStep] = useState("idea"); // idea → ministry → generating → dashboard
  const [idea, setIdea] = useState("");
  const [selectedMinistry, setSelectedMinistry] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [businessCat, setBusinessCat] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [goal, setGoal] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [streamTexts, setStreamTexts] = useState({});
  const [results, setResults] = useState(null);
  const [activeAgent, setActiveAgent] = useState(null);
  const [agentTasks, setAgentTasks] = useState(AGENT_TASKS);
  const [activeResultTab, setActiveResultTab] = useState("strategy");
  const [copiedKey, setCopiedKey] = useState(null);

  const ministry = FIVEFOLD.find(f => f.id === selectedMinistry);

  const GEN_STEPS = [
    { label: "Analyzing your idea...", agent: "Strategy", icon: "◎" },
    { label: "Building sales strategy...", agent: "Aria", icon: "⚜" },
    { label: "Writing email sequences...", agent: "Solomon", icon: "✦" },
    { label: "Crafting social posts...", agent: "Zoe", icon: "◈" },
    { label: "Creating SMS campaigns...", agent: "Grace", icon: "♥" },
    { label: "Building sales funnel copy...", agent: "Elias", icon: "◇" },
    { label: "Finalizing your team's plan...", agent: "All Agents", icon: "⚜" },
  ];

  const buildMegaPrompt = () => {
    const min = FIVEFOLD.find(f => f.id === selectedMinistry);
    return `You are a world-class AI marketing team for KingdomShift — the kingdom marketplace & marketing platform. A user just plugged in their idea. Generate a COMPLETE automated marketing plan.

IDEA: ${idea}
BUSINESS/MINISTRY NAME: ${businessName || "Kingdom Venture"}
MINISTRY TYPE: ${min?.title || "General"} — ${min?.mandate || "Kingdom building"}
BUSINESS CATEGORY: ${businessCat || "General"}
TARGET AUDIENCE: ${targetAudience || "Kingdom-minded people"}
SALES GOAL: ${goal || "Grow the mission and make sales"}

Return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "strategy": {
    "headline": "bold 1-line strategy headline",
    "summary": "2-3 sentence overview of the marketing strategy",
    "uniqueAngle": "the unique kingdom angle for this idea",
    "phases": [
      {"phase": "Phase 1", "name": "Awareness", "duration": "Week 1-2", "actions": ["action1","action2","action3"]},
      {"phase": "Phase 2", "name": "Engagement", "duration": "Week 3-4", "actions": ["action1","action2","action3"]},
      {"phase": "Phase 3", "name": "Conversion", "duration": "Week 5-6", "actions": ["action1","action2","action3"]}
    ]
  },
  "emailSequence": [
    {"day": "Day 1", "subject": "subject line", "preview": "preheader text", "body": "full email body 3-4 paragraphs with greeting, value, CTA, sign-off"},
    {"day": "Day 3", "subject": "subject line", "preview": "preheader text", "body": "full email body"},
    {"day": "Day 7", "subject": "subject line", "preview": "preheader text", "body": "full email body"},
    {"day": "Day 14", "subject": "subject line", "preview": "preheader text", "body": "full email body"}
  ],
  "socialPosts": [
    {"platform": "Instagram", "type": "Launch Post", "caption": "post with emojis and hashtags", "hook": "first line hook"},
    {"platform": "Facebook", "type": "Story Post", "caption": "post text", "hook": "first line hook"},
    {"platform": "LinkedIn", "type": "Professional Post", "caption": "post text", "hook": "first line hook"},
    {"platform": "Twitter/X", "type": "Thread Starter", "caption": "tweet text under 280 chars", "hook": "hook"},
    {"platform": "Instagram", "type": "Testimonial Request", "caption": "post text with hashtags", "hook": "hook"}
  ],
  "smsSequence": [
    {"day": "Day 1", "message": "SMS under 160 chars with [LINK]"},
    {"day": "Day 4", "message": "SMS under 160 chars with [LINK]"},
    {"day": "Day 10", "message": "SMS under 160 chars with [LINK]"}
  ],
  "salesFunnel": {
    "headline": "landing page headline",
    "subheadline": "subheadline",
    "hook": "opening hook paragraph",
    "painPoints": ["pain point 1","pain point 2","pain point 3"],
    "offer": "description of the offer",
    "cta": "call to action button text",
    "urgency": "urgency/scarcity element",
    "objections": [{"objection":"common objection","answer":"how to address it"}]
  },
  "adCopy": [
    {"platform": "Facebook/Instagram Ad", "headline": "ad headline", "body": "ad body 2-3 sentences", "cta": "button text"},
    {"platform": "Google Ad", "headline": "search headline", "body": "description", "cta": "cta"},
    {"platform": "YouTube Pre-roll", "headline": "hook (first 5 seconds)", "body": "script 30 seconds", "cta": "end card cta"}
  ],
  "contentCalendar": [
    {"week": "Week 1", "theme": "theme name", "posts": ["Mon: content idea","Wed: content idea","Fri: content idea"]},
    {"week": "Week 2", "theme": "theme name", "posts": ["Mon: content idea","Wed: content idea","Fri: content idea"]},
    {"week": "Week 3", "theme": "theme name", "posts": ["Mon: content idea","Wed: content idea","Fri: content idea"]},
    {"week": "Week 4", "theme": "theme name", "posts": ["Mon: content idea","Wed: content idea","Fri: content idea"]}
  ]
}`;
  };

  const runGeneration = async () => {
    if (!idea.trim()) { showToast("Please describe your idea first", "error"); return; }
    setStep("generating");
    setGenerating(true);
    setGenStep(0);

    // Animate through gen steps
    for (let i = 0; i < GEN_STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 900));
      setGenStep(i);
    }

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: buildMegaPrompt() }]
        })
      });
      const data = await res.json();
      const raw = data.content?.map(b => b.text||"").join("") || "";
      try {
        const clean = raw.replace(/```json|```/g,"").trim();
        const parsed = JSON.parse(clean);
        setResults(parsed);
        setStep("dashboard");
      } catch {
        setResults({ strategy:{ headline:"Your Kingdom Marketing Plan", summary:raw, uniqueAngle:"Kingdom-first approach", phases:[] }, emailSequence:[], socialPosts:[], smsSequence:[], salesFunnel:{}, adCopy:[], contentCalendar:[] });
        setStep("dashboard");
      }
    } catch {
      showToast("API error — check connection", "error");
      setStep("idea");
    }
    setGenerating(false);
  };

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast("Copied!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const CopyBtn = ({text, id}) => (
    <button onClick={() => copyText(text, id)} className="bo" style={{padding:"5px 12px",fontSize:10,flexShrink:0}}>
      {copiedKey===id ? "✓ Copied" : "Copy"}
    </button>
  );

  // ── STEP: IDEA INPUT ──
  if (step === "idea") return (
    <div className="fade" style={{display:"flex",flexDirection:"column",gap:28,maxWidth:860,margin:"0 auto"}}>
      {/* Header */}
      <div style={{textAlign:"center",padding:"8px 0 4px"}}>
        <div style={{fontSize:36,marginBottom:12}}>✦</div>
        <div style={{fontFamily:"var(--fd)",fontSize:28,color:"var(--gold)",letterSpacing:"0.08em",lineHeight:1.1}}>YOUR AI MARKETING TEAM</div>
        <div style={{color:"var(--muted)",fontSize:15,marginTop:10,fontStyle:"italic",maxWidth:480,margin:"10px auto 0"}}>Drop your idea. Your personal KingdomShift AI team builds your complete sales & marketing engine — automatically, 24/7.</div>
      </div>

      {/* Agent cards */}
      <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
        {FIVEFOLD.map(f => (
          <div key={f.id} style={{background:"var(--card)",border:`1px solid ${f.color}22`,borderRadius:14,padding:"14px 16px",textAlign:"center",minWidth:130,flex:"1 1 130px",maxWidth:160}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:f.gradient,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px",fontFamily:"var(--fd)",fontSize:13,color:"#0a0907",fontWeight:700}}>{f.agentAvatar}</div>
            <div style={{fontFamily:"var(--fd)",fontSize:10,color:f.color,letterSpacing:"0.08em"}}>{f.aiAgent}</div>
            <div style={{fontSize:11,color:"var(--muted)",marginTop:3,fontStyle:"italic"}}>{f.agentRole.split(" ").slice(0,2).join(" ")}</div>
          </div>
        ))}
      </div>

      {/* Idea input */}
      <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:20,padding:28}} className="glow">
        <div style={{fontFamily:"var(--fd)",fontSize:13,letterSpacing:"0.08em",color:"var(--gold)",marginBottom:6}}>STEP 1 — DESCRIBE YOUR IDEA</div>
        <div style={{color:"var(--muted)",fontSize:13,marginBottom:16,fontStyle:"italic"}}>Tell your team what you're building. Be as specific or as simple as you like.</div>
        <textarea className="idea-input" placeholder="e.g. I want to launch a kingdom business coaching program for Christian entrepreneurs who are struggling to scale their businesses. I have 10 years experience in business consulting and want to charge $2,000 for a 3-month program..." value={idea} onChange={e => setIdea(e.target.value)} rows={5} />

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:16}}>
          <div>
            <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--muted)",letterSpacing:"0.08em",marginBottom:6,textTransform:"uppercase"}}>Business / Ministry Name</div>
            <input placeholder="e.g. KingdomShift Entrepreneurs Hub" value={businessName} onChange={e=>setBusinessName(e.target.value)} />
          </div>
          <div>
            <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--muted)",letterSpacing:"0.08em",marginBottom:6,textTransform:"uppercase"}}>Target Audience</div>
            <input placeholder="e.g. Christian entrepreneurs 30-50" value={targetAudience} onChange={e=>setTargetAudience(e.target.value)} />
          </div>
          <div>
            <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--muted)",letterSpacing:"0.08em",marginBottom:6,textTransform:"uppercase"}}>Business Category</div>
            <select value={businessCat} onChange={e=>setBusinessCat(e.target.value)}>
              <option value="">Select category...</option>
              {BUSINESS_CATEGORIES.map(b=><option key={b.id} value={b.label}>{b.icon} {b.label}</option>)}
            </select>
          </div>
          <div>
            <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--muted)",letterSpacing:"0.08em",marginBottom:6,textTransform:"uppercase"}}>Primary Sales Goal</div>
            <input placeholder="e.g. Enroll 20 clients in 30 days" value={goal} onChange={e=>setGoal(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Ministry selector */}
      <div>
        <div style={{fontFamily:"var(--fd)",fontSize:13,letterSpacing:"0.08em",color:"var(--gold)",marginBottom:4}}>STEP 2 — SELECT YOUR FIVEFOLD ANOINTING</div>
        <div style={{color:"var(--muted)",fontSize:13,marginBottom:14,fontStyle:"italic"}}>This shapes how your AI team speaks and markets for you.</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12}} className="st">
          {FIVEFOLD.map(f => (
            <div key={f.id} className="ministry-card" onClick={() => setSelectedMinistry(f.id)}
              style={{background:selectedMinistry===f.id?`linear-gradient(135deg,${f.color}18,${f.color}08)`:"var(--card)",border:`1.5px solid ${selectedMinistry===f.id?f.color:"var(--border)"}`,textAlign:"center"}}>
              <div style={{fontSize:24,marginBottom:8,color:f.color}}>{f.icon}</div>
              <div style={{fontFamily:"var(--fd)",fontSize:11,color:selectedMinistry===f.id?f.color:"var(--text)",letterSpacing:"0.07em",marginBottom:4}}>{f.title.toUpperCase()}</div>
              <div style={{fontSize:10,color:"var(--muted)",lineHeight:1.4,fontStyle:"italic"}}>{f.role}</div>
              {selectedMinistry===f.id && <div style={{marginTop:8,fontSize:9,fontFamily:"var(--fm)",color:f.color,letterSpacing:"0.06em"}}>✓ SELECTED</div>}
            </div>
          ))}
        </div>
      </div>

      <button className="bg" onClick={runGeneration} style={{padding:"16px",fontSize:13,width:"100%",letterSpacing:"0.12em"}}>
        ✦ ACTIVATE YOUR MARKETING TEAM
      </button>
    </div>
  );

  // ── STEP: GENERATING ──
  if (step === "generating") return (
    <div className="fade" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:500,gap:36,textAlign:"center",maxWidth:600,margin:"0 auto"}}>
      {/* Spinning agents */}
      <div style={{position:"relative",width:120,height:120}}>
        <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"1px solid var(--border)",borderTopColor:"var(--gold)",animation:"spin 1.2s linear infinite"}} />
        <div style={{position:"absolute",inset:10,borderRadius:"50%",border:"1px solid transparent",borderBottomColor:ministry?.color||"var(--gold-d)",animation:"spin 1.8s linear infinite reverse"}} />
        <div style={{position:"absolute",inset:22,borderRadius:"50%",border:"1px solid transparent",borderLeftColor:"rgba(200,169,110,0.3)",animation:"spin 2.5s linear infinite"}} />
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fd)",fontSize:28,color:"var(--gold)"}}>
          {GEN_STEPS[genStep]?.icon || "✦"}
        </div>
      </div>

      <div>
        <div style={{fontFamily:"var(--fd)",fontSize:20,color:"var(--gold)",letterSpacing:"0.1em",marginBottom:8}}>ASSEMBLING YOUR TEAM</div>
        <div style={{color:"var(--muted)",fontSize:14,fontStyle:"italic",marginBottom:4}}>{GEN_STEPS[genStep]?.label}</div>
        <div style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--gold-d)"}}>Agent: {GEN_STEPS[genStep]?.agent}</div>
      </div>

      {/* Agent progress */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
        {FIVEFOLD.map((f, i) => (
          <div key={f.id} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:99,border:`1px solid ${genStep>i?f.color:"var(--border)"}`,background:genStep>i?`${f.color}12`:"transparent",transition:"all .4s"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:genStep>i?f.color:"var(--muted)",transition:"background .4s"}} className={genStep===i?"pulse":""} />
            <span style={{fontSize:10,fontFamily:"var(--fm)",color:genStep>i?f.color:"var(--muted)"}}>{f.aiAgent}</span>
          </div>
        ))}
      </div>

      <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,padding:"16px 24px",width:"100%",maxWidth:440}}>
        <div className="progress-bar" style={{height:8}}>
          <div className="progress-fill" style={{width:`${((genStep+1)/GEN_STEPS.length)*100}%`,background:"linear-gradient(to right,var(--gold),#7c4f1e)"}} />
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:10,fontFamily:"var(--fm)",color:"var(--muted)"}}>
          <span>Building your marketing engine...</span>
          <span>{Math.round(((genStep+1)/GEN_STEPS.length)*100)}%</span>
        </div>
      </div>

      <div style={{fontSize:12,color:"var(--muted)",fontStyle:"italic",maxWidth:380}}>
        Your 5 AI agents are working together to build emails, social posts, SMS campaigns, sales copy, and a 30-day content calendar — all tailored to your idea.
      </div>
    </div>
  );

  // ── STEP: DASHBOARD ──
  if (step === "dashboard" && results) {
    const RESULT_TABS = [
      { id:"strategy", label:"⚜ Strategy", agent:"Aria" },
      { id:"emails", label:"✉ Email Sequence", agent:"Solomon" },
      { id:"social", label:"◎ Social Posts", agent:"Zoe" },
      { id:"sms", label:"◈ SMS Campaign", agent:"Grace" },
      { id:"funnel", label:"◻ Sales Funnel", agent:"Elias" },
      { id:"ads", label:"♦ Ad Copy", agent:"All" },
      { id:"calendar", label:"✦ Content Calendar", agent:"Solomon" },
    ];

    return (
      <div className="fade" style={{display:"flex",flexDirection:"column",gap:22}}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontFamily:"var(--fd)",fontSize:22,color:"var(--gold)",letterSpacing:"0.06em"}}>Your Marketing Team Is Ready</div>
            <div style={{color:"var(--muted)",fontSize:13,marginTop:5,fontStyle:"italic"}}>
              {businessName || "Your Kingdom Venture"} · {ministry?.title || "Kingdom"} Ministry · {FIVEFOLD.length} AI Agents Active
            </div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button className="bo" onClick={() => { setStep("idea"); setResults(null); }}>← New Idea</button>
            <button className="bg" onClick={() => showToast("Full plan exported! 🎉")}>Export Full Plan</button>
          </div>
        </div>

        {/* Agent status bar */}
        <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:"16px 20px"}}>
          <div style={{fontFamily:"var(--fd)",fontSize:10,letterSpacing:"0.1em",color:"var(--muted)",marginBottom:12}}>YOUR ACTIVE AI MARKETING TEAM</div>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            {FIVEFOLD.map(f => (
              <div key={f.id} style={{display:"flex",alignItems:"center",gap:10,flex:"1 1 150px"}}>
                <div className="agent-ring" style={{width:36,height:36,borderRadius:"50%",background:f.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fd)",fontSize:12,color:"#0a0907",fontWeight:700,flexShrink:0}}>
                  {f.agentAvatar}
                </div>
                <div>
                  <div style={{fontFamily:"var(--fd)",fontSize:11,color:f.color,letterSpacing:"0.05em"}}>{f.aiAgent}</div>
                  <div style={{fontSize:10,color:"var(--muted)",fontFamily:"var(--fm)"}}>{f.agentRole}</div>
                </div>
                <div style={{marginLeft:"auto",width:8,height:8,borderRadius:"50%",background:"var(--green)"}} className="pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}} className="st">
          {[
            {label:"Email Sequences",v:results.emailSequence?.length||0,icon:"✉",c:"var(--gold)"},
            {label:"Social Posts Ready",v:results.socialPosts?.length||0,icon:"◎",c:"var(--orange)"},
            {label:"SMS Messages",v:results.smsSequence?.length||0,icon:"◈",c:"var(--teal)"},
            {label:"Weeks of Content",v:results.contentCalendar?.length||0,icon:"✦",c:"var(--purple)"},
          ].map(s=>(
            <div key={s.label} style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,padding:"18px 20px"}}>
              <div style={{fontSize:20,marginBottom:8,color:s.c}}>{s.icon}</div>
              <div style={{fontSize:28,fontFamily:"var(--fd)",color:s.c,fontWeight:700,lineHeight:1}}>{s.v}</div>
              <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--muted)",marginTop:6,letterSpacing:"0.06em",textTransform:"uppercase"}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Main tabs */}
        <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:18,overflow:"hidden"}}>
          {/* Tab bar */}
          <div style={{display:"flex",overflowX:"auto",borderBottom:"1px solid var(--border)",background:"var(--surface)"}}>
            {RESULT_TABS.map(t => (
              <button key={t.id} onClick={() => setActiveResultTab(t.id)}
                style={{padding:"13px 18px",fontSize:10,fontFamily:"var(--fd)",letterSpacing:"0.07em",background:activeResultTab===t.id?"var(--card)":"transparent",color:activeResultTab===t.id?"var(--gold)":"var(--muted)",borderBottom:activeResultTab===t.id?"2px solid var(--gold)":"2px solid transparent",borderRadius:0,whiteSpace:"nowrap",flexShrink:0}}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{padding:28,minHeight:340}}>

            {/* STRATEGY */}
            {activeResultTab==="strategy" && results.strategy && (
              <div style={{display:"flex",flexDirection:"column",gap:20}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
                  <div>
                    <div style={{fontFamily:"var(--fd)",fontSize:18,color:"var(--gold)",letterSpacing:"0.05em",marginBottom:8}}>{results.strategy.headline}</div>
                    <div style={{fontSize:15,color:"var(--text)",lineHeight:1.7,maxWidth:620}}>{results.strategy.summary}</div>
                  </div>
                  <CopyBtn text={results.strategy.headline+"\n\n"+results.strategy.summary} id="strategy-sum" />
                </div>
                {results.strategy.uniqueAngle && (
                  <div style={{background:"rgba(200,169,110,0.06)",border:"1px solid rgba(200,169,110,0.15)",borderRadius:12,padding:"14px 18px"}}>
                    <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--gold)",letterSpacing:"0.08em",marginBottom:6}}>YOUR KINGDOM UNIQUE ANGLE</div>
                    <div style={{fontSize:14,color:"var(--text)",fontStyle:"italic"}}>{results.strategy.uniqueAngle}</div>
                  </div>
                )}
                {results.strategy.phases?.length > 0 && (
                  <div>
                    <div style={{fontFamily:"var(--fd)",fontSize:12,letterSpacing:"0.08em",color:"var(--muted)",marginBottom:14}}>3-PHASE LAUNCH PLAN</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
                      {results.strategy.phases.map((p,i) => (
                        <div key={i} style={{background:"var(--card2)",border:"1px solid var(--border2)",borderRadius:14,padding:18}}>
                          <div style={{fontFamily:"var(--fd)",fontSize:10,color:"var(--gold)",letterSpacing:"0.08em",marginBottom:4}}>{p.phase} — {p.name}</div>
                          <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--muted)",marginBottom:10}}>{p.duration}</div>
                          <div style={{display:"flex",flexDirection:"column",gap:6}}>
                            {(p.actions||[]).map((a,j) => (
                              <div key={j} style={{display:"flex",gap:8,fontSize:12,color:"var(--text)"}}>
                                <span style={{color:"var(--gold)",flexShrink:0}}>→</span><span>{a}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* EMAIL SEQUENCE */}
            {activeResultTab==="emails" && (
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <div style={{fontSize:12,color:"var(--muted)",fontStyle:"italic",marginBottom:4}}>
                  {results.emailSequence?.length || 0} automated emails — send-ready, pre-written by Agent Solomon
                </div>
                {(results.emailSequence||[]).map((email,i) => (
                  <div key={i} style={{background:"var(--card2)",border:"1px solid var(--border2)",borderRadius:14,overflow:"hidden"}}>
                    <div style={{padding:"12px 18px",borderBottom:"1px solid var(--border2)",display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(200,169,110,0.04)"}}>
                      <div style={{display:"flex",gap:16,alignItems:"center"}}>
                        <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--gold)",background:"rgba(200,169,110,0.12)",padding:"3px 10px",borderRadius:99}}>{email.day}</span>
                        <div>
                          <div style={{fontWeight:600,fontSize:14}}>{email.subject}</div>
                          <div style={{fontSize:11,color:"var(--muted)",fontStyle:"italic",marginTop:1}}>{email.preview}</div>
                        </div>
                      </div>
                      <CopyBtn text={`Subject: ${email.subject}\nPreview: ${email.preview}\n\n${email.body}`} id={`email-${i}`} />
                    </div>
                    <div style={{padding:"16px 18px",fontSize:14,color:"var(--text)",lineHeight:1.75,whiteSpace:"pre-wrap",maxHeight:200,overflow:"hidden",position:"relative"}}>
                      {email.body}
                      <div style={{position:"absolute",bottom:0,left:0,right:0,height:48,background:"linear-gradient(to top,var(--card2),transparent)"}} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SOCIAL POSTS */}
            {activeResultTab==="social" && (
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                {(results.socialPosts||[]).map((post,i) => {
                  const platColors = {"Instagram":"#e1306c","Facebook":"#1877f2","LinkedIn":"#0077b5","Twitter/X":"#1da1f2","YouTube":"#ff0000"};
                  const c = platColors[post.platform] || "var(--gold)";
                  return (
                    <div key={i} style={{background:"var(--card2)",border:"1px solid var(--border2)",borderRadius:14,padding:18}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                        <div style={{display:"flex",gap:8,alignItems:"center"}}>
                          <span style={{fontSize:10,fontFamily:"var(--fm)",color:c,background:`${c}18`,padding:"3px 10px",borderRadius:99,border:`1px solid ${c}33`}}>{post.platform}</span>
                          <span style={{fontSize:10,color:"var(--muted)",fontFamily:"var(--fm)"}}>{post.type}</span>
                        </div>
                        <CopyBtn text={post.caption} id={`social-${i}`} />
                      </div>
                      {post.hook && <div style={{fontSize:13,color:"var(--gold-l)",fontWeight:600,marginBottom:8,lineHeight:1.4}}>{post.hook}</div>}
                      <div style={{fontSize:13,color:"var(--text)",lineHeight:1.6,display:"-webkit-box",WebkitLineClamp:4,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{post.caption}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SMS */}
            {activeResultTab==="sms" && (
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <div style={{fontSize:12,color:"var(--muted)",fontStyle:"italic",marginBottom:4}}>
                  {results.smsSequence?.length||0} automated SMS messages — under 160 chars each
                </div>
                {(results.smsSequence||[]).map((sms,i) => (
                  <div key={i} style={{background:"var(--card2)",border:"1px solid var(--border2)",borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",gap:14}}>
                    <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--teal)",background:"rgba(104,184,154,0.12)",padding:"4px 12px",borderRadius:99,flexShrink:0}}>{sms.day}</span>
                    <div style={{flex:1,fontSize:14,color:"var(--text)"}}>{sms.message}</div>
                    <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
                      <span style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--muted)"}}>{sms.message?.length||0} chars</span>
                      <CopyBtn text={sms.message} id={`sms-${i}`} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SALES FUNNEL */}
            {activeResultTab==="funnel" && results.salesFunnel && (
              <div style={{display:"flex",flexDirection:"column",gap:18}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontFamily:"var(--fd)",fontSize:20,color:"var(--gold)",letterSpacing:"0.05em",marginBottom:4}}>{results.salesFunnel.headline}</div>
                    <div style={{fontSize:15,color:"var(--muted)",fontStyle:"italic"}}>{results.salesFunnel.subheadline}</div>
                  </div>
                  <CopyBtn text={JSON.stringify(results.salesFunnel,null,2)} id="funnel-all" />
                </div>
                {results.salesFunnel.hook && (
                  <div style={{background:"rgba(200,169,110,0.06)",border:"1px solid rgba(200,169,110,0.15)",borderRadius:12,padding:16}}>
                    <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--gold)",letterSpacing:"0.08em",marginBottom:6}}>OPENING HOOK</div>
                    <div style={{fontSize:15,color:"var(--text)",lineHeight:1.7,fontStyle:"italic"}}>{results.salesFunnel.hook}</div>
                  </div>
                )}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  {results.salesFunnel.painPoints?.length > 0 && (
                    <div style={{background:"var(--card2)",border:"1px solid var(--border2)",borderRadius:12,padding:16}}>
                      <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--muted)",letterSpacing:"0.08em",marginBottom:10}}>PAIN POINTS WE ADDRESS</div>
                      {results.salesFunnel.painPoints.map((p,i)=>(
                        <div key={i} style={{display:"flex",gap:8,fontSize:13,color:"var(--text)",marginBottom:8}}>
                          <span style={{color:"var(--red)",flexShrink:0}}>✕</span><span>{p}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {results.salesFunnel.objections?.length > 0 && (
                    <div style={{background:"var(--card2)",border:"1px solid var(--border2)",borderRadius:12,padding:16}}>
                      <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--muted)",letterSpacing:"0.08em",marginBottom:10}}>OBJECTION HANDLERS</div>
                      {results.salesFunnel.objections.map((o,i)=>(
                        <div key={i} style={{marginBottom:10}}>
                          <div style={{fontSize:12,color:"var(--orange)",marginBottom:2}}>"{o.objection}"</div>
                          <div style={{fontSize:12,color:"var(--text)"}}>{o.answer}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {results.salesFunnel.cta && (
                  <div style={{display:"flex",gap:14,alignItems:"center",padding:"16px 20px",background:"rgba(200,169,110,0.06)",borderRadius:12,border:"1px solid rgba(200,169,110,0.15)"}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--gold)",marginBottom:4,letterSpacing:"0.08em"}}>CTA BUTTON</div>
                      <div style={{fontSize:15,fontWeight:700,color:"var(--text)"}}>{results.salesFunnel.cta}</div>
                    </div>
                    {results.salesFunnel.urgency && (
                      <div style={{flex:1}}>
                        <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--orange)",marginBottom:4,letterSpacing:"0.08em"}}>URGENCY ELEMENT</div>
                        <div style={{fontSize:13,color:"var(--text)"}}>{results.salesFunnel.urgency}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* AD COPY */}
            {activeResultTab==="ads" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{fontSize:12,color:"var(--muted)",fontStyle:"italic",marginBottom:4}}>
                  {results.adCopy?.length||0} ad variations — ready to paste into your ad manager
                </div>
                {(results.adCopy||[]).map((ad,i) => (
                  <div key={i} style={{background:"var(--card2)",border:"1px solid var(--border2)",borderRadius:14,padding:20}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                      <span style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--purple)",background:"rgba(155,127,212,0.12)",padding:"4px 12px",borderRadius:99}}>{ad.platform}</span>
                      <CopyBtn text={`${ad.headline}\n\n${ad.body}\n\nCTA: ${ad.cta}`} id={`ad-${i}`} />
                    </div>
                    <div style={{fontFamily:"var(--fd)",fontSize:16,color:"var(--gold)",marginBottom:8,letterSpacing:"0.03em"}}>{ad.headline}</div>
                    <div style={{fontSize:14,color:"var(--text)",lineHeight:1.65,marginBottom:10}}>{ad.body}</div>
                    <div style={{display:"inline-block",padding:"6px 16px",background:"rgba(200,169,110,0.12)",border:"1px solid rgba(200,169,110,0.2)",borderRadius:8,fontSize:11,fontFamily:"var(--fd)",color:"var(--gold)",letterSpacing:"0.06em"}}>{ad.cta}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CONTENT CALENDAR */}
            {activeResultTab==="calendar" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{fontSize:12,color:"var(--muted)",fontStyle:"italic",marginBottom:4}}>
                  30-day content plan — 3 posts per week, fully themed
                </div>
                {(results.contentCalendar||[]).map((week,i) => (
                  <div key={i} style={{background:"var(--card2)",border:"1px solid var(--border2)",borderRadius:14,padding:18}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                      <div style={{display:"flex",gap:10,alignItems:"center"}}>
                        <span style={{fontFamily:"var(--fd)",fontSize:11,color:"var(--gold)",letterSpacing:"0.06em"}}>{week.week}</span>
                        <span style={{fontSize:12,color:"var(--muted)",fontStyle:"italic"}}>Theme: {week.theme}</span>
                      </div>
                      <CopyBtn text={week.posts?.join("\n")||""} id={`cal-${i}`} />
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:8}}>
                      {(week.posts||[]).map((post,j) => (
                        <div key={j} style={{display:"flex",gap:10,fontSize:13,color:"var(--text)",padding:"8px 12px",background:"rgba(200,169,110,0.03)",borderRadius:8}}>
                          <span style={{color:"var(--gold)",flexShrink:0,fontFamily:"var(--fm)",fontSize:10,paddingTop:2}}>{["MON","WED","FRI"][j]||`D${j+1}`}</span>
                          <span>{post}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* Export / Action row */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
          {[
            {icon:"✦",label:"Save to Campaigns",action:()=>showToast("Saved to Campaigns!")},
            {icon:"◎",label:"Schedule All Posts",action:()=>showToast("Posts scheduled!")},
            {icon:"⟳",label:"Add to Automation",action:()=>showToast("Added to automation!")},
            {icon:"◈",label:"Start SMS Flow",action:()=>showToast("SMS flow activated!")},
          ].map(a=>(
            <button key={a.label} onClick={a.action} className="bo" style={{padding:"14px",display:"flex",flexDirection:"column",alignItems:"center",gap:8,borderRadius:14}}>
              <span style={{fontSize:18,color:"var(--gold)"}}>{a.icon}</span>
              <span style={{fontSize:10,letterSpacing:"0.06em",textAlign:"center",lineHeight:1.3}}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

// ─── FIVEFOLD HUB PAGE ────────────────────────────────────────────────────────
function FivefoldHub({showToast, setPage}) {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const ministry = FIVEFOLD.find(f => f.id === selected);

  if (!selected) return (
    <div className="fade" style={{display:"flex",flexDirection:"column",gap:26}}>
      <div>
        <div style={{fontFamily:"var(--fd)",fontSize:22,color:"var(--gold)",letterSpacing:"0.06em"}}>Fivefold Hub</div>
        <div style={{color:"var(--muted)",fontSize:13,marginTop:5,fontStyle:"italic"}}>Ephesians 4:11 — Five Offices. One Platform. Kingdom Impact.</div>
      </div>

      {/* Scripture banner */}
      <div style={{background:"linear-gradient(135deg,rgba(200,169,110,0.08),rgba(124,79,30,0.06))",border:"1px solid rgba(200,169,110,0.18)",borderRadius:16,padding:"20px 24px",textAlign:"center"}}>
        <div style={{fontFamily:"var(--fd)",fontSize:13,color:"var(--gold)",letterSpacing:"0.1em",marginBottom:6}}>"He gave some to be apostles, some prophets, some evangelists, some pastors and teachers..."</div>
        <div style={{fontSize:12,color:"var(--muted)",fontFamily:"var(--fm)"}}>Ephesians 4:11 — for the equipping of the saints for the work of ministry</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}} className="st">
        {FIVEFOLD.map(f => (
          <div key={f.id} className="ministry-card glow" onClick={() => setSelected(f.id)}
            style={{background:`linear-gradient(135deg,${f.color}0c,${f.color}05)`,border:`1px solid ${f.color}28`}}>
            <div style={{position:"absolute",top:0,right:0,width:80,height:80,background:`radial-gradient(circle at 100% 0%,${f.color}12,transparent 70%)`}} />
            <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:14}}>
              <div style={{width:48,height:48,borderRadius:14,background:f.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:"#0a0907",flexShrink:0}}>{f.icon}</div>
              <div>
                <div style={{fontFamily:"var(--fd)",fontSize:16,color:f.color,letterSpacing:"0.06em"}}>{f.title}</div>
                <div style={{fontSize:12,color:"var(--muted)",marginTop:2,fontStyle:"italic"}}>{f.role}</div>
              </div>
            </div>
            <div style={{fontSize:13,color:"var(--text)",lineHeight:1.6,marginBottom:12}}>{f.mandate}</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {f.businesses.slice(0,3).map(b=>(
                <span key={b} className="tag" style={{background:`${f.color}12`,color:f.color,fontSize:10}}>{b}</span>
              ))}
            </div>
            <div style={{marginTop:14,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:f.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fd)",fontSize:9,color:"#0a0907"}}>{f.agentAvatar}</div>
                <span style={{fontSize:11,color:"var(--muted)",fontFamily:"var(--fm)"}}>{f.aiAgent} · AI Agent</span>
              </div>
              <span style={{fontSize:10,color:f.color,fontFamily:"var(--fm)"}}>→ Explore</span>
            </div>
          </div>
        ))}

        {/* Placeholder 5th */}
        <div style={{background:"rgba(200,169,110,0.03)",border:"1px dashed rgba(200,169,110,0.15)",borderRadius:18,padding:22,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,cursor:"pointer",minHeight:180}} onClick={()=>showToast("Full 5-fold training coming soon!")}>
          <div style={{fontSize:28,color:"var(--gold-d)"}}>⊕</div>
          <div style={{fontFamily:"var(--fd)",fontSize:12,color:"var(--muted)",letterSpacing:"0.06em",textAlign:"center"}}>JOIN THE FIVEFOLD NETWORK</div>
          <div style={{fontSize:12,color:"var(--muted)",fontStyle:"italic",textAlign:"center"}}>Connect with apostles, prophets, evangelists, pastors & teachers worldwide</div>
        </div>
      </div>
    </div>
  );

  // Ministry detail view
  return (
    <div className="fade" style={{display:"flex",flexDirection:"column",gap:22}}>
      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <button className="bo" style={{padding:"6px 14px",fontSize:10}} onClick={()=>setSelected(null)}>← Back</button>
        <div style={{width:44,height:44,borderRadius:12,background:ministry.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:"#0a0907"}}>{ministry.icon}</div>
        <div>
          <div style={{fontFamily:"var(--fd)",fontSize:20,color:ministry.color,letterSpacing:"0.06em"}}>{ministry.title}</div>
          <div style={{fontSize:12,color:"var(--muted)",fontStyle:"italic"}}>{ministry.role}</div>
        </div>
        <button className="bg" style={{marginLeft:"auto"}} onClick={()=>setPage("team")}>✦ Launch AI Team for {ministry.title}</button>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:6}}>
        {["overview","businesses","campaigns","ai-agent"].map(t=>(
          <button key={t} onClick={()=>setActiveTab(t)} style={{padding:"8px 16px",borderRadius:8,fontSize:10,fontFamily:"var(--fm)",border:`1px solid ${activeTab===t?ministry.color:"var(--border)"}`,background:activeTab===t?`${ministry.color}14`:"transparent",color:activeTab===t?ministry.color:"var(--muted)",cursor:"pointer",letterSpacing:"0.06em",textTransform:"uppercase"}}>
            {t.replace("-"," ")}
          </button>
        ))}
      </div>

      {activeTab==="overview" && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div style={{background:"var(--card)",border:`1px solid ${ministry.color}20`,borderRadius:16,padding:22}}>
            <div style={{fontFamily:"var(--fd)",fontSize:11,letterSpacing:"0.08em",color:ministry.color,marginBottom:10}}>MANDATE</div>
            <div style={{fontSize:14,color:"var(--text)",lineHeight:1.7}}>{ministry.mandate}</div>
          </div>
          <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:22}}>
            <div style={{fontFamily:"var(--fd)",fontSize:11,letterSpacing:"0.08em",color:"var(--muted)",marginBottom:10}}>MARKETING FOCUS</div>
            <div style={{fontSize:14,color:"var(--text)",lineHeight:1.7}}>{ministry.marketingFocus}</div>
          </div>
          <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:22,gridColumn:"1/-1"}}>
            <div style={{fontFamily:"var(--fd)",fontSize:11,letterSpacing:"0.08em",color:"var(--muted)",marginBottom:12}}>CAMPAIGN TYPES FOR THIS OFFICE</div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {ministry.campaigns.map(c=>(
                <span key={c} className="tag" style={{background:`${ministry.color}10`,color:ministry.color,border:`1px solid ${ministry.color}22`,fontSize:12,padding:"5px 14px"}}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      )}
      {activeTab==="businesses" && (
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
          {ministry.businesses.map(b=>(
            <div key={b} style={{background:"var(--card)",border:`1px solid ${ministry.color}18`,borderRadius:14,padding:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontFamily:"var(--fd)",fontSize:13,color:ministry.color,letterSpacing:"0.04em",marginBottom:4}}>{b}</div>
                <div style={{fontSize:12,color:"var(--muted)",fontStyle:"italic"}}>Kingdom Business · {ministry.title} Aligned</div>
              </div>
              <button className="bo" style={{padding:"5px 12px",fontSize:10}} onClick={()=>showToast(`Opening ${b}...`)}>Launch →</button>
            </div>
          ))}
        </div>
      )}
      {activeTab==="campaigns" && (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {ministry.campaigns.map(c=>(
            <div key={c} style={{background:"var(--card)",border:"1px solid var(--border2)",borderRadius:12,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:14,color:"var(--text)"}}>{c}</span>
              <div style={{display:"flex",gap:8}}>
                <button className="bo" style={{padding:"5px 12px",fontSize:10}} onClick={()=>showToast(`${c} template loaded!`)}>Use Template</button>
                <button className="bg" style={{padding:"5px 12px",fontSize:10}} onClick={()=>showToast(`${c} campaign created!`)}>Create</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab==="ai-agent" && (
        <div style={{background:"var(--card)",border:`1px solid ${ministry.color}25`,borderRadius:16,padding:28,display:"flex",gap:20}}>
          <div className="agent-ring" style={{width:72,height:72,borderRadius:"50%",background:ministry.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fd)",fontSize:24,color:"#0a0907",flexShrink:0}}>{ministry.agentAvatar}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"var(--fd)",fontSize:20,color:ministry.color,letterSpacing:"0.05em",marginBottom:4}}>{ministry.aiAgent}</div>
            <div style={{fontSize:13,color:"var(--muted)",marginBottom:12}}>{ministry.agentRole} · Powered by Claude AI</div>
            <div style={{fontSize:14,color:"var(--text)",lineHeight:1.7,marginBottom:16}}>
              {ministry.aiAgent} is your dedicated AI marketing agent for the {ministry.title}'s office. Specializing in <strong style={{color:ministry.color}}>{ministry.marketingFocus}</strong>, {ministry.aiAgent} writes campaigns that carry the authentic voice, authority, and anointing of the {ministry.title}.
            </div>
            <button className="bg" onClick={()=>setPage("team")}>Activate {ministry.aiAgent} →</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── KINGDOM MARKETPLACE ─────────────────────────────────────────────────────
function Marketplace({showToast}) {
  const [filterCat, setFilterCat] = useState("All");
  const businesses = [
    {id:1,name:"KingdomShift Entrepreneurs Hub",cat:"finance",ministry:"apostle",owner:"Marcus Thompson",price:"$297/mo",rating:4.9,members:1240,desc:"Business coaching & accountability for kingdom entrepreneurs"},
    {id:2,name:"Prophetic School Online",cat:"education",ministry:"prophet",owner:"Sarah Kimani",price:"$97/mo",rating:4.8,members:580,desc:"Activate and develop your prophetic gift with structured training"},
    {id:3,name:"Gospel Media Studio",cat:"media",ministry:"evangelist",owner:"David Park",price:"$147/mo",rating:4.7,members:340,desc:"Professional media production for evangelism campaigns"},
    {id:4,name:"Healing Rooms Network",cat:"health",ministry:"pastor",owner:"Amara Diallo",price:"Free",rating:5.0,members:2100,desc:"Connecting prayer ministers for healing ministry worldwide"},
    {id:5,name:"Kingdom Bible Institute",cat:"education",ministry:"teacher",owner:"Priya Nair",price:"$197/mo",rating:4.9,members:890,desc:"Systematic theology and word-based discipleship courses"},
    {id:6,name:"Kingdom Real Estate Circle",cat:"realestate",ministry:"apostle",owner:"James Okafor",price:"$397/mo",rating:4.6,members:420,desc:"Acquire kingdom properties and build generational wealth"},
    {id:7,name:"Faith & Wellness Co.",cat:"health",ministry:"pastor",owner:"Grace Osei",price:"$67/mo",rating:4.8,members:1560,desc:"Holistic health coaching integrating faith and wellness"},
    {id:8,name:"Kingdom Tech Collective",cat:"tech",ministry:"teacher",owner:"Nathan Cruz",price:"$197/mo",rating:4.7,members:730,desc:"Tech entrepreneurs building kingdom-focused software solutions"},
  ];

  const filtered = filterCat==="All" ? businesses : businesses.filter(b=>b.cat===filterCat);

  return (
    <div className="fade" style={{display:"flex",flexDirection:"column",gap:22}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontFamily:"var(--fd)",fontSize:22,color:"var(--gold)",letterSpacing:"0.06em"}}>KingdomShift Market</div>
          <div style={{color:"var(--muted)",fontSize:13,marginTop:5,fontStyle:"italic"}}>Buy, sell, and grow kingdom ventures — built to shift culture & commerce — by the kingdom</div>
        </div>
        <button className="bg" onClick={()=>showToast("List Your Business — coming soon!")}>+ List Your Business</button>
      </div>

      {/* Category filter */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {["All",...BUSINESS_CATEGORIES.map(b=>b.label)].map(c=>(
          <button key={c} onClick={()=>setFilterCat(c)} style={{padding:"7px 14px",borderRadius:8,fontSize:10,fontFamily:"var(--fm)",border:`1px solid ${filterCat===c?"var(--gold-d)":"var(--border)"}`,background:filterCat===c?"rgba(200,169,110,0.08)":"transparent",color:filterCat===c?"var(--gold)":"var(--muted)",cursor:"pointer",letterSpacing:"0.06em",textTransform:"uppercase"}}>
            {c}
          </button>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}} className="st">
        {filtered.map(b=>{
          const min = FIVEFOLD.find(f=>f.id===b.ministry);
          const cat = BUSINESS_CATEGORIES.find(c=>c.id===b.cat);
          return (
            <div key={b.id} style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:22,transition:"all .2s",cursor:"pointer"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(200,169,110,0.25)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div>
                  <div style={{fontFamily:"var(--fd)",fontSize:14,color:"var(--text)",letterSpacing:"0.04em",marginBottom:4}}>{b.name}</div>
                  <div style={{display:"flex",gap:6}}>
                    {min && <span className="tag" style={{background:`${min.color}12`,color:min.color,fontSize:10}}>{min.icon} {min.title}</span>}
                    {cat && <span className="tag" style={{background:"rgba(139,115,85,0.12)",color:"var(--muted)",fontSize:10}}>{cat.icon} {cat.label}</span>}
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:"var(--fd)",fontSize:15,color:"var(--gold)"}}>{b.price}</div>
                  <div style={{fontSize:10,color:"var(--muted)",fontFamily:"var(--fm)",marginTop:2}}>⭐ {b.rating}</div>
                </div>
              </div>
              <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.6,marginBottom:14}}>{b.desc}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--muted)"}}>
                  <span style={{color:"var(--green)"}}>●</span> {b.members.toLocaleString()} members · {b.owner}
                </div>
                <button className="bg" style={{padding:"6px 16px",fontSize:10}} onClick={()=>showToast(`Joining ${b.name}...`)}>Join →</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({setPage, showToast}) {
  const [tasks, setTasks] = useState(AGENT_TASKS);
  return (
    <div className="fade" style={{display:"flex",flexDirection:"column",gap:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
        <div>
          <div style={{fontFamily:"var(--fd)",fontSize:24,color:"var(--gold)",letterSpacing:"0.06em",lineHeight:1}}>ShiftCommand</div>
          <div style={{color:"var(--muted)",fontSize:13,marginTop:6,fontStyle:"italic"}}>Saturday, May 23, 2026  ·  KingdomShift v1.0  ·  5 Agents Active</div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button className="bo" onClick={()=>setPage("fivefold")}>⬢ Fivefold Hub</button>
          <button className="bg" onClick={()=>setPage("team")}>✦ Launch AI Team</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}} className="st">
        {[
          {icon:"⚜",label:"Fivefold Offices Active",v:"5/5",c:"var(--gold)"},
          {icon:"◎",label:"AI Agents Working",v:"3",c:"var(--green)"},
          {icon:"✉",label:"Campaigns Running",v:"4",c:"var(--blue)"},
          {icon:"♦",label:"Kingdom Businesses",v:"8",c:"var(--purple)"},
        ].map(s=>(
          <div key={s.label} style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:"20px 22px",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-20,right:-20,width:80,height:80,background:`radial-gradient(circle,${s.c}10,transparent 70%)`}} />
            <div style={{fontSize:22,marginBottom:10,color:s.c}}>{s.icon}</div>
            <div style={{fontSize:26,fontFamily:"var(--fd)",color:s.c,fontWeight:700,lineHeight:1}}>{s.v}</div>
            <div style={{fontSize:11,color:"var(--muted)",marginTop:6,fontFamily:"var(--fm)",letterSpacing:"0.06em",textTransform:"uppercase"}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Fivefold ministry overview */}
      <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:22}}>
        <div style={{fontFamily:"var(--fd)",fontSize:12,letterSpacing:"0.1em",color:"var(--muted)",marginBottom:16}}>FIVEFOLD MINISTRY MARKETING OFFICES</div>
        <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:4}}>
          {FIVEFOLD.map(f=>(
            <div key={f.id} onClick={()=>setPage("fivefold")} style={{flex:"0 0 auto",background:`linear-gradient(135deg,${f.color}12,${f.color}06)`,border:`1px solid ${f.color}22`,borderRadius:14,padding:"16px 18px",cursor:"pointer",minWidth:160,transition:"all .2s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=f.color+"55"}
              onMouseLeave={e=>e.currentTarget.style.borderColor=f.color+"22"}>
              <div style={{fontSize:24,marginBottom:8,color:f.color}}>{f.icon}</div>
              <div style={{fontFamily:"var(--fd)",fontSize:11,color:f.color,letterSpacing:"0.07em",marginBottom:2}}>{f.title}</div>
              <div style={{fontSize:10,color:"var(--muted)",fontStyle:"italic"}}>{f.aiAgent} · AI Agent</div>
              <div style={{display:"flex",alignItems:"center",gap:4,marginTop:8}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:"var(--green)"}} className="pulse" />
                <span style={{fontSize:9,fontFamily:"var(--fm)",color:"var(--green)"}}>ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent task feed + AI promo */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:22}}>
          <div style={{fontFamily:"var(--fd)",fontSize:12,letterSpacing:"0.1em",color:"var(--muted)",marginBottom:14}}>LIVE AGENT ACTIVITY</div>
          {tasks.map(t=>{
            const min = FIVEFOLD.find(f=>f.id===t.ministry);
            return (
              <div key={t.id} style={{padding:"10px 0",borderBottom:"1px solid var(--border2)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <div style={{width:24,height:24,borderRadius:"50%",background:min?.gradient||"var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontFamily:"var(--fd)",color:"#0a0907"}}>{min?.agentAvatar||"?"}</div>
                    <span style={{fontSize:11,color:min?.color||"var(--gold)",fontFamily:"var(--fm)"}}>{t.agent}</span>
                  </div>
                  <Badge status={t.status} />
                </div>
                <div style={{fontSize:12,color:"var(--text)",marginBottom:5}}>{t.task}</div>
                {t.status!=="queued" && <Progress value={t.progress} color={min?.color||"var(--gold)"} />}
              </div>
            );
          })}
        </div>

        {/* Activate team CTA */}
        <div style={{background:"linear-gradient(135deg,rgba(200,169,110,0.09),rgba(124,79,30,0.12))",border:"1px solid rgba(200,169,110,0.22)",borderRadius:16,padding:26,display:"flex",flexDirection:"column",justifyContent:"space-between"}} className="glow">
          <div>
            <div style={{display:"flex",gap:10,marginBottom:16}}>
              {FIVEFOLD.map(f=>(
                <div key={f.id} style={{width:32,height:32,borderRadius:"50%",background:f.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#0a0907",fontFamily:"var(--fd)"}}>{f.agentAvatar}</div>
              ))}
            </div>
            <div style={{fontFamily:"var(--fd)",fontSize:18,color:"var(--gold)",letterSpacing:"0.05em",marginBottom:10,lineHeight:1.2}}>YOUR PERSONAL AI MARKETING TEAM</div>
            <div style={{color:"var(--muted)",fontSize:13,lineHeight:1.7}}>Plug in any idea — ministry, business, course, event. Your 5 AI agents will build your complete marketing engine: emails, social posts, SMS, ad copy, sales funnel, and a 30-day content calendar. Automatically.</div>
          </div>
          <button className="bg" style={{marginTop:20,padding:"14px",fontSize:12,letterSpacing:"0.1em"}} onClick={()=>setPage("team")}>✦ ACTIVATE NOW</button>
        </div>
      </div>
    </div>
  );
}

// ─── PAYMENTS ─────────────────────────────────────────────────────────────────
const PLANS=[
  {id:"seed",name:"Seed",price:0,color:"#8b7355",features:["1 campaign/month","100 contacts","AI Writer 3x/mo","Marketplace listing","Community read-only"],cta:"Get Started Free"},
  {id:"kingdom",name:"Kingdom",price:47,color:"#c8a96e",popular:true,features:["Unlimited campaigns","5,000 contacts","Full AI Marketing Team","5 courses","Landing pages","Community & DMs","Email & SMS","Stripe payments","Analytics"],cta:"Start Kingdom Plan"},
  {id:"apostolic",name:"Apostolic",price:147,color:"#9b7fd4",features:["Everything in Kingdom","Unlimited contacts & courses","White-label","Affiliate program","Custom domain","Dedicated AI agent","API access","1-on-1 onboarding"],cta:"Go Apostolic"},
];
const TXN=[
  {id:1,member:"Marcus Thompson",product:"Apostolic Business Mastery",amount:297,type:"course",date:"May 23",status:"paid"},
  {id:2,member:"Priya Nair",product:"Kingdom Plan",amount:47,type:"subscription",date:"May 23",status:"paid"},
  {id:3,member:"James Okafor",product:"Prophetic School",amount:97,type:"course",date:"May 22",status:"paid"},
  {id:4,member:"Sarah Kimani",product:"Apostolic Plan",amount:147,type:"subscription",date:"May 22",status:"paid"},
  {id:5,member:"David Park",product:"Kingdom Finances",amount:97,type:"course",date:"May 21",status:"paid"},
  {id:6,member:"Amara Diallo",product:"Kingdom Plan",amount:47,type:"subscription",date:"May 20",status:"refunded"},
];
const fmtM=n=>"$"+(n>=1000?(n/1000).toFixed(1)+"k":n.toLocaleString());
const Bdg=({s})=>{const m={active:{bg:"rgba(72,187,120,.11)",c:"#48bb78",l:"Active"},paid:{bg:"rgba(72,187,120,.11)",c:"#48bb78",l:"Paid"},published:{bg:"rgba(72,187,120,.11)",c:"#48bb78",l:"Published"},paused:{bg:"rgba(237,137,54,.11)",c:"#ed8936",l:"Paused"},draft:{bg:"rgba(160,174,192,.09)",c:"#a0aec0",l:"Draft"},refunded:{bg:"rgba(224,82,82,.11)",c:"#e05252",l:"Refunded"},completed:{bg:"rgba(200,169,110,.11)",c:"#c8a96e",l:"Done"}};const x=m[s]||m.draft;return <span className="tag" style={{background:x.bg,color:x.c}}>{x.l.toUpperCase()}</span>;};
const Sc=({icon,label,value,sub,color="var(--gold)",up=true})=>(<div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:"18px 20px",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:-20,right:-20,width:70,height:70,background:`radial-gradient(circle,${color}14,transparent 70%)`}} /><div style={{fontSize:18,marginBottom:8,color}}>{icon}</div><div style={{fontSize:22,fontFamily:"var(--font-d)",color,fontWeight:700,lineHeight:1}}>{value}</div><div style={{fontSize:10,color:"var(--muted)",marginTop:5,fontFamily:"var(--font-m)",letterSpacing:".06em",textTransform:"uppercase"}}>{label}</div>{sub&&<div style={{fontSize:10,color:up?"var(--green)":"var(--orange)",fontFamily:"var(--font-m)",marginTop:3}}>{up?"↑":"↓"} {sub}</div>}</div>);

function PaymentsPage({showToast}){
  const mrr=PLANS.slice(1).reduce((s,p)=>s+p.price*8,0);
  return(<div className="fade" style={{display:"flex",flexDirection:"column",gap:20}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontFamily:"var(--font-d)",fontSize:20,color:"var(--gold)",letterSpacing:".06em"}}>Payments & Revenue</div><div style={{color:"var(--muted)",fontSize:13,marginTop:4,fontStyle:"italic"}}>Stripe-powered · Kingdom commerce</div></div>
      <button className="btn-gold" style={{fontSize:10}} onClick={()=>showToast("Stripe Connect link sent!")}>Connect Stripe →</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
      <Sc icon="💰" label="MRR" value={fmtM(mrr)} sub="12% this month" color="var(--gold)" />
      <Sc icon="📈" label="Total Revenue" value={fmtM(mrr*14)} sub="all time" color="var(--green)" />
      <Sc icon="👥" label="Subscribers" value="6" sub="2 new" color="var(--blue)" />
      <Sc icon="⚡" label="Avg Order" value="$122" sub="up $14" color="var(--purple)" />
    </div>
    <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:22}}>
      <div style={{fontFamily:"var(--font-d)",fontSize:12,letterSpacing:".09em",marginBottom:18}}>PRICING PLANS</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        {PLANS.map(p=><div key={p.id} style={{background:"var(--card2,#1c1914)",border:`1px solid ${p.popular?"rgba(200,169,110,.4)":"var(--border)"}`,borderRadius:14,padding:20,position:"relative",boxShadow:p.popular?"0 0 28px rgba(200,169,110,.07)":"none"}}>
          {p.popular&&<div style={{position:"absolute",top:-9,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(90deg,#c8a96e,#9a7235)",color:"#09080a",fontSize:8,fontFamily:"var(--font-d)",letterSpacing:".1em",padding:"2px 9px",borderRadius:99,whiteSpace:"nowrap"}}>MOST POPULAR</div>}
          <div style={{fontFamily:"var(--font-d)",fontSize:11,color:p.color,letterSpacing:".07em",marginBottom:3}}>{p.name.toUpperCase()}</div>
          <div style={{display:"flex",alignItems:"baseline",gap:3,marginBottom:12}}><span style={{fontFamily:"var(--font-d)",fontSize:24,color:"var(--text)",fontWeight:700}}>{p.price===0?"Free":"$"+p.price}</span>{p.price>0&&<span style={{fontSize:11,color:"var(--muted)"}}>/mo</span>}</div>
          <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>{p.features.map(f=><div key={f} style={{display:"flex",gap:6,fontSize:12}}><span style={{color:p.color,flexShrink:0}}>✓</span><span>{f}</span></div>)}</div>
          <button className={p.popular?"btn-gold":"btn-outline"} style={{width:"100%",padding:"9px",fontSize:10}} onClick={()=>showToast(`${p.name} activated!`)}>{p.cta}</button>
        </div>)}
      </div>
    </div>
    <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,overflow:"hidden"}}>
      <div style={{padding:"14px 18px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontFamily:"var(--font-d)",fontSize:11,letterSpacing:".09em"}}>RECENT TRANSACTIONS</div><button className="btn-outline" style={{padding:"4px 10px",fontSize:9}} onClick={()=>showToast("Exported!")}>Export CSV</button></div>
      <table><thead><tr><th>Member</th><th>Product</th><th>Amount</th><th>Type</th><th>Date</th><th>Status</th></tr></thead><tbody>{TXN.map(t=><tr key={t.id}><td style={{fontWeight:500}}>{t.member}</td><td style={{color:"var(--muted)",maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.product}</td><td style={{fontFamily:"var(--font-m)",color:"var(--green)",fontWeight:600}}>${t.amount}</td><td><span className="tag" style={{background:t.type==="subscription"?"rgba(155,127,212,.1)":"rgba(200,169,110,.1)",color:t.type==="subscription"?"var(--purple)":"var(--gold)"}}>{t.type}</span></td><td style={{fontFamily:"var(--font-m)",fontSize:11,color:"var(--muted)"}}>{t.date}</td><td><Bdg s={t.status} /></td></tr>)}</tbody></table>
    </div>
    <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:20,display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
      <div style={{flex:1,minWidth:200}}><div style={{fontFamily:"var(--font-d)",fontSize:13,color:"var(--gold)",letterSpacing:".06em",marginBottom:5}}>AFFILIATE PROGRAM</div><div style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>Members earn 30% recurring commission per referral. KingdomShift handles all tracking and payouts automatically.</div></div>
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>{[["30%","Commission"],["14","Affiliates"],["$1,240","Paid/Mo"]].map(([v,l])=><div key={l} style={{textAlign:"center"}}><div style={{fontFamily:"var(--font-d)",fontSize:18,color:"var(--gold)",fontWeight:700}}>{v}</div><div style={{fontSize:9,fontFamily:"var(--font-m)",color:"var(--muted)",marginTop:2,letterSpacing:".06em"}}>{l}</div></div>)}</div>
      <button className="btn-gold" style={{fontSize:10}} onClick={()=>showToast("Affiliate program live!")}>Activate →</button>
    </div>
  </div>);
}

// ─── COMMUNITY ────────────────────────────────────────────────────────────────
const FEED_POSTS=[
  {id:1,author:"Marcus Thompson",av:"MT",ministry:"apostle",color:"#c8a96e",time:"2h ago",tag:"Testimony",content:"Just enrolled 12 clients in 48 hours using the KingdomShift AI team. This platform is a GAME CHANGER. 🔥",likes:47,comments:18},
  {id:2,author:"Sarah Kimani",av:"SK",ministry:"pastor",color:"#68b89a",time:"5h ago",tag:"Prophetic Word",content:"The Lord says this is your season of overflow. Don't shrink back from the marketplace. Go boldly. 🙌",likes:89,comments:32},
  {id:3,author:"Priya Nair",av:"PN",ministry:"teacher",color:"#7c9cbf",time:"1d ago",tag:"Course Launch",content:"Published my 7th course — 'Kingdom Finances'. First 24h: 34 enrollments at $97. God is faithful! 🎓",likes:63,comments:27},
];
const MEMBERS_LIST=[
  {id:1,name:"Marcus Thompson",av:"MT",ministry:"apostle",posts:24,courses:3,revenue:"$4,280",plan:"apostolic"},
  {id:2,name:"Priya Nair",av:"PN",ministry:"teacher",posts:18,courses:7,revenue:"$2,940",plan:"kingdom"},
  {id:3,name:"James Okafor",av:"JO",ministry:"evangelist",posts:9,courses:1,revenue:"$780",plan:"kingdom"},
  {id:4,name:"Sarah Kimani",av:"SK",ministry:"pastor",posts:31,courses:4,revenue:"$3,150",plan:"apostolic"},
  {id:5,name:"David Park",av:"DP",ministry:"prophet",posts:12,courses:2,revenue:"$1,620",plan:"kingdom"},
  {id:6,name:"Amara Diallo",av:"AD",ministry:"teacher",posts:7,courses:5,revenue:"$2,100",plan:"kingdom"},
];

function CommunityPage({showToast}){
  const [posts,setPosts]=useState(FEED_POSTS);const [np,setNp]=useState("");const [tab,setTab]=useState("feed");const [liked,setLiked]=useState({});const [dm,setDm]=useState(null);const [dmMsg,setDmMsg]=useState("");
  const like=id=>{setLiked(p=>({...p,[id]:!p[id]}));setPosts(p=>p.map(x=>x.id===id?{...x,likes:x.likes+(liked[id]?-1:1)}:x));};
  return(<div className="fade" style={{display:"flex",flexDirection:"column",gap:18}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:9}}>
      <div><div style={{fontFamily:"var(--font-d)",fontSize:20,color:"var(--gold)",letterSpacing:".06em"}}>Kingdom Community</div><div style={{color:"var(--muted)",fontSize:12,marginTop:4,fontStyle:"italic"}}>{MEMBERS_LIST.length} members · All fivefold offices · Global network</div></div>
      <div style={{display:"flex",gap:6}}>{["feed","members","dms"].map(t=><button key={t} onClick={()=>setTab(t)} style={{padding:"5px 12px",borderRadius:8,fontSize:10,fontFamily:"var(--font-m)",border:`1px solid ${tab===t?"var(--gold-dim)":"var(--border)"}`,background:tab===t?"rgba(200,169,110,.07)":"transparent",color:tab===t?"var(--gold)":"var(--muted)",cursor:"pointer",textTransform:"uppercase",letterSpacing:".06em"}}>{t==="dms"?"💬 DMs":t==="members"?"👥 Members":"📣 Feed"}</button>)}</div>
    </div>
    {tab==="feed"&&<div style={{display:"grid",gridTemplateColumns:"1fr 260px",gap:14,alignItems:"start"}}>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,padding:14}}>
          <textarea style={{background:"rgba(200,169,110,.03)",border:"1px solid rgba(200,169,110,.08)",borderRadius:9,padding:11,color:"var(--text)",fontFamily:"var(--font-body)",fontSize:13,lineHeight:1.65,resize:"none",width:"100%",minHeight:65,outline:"none"}} placeholder="Share a testimony, prophetic word, win or insight..." value={np} onChange={e=>setNp(e.target.value)} />
          <div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}><button className="btn-gold" style={{padding:"6px 16px",fontSize:10}} onClick={()=>{if(!np.trim())return;setPosts(p=>[{id:Date.now(),author:"You",av:"YO",ministry:"apostle",color:"#c8a96e",time:"Just now",tag:"Post",content:np,likes:0,comments:0},...p]);setNp("");showToast("Posted! 🙌");}}>Post</button></div>
        </div>
        {posts.map(p=><div key={p.id} style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,padding:16}}>
          <div style={{display:"flex",gap:10,marginBottom:10}}>
            <div style={{width:34,height:34,borderRadius:"50%",background:`${p.color}28`,border:`1px solid ${p.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontFamily:"var(--font-m)",color:p.color,flexShrink:0,fontWeight:700}}>{p.av}</div>
            <div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><span style={{fontWeight:600,fontSize:13}}>{p.author}</span><span className="tag" style={{background:`${p.color}10`,color:p.color,marginLeft:6,fontSize:8}}>{p.tag}</span></div><span style={{fontSize:10,color:"var(--muted)",fontFamily:"var(--font-m)"}}>{p.time}</span></div><div style={{fontSize:9,color:"var(--muted)",fontFamily:"var(--font-m)",marginTop:1}}>{FIVEFOLD.find(f=>f.id===p.ministry)?.title||"Member"}</div></div>
          </div>
          <div style={{fontSize:13,lineHeight:1.75,marginBottom:11}}>{p.content}</div>
          <div style={{display:"flex",gap:12,borderTop:"1px solid rgba(200,169,110,.06)",paddingTop:9}}>
            <button onClick={()=>like(p.id)} style={{background:"transparent",border:"none",color:liked[p.id]?"var(--gold)":"var(--muted)",fontSize:12,fontFamily:"var(--font-m)",display:"flex",alignItems:"center",gap:4,cursor:"pointer"}}>{liked[p.id]?"♥":"♡"} {p.likes}</button>
            <button style={{background:"transparent",border:"none",color:"var(--muted)",fontSize:12,fontFamily:"var(--font-m)",cursor:"pointer"}} onClick={()=>showToast("Comments opening...")}>💬 {p.comments}</button>
            <button style={{background:"transparent",border:"none",color:"var(--muted)",fontSize:12,fontFamily:"var(--font-m)",cursor:"pointer"}} onClick={()=>showToast("Shared!")}>↗ Share</button>
          </div>
        </div>)}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,padding:14}}>
          <div style={{fontFamily:"var(--font-d)",fontSize:9,letterSpacing:".08em",color:"var(--muted)",marginBottom:9}}>ACTIVE MEMBERS</div>
          {MEMBERS_LIST.slice(0,5).map(m=>{const mf=FIVEFOLD.find(f=>f.id===m.ministry);return<div key={m.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:9}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:mf?.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontFamily:"var(--font-m)",color:"#09080a",fontWeight:700,flexShrink:0}}>{m.av}</div>
            <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.name}</div><div style={{fontSize:9,color:"var(--muted)",fontFamily:"var(--font-m)"}}>{mf?.title}</div></div>
            <button className="btn-outline" style={{padding:"2px 7px",fontSize:8}} onClick={()=>{setDm(m);setTab("dms");}}>DM</button>
          </div>;})}
        </div>
        <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,padding:14}}>
          <div style={{fontFamily:"var(--font-d)",fontSize:9,letterSpacing:".08em",color:"var(--muted)",marginBottom:9}}>FIVEFOLD BREAKDOWN</div>
          {FIVEFOLD.map(f=>{const c=MEMBERS_LIST.filter(m=>m.ministry===f.id).length;return<div key={f.id} style={{marginBottom:7}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:10,color:f.color}}>{f.icon} {f.title}</span><span style={{fontSize:9,fontFamily:"var(--font-m)",color:"var(--muted)"}}>{c}</span></div><div style={{height:4,background:"rgba(200,169,110,.09)",borderRadius:99,overflow:"hidden"}}><div style={{width:`${(c/MEMBERS_LIST.length)*100}%`,height:"100%",background:f.color,borderRadius:99}} /></div></div>;})}
        </div>
      </div>
    </div>}
    {tab==="members"&&<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>{MEMBERS_LIST.map(m=>{const mf=FIVEFOLD.find(f=>f.id===m.ministry);return<div key={m.id} style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,padding:16}}>
      <div style={{display:"flex",gap:10,marginBottom:11,alignItems:"center"}}>
        <div style={{width:40,height:40,borderRadius:"50%",background:mf?.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontFamily:"var(--font-m)",color:"#09080a",fontWeight:700,flexShrink:0}}>{m.av}</div>
        <div><div style={{fontWeight:600,fontSize:13}}>{m.name}</div><div style={{fontSize:10,color:"var(--muted)",fontFamily:"var(--font-m)"}}>{mf?.title}</div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:11}}>{[[m.posts,"Posts"],[m.courses,"Courses"],[m.revenue,"Revenue"]].map(([v,l])=><div key={l} style={{background:"rgba(200,169,110,.06)",borderRadius:7,padding:"6px 3px",textAlign:"center"}}><div style={{fontFamily:"var(--font-d)",fontSize:12,color:"var(--gold)"}}>{v}</div><div style={{fontSize:8,fontFamily:"var(--font-m)",color:"var(--muted)",marginTop:1}}>{l}</div></div>)}</div>
      <button className="btn-outline" style={{width:"100%",padding:"5px",fontSize:9}} onClick={()=>{setDm(m);setTab("dms");}}>💬 Send DM</button>
    </div>;})}
    </div>}
    {tab==="dms"&&<div style={{display:"grid",gridTemplateColumns:"220px 1fr",height:420,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,overflow:"hidden"}}>
      <div style={{borderRight:"1px solid var(--border)",padding:"10px 0",overflowY:"auto"}}>
        <div style={{padding:"0 11px 7px",fontFamily:"var(--font-d)",fontSize:8,letterSpacing:".08em",color:"var(--muted)"}}>DIRECT MESSAGES</div>
        {MEMBERS_LIST.map(m=>{const mf=FIVEFOLD.find(f=>f.id===m.ministry);return<div key={m.id} onClick={()=>setDm(m)} style={{display:"flex",gap:8,alignItems:"center",padding:"8px 11px",background:dm?.id===m.id?"rgba(200,169,110,.07)":"transparent",cursor:"pointer"}}>
          <div style={{width:26,height:26,borderRadius:"50%",background:mf?.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontFamily:"var(--font-m)",color:"#09080a",fontWeight:700,flexShrink:0}}>{m.av}</div>
          <div style={{flex:1,minWidth:0}}><div style={{fontSize:11,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.name}</div><div style={{fontSize:9,color:"var(--muted)",fontFamily:"var(--font-m)"}}>{mf?.title}</div></div>
          {m.id<=2&&<div style={{width:5,height:5,borderRadius:"50%",background:"var(--green)",flexShrink:0}} />}
        </div>;})}
      </div>
      {dm?<div style={{display:"flex",flexDirection:"column"}}>
        <div style={{padding:"11px 14px",borderBottom:"1px solid var(--border)",display:"flex",gap:8,alignItems:"center"}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:FIVEFOLD.find(f=>f.id===dm.ministry)?.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontFamily:"var(--font-m)",color:"#09080a",fontWeight:700}}>{dm.av}</div>
          <div><div style={{fontSize:12,fontWeight:600}}>{dm.name}</div><div style={{fontSize:9,color:"var(--green)",fontFamily:"var(--font-m)"}}>● Online</div></div>
        </div>
        <div style={{flex:1,padding:14,overflowY:"auto",display:"flex",flexDirection:"column",gap:8}}>
          <div style={{alignSelf:"flex-start",background:"rgba(200,169,110,.06)",border:"1px solid rgba(200,169,110,.1)",borderRadius:"9px 9px 9px 3px",padding:"8px 12px",maxWidth:"70%",fontSize:13,lineHeight:1.6}}>Hey! How can I connect with your coaching program?</div>
          <div style={{alignSelf:"flex-end",background:"linear-gradient(135deg,rgba(200,169,110,.18),rgba(124,79,30,.14))",border:"1px solid rgba(200,169,110,.15)",borderRadius:"9px 9px 3px 9px",padding:"8px 12px",maxWidth:"70%",fontSize:13,lineHeight:1.6}}>Check out Apostolic Business Mastery — it has everything you need. 🙌</div>
        </div>
        <div style={{padding:"9px 11px",borderTop:"1px solid var(--border)",display:"flex",gap:7}}>
          <input value={dmMsg} onChange={e=>setDmMsg(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&dmMsg.trim()){showToast("Sent!");setDmMsg("");}}} placeholder="Type a message..." style={{flex:1}} />
          <button className="btn-gold" style={{padding:"7px 13px",fontSize:10,flexShrink:0}} onClick={()=>{if(dmMsg.trim()){showToast("Sent!");setDmMsg("");}}}>Send</button>
        </div>
      </div>:<div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:7,color:"var(--muted)"}}><div style={{fontSize:24}}>💬</div><div style={{fontSize:13,fontStyle:"italic"}}>Select a member to message</div></div>}
    </div>}
  </div>);
}

// ─── COURSES ──────────────────────────────────────────────────────────────────
const COURSES_DATA2=[
  {id:1,title:"Apostolic Business Mastery",author:"Marcus Thompson",ministry:"apostle",price:297,students:340,lessons:24,rating:4.9,revenue:101580,status:"published",icon:"⚜",color:"#c8a96e"},
  {id:2,title:"Prophetic Activation School",author:"David Park",ministry:"prophet",price:97,students:580,lessons:18,rating:4.8,revenue:56260,status:"published",icon:"◈",color:"#9b7fd4"},
  {id:3,title:"Kingdom Finances: Biblical Wealth",author:"Priya Nair",ministry:"teacher",price:97,students:210,lessons:12,rating:4.9,revenue:20370,status:"published",icon:"✦",color:"#7c9cbf"},
  {id:4,title:"Pastoral Leadership Foundations",author:"Sarah Kimani",ministry:"pastor",price:147,students:180,lessons:20,rating:5.0,revenue:26460,status:"published",icon:"♥",color:"#68b89a"},
  {id:5,title:"Evangelism in the Digital Age",author:"James Okafor",ministry:"evangelist",price:47,students:890,lessons:10,rating:4.7,revenue:41830,status:"published",icon:"◎",color:"#e8834a"},
  {id:6,title:"Kingdom Real Estate Blueprint",author:"Marcus Thompson",ministry:"apostle",price:397,students:0,lessons:15,rating:0,revenue:0,status:"draft",icon:"⬡",color:"#d4a76a"},
];

function CoursesPage({showToast}){
  const [courses,setCourses]=useState(COURSES_DATA2);const [modal,setModal]=useState(false);const [building,setBuilding]=useState(null);const [nc,setNc]=useState({title:"",price:"",ministry:"apostle"});
  const fmt2=n=>n>=1000?(n/1000).toFixed(1)+"k":String(n);
  if(building) return(<div className="fade" style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:9}}>
      <div><div style={{fontFamily:"var(--font-d)",fontSize:17,color:"var(--gold)",letterSpacing:".05em"}}>{building.title}</div><div style={{color:"var(--muted)",fontSize:11,marginTop:3,fontStyle:"italic"}}>Course Builder</div></div>
      <button className="btn-outline" style={{fontSize:10}} onClick={()=>setBuilding(null)}>← Back</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"240px 1fr",gap:12,height:340}}>
      <div style={{background:"var(--surface)",borderRadius:12,border:"1px solid rgba(200,169,110,.07)",padding:11,overflowY:"auto"}}>
        <div style={{fontFamily:"var(--font-d)",fontSize:8,letterSpacing:".08em",color:"var(--muted)",marginBottom:7}}>MODULES & LESSONS</div>
        {["Welcome & Overview","Foundation","Core Framework","Application","Final Assessment"].map((m,i)=><div key={i} style={{marginBottom:9}}>
          <div style={{fontSize:9,fontFamily:"var(--font-m)",color:"var(--gold)",marginBottom:4,letterSpacing:".06em"}}>MODULE {i+1}</div>
          {[1,2,3].map(j=><div key={j} style={{display:"flex",gap:6,alignItems:"center",padding:"4px 6px",borderRadius:6,background:i===0&&j===1?"rgba(200,169,110,.08)":"transparent",cursor:"pointer",marginBottom:2}}>
            <div style={{width:14,height:14,borderRadius:"50%",background:i===0&&j===1?"var(--gold)":"rgba(200,169,110,.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,color:i===0&&j===1?"#09080a":"var(--muted)",flexShrink:0}}>{i*3+j}</div>
            <span style={{fontSize:10,color:i===0&&j===1?"var(--text)":"var(--muted)"}}>Lesson {i*3+j}</span>
          </div>)}
        </div>)}
        <button className="btn-outline" style={{width:"100%",padding:"5px",fontSize:8,marginTop:3}} onClick={()=>showToast("Lesson added!")}>+ Add Lesson</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        <div style={{background:"var(--surface)",borderRadius:12,border:"1px solid rgba(200,169,110,.07)",flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:7}}>
          <div style={{fontSize:30,color:"rgba(200,169,110,.4)"}}>▶</div>
          <div style={{fontFamily:"var(--font-d)",fontSize:10,color:"var(--muted)",letterSpacing:".06em"}}>VIDEO UPLOAD AREA</div>
          <div style={{fontSize:11,color:"var(--muted)",fontStyle:"italic"}}>Drag & drop your lesson video</div>
          <button className="btn-outline" style={{fontSize:9,padding:"5px 14px"}} onClick={()=>showToast("File picker opening...")}>Choose File</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
          {["Add Quiz","Add Download","Add Worksheet","Live Session"].map(a=><button key={a} className="btn-outline" style={{padding:"8px",fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",gap:5}} onClick={()=>showToast(`${a} added!`)}>+ {a}</button>)}
        </div>
      </div>
    </div>
    <div style={{display:"flex",gap:7,justifyContent:"flex-end"}}>
      <button className="btn-outline" style={{fontSize:10}} onClick={()=>showToast("Saved!")}>Save Draft</button>
      <button className="btn-gold" style={{fontSize:10}} onClick={()=>{showToast("Published! 🎉");setCourses(p=>p.map(c=>c.id===building.id?{...c,status:"published"}:c));setBuilding(null);}}>Publish Course</button>
    </div>
  </div>);
  return(<div className="fade" style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:9}}>
      <div><div style={{fontFamily:"var(--font-d)",fontSize:20,color:"var(--gold)",letterSpacing:".06em"}}>Courses & Products</div><div style={{color:"var(--muted)",fontSize:12,marginTop:4,fontStyle:"italic"}}>Build, sell and deliver your kingdom knowledge</div></div>
      <button className="btn-gold" style={{fontSize:10}} onClick={()=>setModal(true)}>+ New Course</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
      <Sc icon="🎓" label="Total Courses" value={courses.length} color="var(--gold)" />
      <Sc icon="👥" label="Total Students" value={fmt2(courses.reduce((s,c)=>s+c.students,0))} sub="this month" color="var(--blue)" />
      <Sc icon="💰" label="Course Revenue" value={fmtM(courses.reduce((s,c)=>s+c.revenue,0))} sub="all time" color="var(--green)" />
      <Sc icon="⭐" label="Avg Rating" value={(courses.filter(c=>c.rating>0).reduce((s,c)=>s+c.rating,0)/courses.filter(c=>c.rating>0).length).toFixed(1)} color="var(--orange)" />
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:11}}>
      {courses.map(c=>{const mf=FIVEFOLD.find(f=>f.id===c.ministry);return<div key={c.id} style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,overflow:"hidden",cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(200,169,110,.28)"} onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
        <div style={{height:70,background:`linear-gradient(135deg,${c.color}18,${c.color}06)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,color:c.color,position:"relative"}}>{c.icon}<div style={{position:"absolute",top:8,right:8}}><Bdg s={c.status} /></div></div>
        <div style={{padding:13}}>
          <div style={{fontFamily:"var(--font-d)",fontSize:11,letterSpacing:".03em",marginBottom:3,lineHeight:1.3}}>{c.title}</div>
          <div style={{fontSize:10,color:"var(--muted)",marginBottom:8}}>{c.author} · {c.lessons} lessons</div>
          {mf&&<span className="tag" style={{background:`${mf.color}10`,color:mf.color,fontSize:8,marginBottom:8,display:"inline-block"}}>{mf.icon} {mf.title}</span>}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:5,marginBottom:9}}>{[["$"+c.price,"Price"],[""+c.students,"Students"],[c.rating>0?c.rating.toFixed(1)+"★":"—","Rating"]].map(([v,l])=><div key={l} style={{background:"rgba(200,169,110,.06)",borderRadius:6,padding:"5px 3px",textAlign:"center"}}><div style={{fontFamily:"var(--font-d)",fontSize:11,color:"var(--gold)"}}>{v}</div><div style={{fontSize:8,fontFamily:"var(--font-m)",color:"var(--muted)",marginTop:1}}>{l}</div></div>)}</div>
          <div style={{fontSize:10,color:"var(--green)",fontFamily:"var(--font-m)",marginBottom:9}}>{c.revenue>0?fmtM(c.revenue)+" earned":"Not yet published"}</div>
          <button className="btn-gold" style={{width:"100%",padding:"6px",fontSize:9}} onClick={()=>setBuilding(c)}>Open Builder →</button>
        </div>
      </div>;})}
      <div style={{background:"rgba(200,169,110,.02)",border:"1px dashed rgba(200,169,110,.13)",borderRadius:14,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:7,padding:20,cursor:"pointer",minHeight:200}} onClick={()=>setModal(true)}>
        <div style={{fontSize:26,color:"rgba(200,169,110,.4)"}}>+</div>
        <div style={{fontFamily:"var(--font-d)",fontSize:10,color:"var(--muted)",letterSpacing:".06em",textAlign:"center"}}>CREATE NEW COURSE</div>
        <div style={{fontSize:11,color:"var(--muted)",fontStyle:"italic",textAlign:"center"}}>Videos · Quizzes · Downloads · Live</div>
      </div>
    </div>
    {modal&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.82)",backdropFilter:"blur(6px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} className="fade">
      <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:18,padding:26,width:"100%",maxWidth:420}} className="fade">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><div style={{fontFamily:"var(--font-d)",fontSize:14,color:"var(--gold)",letterSpacing:".06em"}}>Create New Course</div><button onClick={()=>setModal(false)} style={{background:"rgba(200,169,110,.08)",border:"none",color:"var(--muted)",borderRadius:8,width:27,height:27,fontSize:12,cursor:"pointer"}}>✕</button></div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {[["Course Title","e.g. Kingdom Business Mastery","title"],["Price ($)","e.g. 297","price"]].map(([l,ph,k])=><div key={k}><label style={{display:"block",fontSize:10,fontFamily:"var(--font-m)",color:"var(--muted)",letterSpacing:".09em",marginBottom:5,textTransform:"uppercase"}}>{l}</label><input placeholder={ph} value={nc[k]} onChange={e=>setNc(p=>({...p,[k]:e.target.value}))} /></div>)}
          <div><label style={{display:"block",fontSize:10,fontFamily:"var(--font-m)",color:"var(--muted)",letterSpacing:".09em",marginBottom:5,textTransform:"uppercase"}}>Ministry Alignment</label><select value={nc.ministry} onChange={e=>setNc(p=>({...p,ministry:e.target.value}))}>{FIVEFOLD.map(f=><option key={f.id} value={f.id}>{f.icon} {f.title}</option>)}</select></div>
          <div style={{display:"flex",gap:8,marginTop:4}}>
            <button className="btn-outline" style={{flex:1,fontSize:10}} onClick={()=>setModal(false)}>Cancel</button>
            <button className="btn-gold" style={{flex:2,fontSize:10}} onClick={()=>{if(!nc.title){showToast("Title required","error");return;}const x={id:Date.now(),...nc,price:Number(nc.price)||0,author:"You",students:0,lessons:0,rating:0,revenue:0,status:"draft",icon:FIVEFOLD.find(f=>f.id===nc.ministry)?.icon||"◎",color:FIVEFOLD.find(f=>f.id===nc.ministry)?.color||"var(--gold)"};setCourses(p=>[...p,x]);setModal(false);setBuilding(x);showToast("Course created! Let's build it 🎓");}}>Create & Build</button>
          </div>
        </div>
      </div>
    </div>}
  </div>);
}

// ─── LANDING PAGES ────────────────────────────────────────────────────────────
function LandingPages({showToast}){
  const [aiOpen,setAiOpen]=useState(false);const [idea,setIdea]=useState("");const [gen,setGen]=useState(false);const [preview,setPreview]=useState(null);
  const TMPL=[{name:"Kingdom Launch",desc:"Bold launch page for courses & programs",icon:"⚜",tag:"Popular"},{name:"Ministry Opt-in",desc:"Email capture for ministry & church lists",icon:"♥",tag:"Ministry"},{name:"Webinar Registration",desc:"High-converting event registration",icon:"◎",tag:"Events"},{name:"Sales Letter",desc:"Long-form sales page with full persuasion",icon:"✦",tag:"Sales"},{name:"Crusade / Outreach",desc:"Evangelism & outreach campaign page",icon:"◈",tag:"Outreach"},{name:"Coaching Application",desc:"Application funnel for high-ticket coaching",icon:"◻",tag:"Coaching"}];
  const generate=async()=>{
    if(!idea.trim()){showToast("Describe your page first","error");return;}
    setGen(true);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`Generate a landing page for: ${idea}\nReturn ONLY JSON: {"headline":"h","subheadline":"s","hero":"hero paragraph","benefits":["b1","b2","b3","b4"],"cta":"button text","testimonial":{"quote":"q","name":"n","title":"t"},"urgency":"urgency line"}`}]})});
      const d=await r.json();const raw=d.content?.map(b=>b.text||"").join("")||"{}";
      setPreview(JSON.parse(raw.replace(/```json|```/g,"").trim()));showToast("Landing page ready! ✦");
    }catch{showToast("API error","error");}
    setGen(false);
  };
  if(preview) return(<div className="fade" style={{display:"flex",flexDirection:"column",gap:18}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontFamily:"var(--font-d)",fontSize:20,color:"var(--gold)",letterSpacing:".06em"}}>Landing Page Preview</div><div style={{color:"var(--muted)",fontSize:12,marginTop:4,fontStyle:"italic"}}>AI-generated · Ready to publish</div></div>
      <div style={{display:"flex",gap:8}}><button className="btn-outline" style={{fontSize:10}} onClick={()=>setPreview(null)}>← Back</button><button className="btn-gold" style={{fontSize:10}} onClick={()=>showToast("Page published! 🚀")}>Publish Page →</button></div>
    </div>
    <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,overflow:"hidden"}}>
      <div style={{background:"linear-gradient(180deg,#1a1208,#0d0b08)",padding:"44px 36px",textAlign:"center",borderBottom:"1px solid var(--border)"}}>
        <div style={{fontFamily:"var(--font-d)",fontSize:26,color:"var(--gold)",letterSpacing:".04em",lineHeight:1.2,maxWidth:560,margin:"0 auto 12px"}}>{preview.headline}</div>
        <div style={{fontSize:15,color:"var(--muted)",fontStyle:"italic",maxWidth:480,margin:"0 auto 20px",lineHeight:1.6}}>{preview.subheadline}</div>
        <div style={{fontSize:14,color:"var(--text)",maxWidth:520,margin:"0 auto 24px",lineHeight:1.75}}>{preview.hero}</div>
        <button className="btn-gold" style={{padding:"13px 32px",fontSize:12,letterSpacing:".1em"}}>{preview.cta}</button>
        {preview.urgency&&<div style={{fontSize:11,color:"var(--orange)",marginTop:10,fontFamily:"var(--font-m)"}}>{preview.urgency}</div>}
      </div>
      <div style={{padding:"28px 36px"}}>
        <div style={{fontFamily:"var(--font-d)",fontSize:12,color:"var(--gold)",letterSpacing:".07em",textAlign:"center",marginBottom:16}}>WHAT YOU'LL GET</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,maxWidth:560,margin:"0 auto 24px"}}>{(preview.benefits||[]).map((b,i)=><div key={i} style={{display:"flex",gap:9,padding:"10px 13px",background:"rgba(200,169,110,.04)",border:"1px solid rgba(200,169,110,.08)",borderRadius:9}}><span style={{color:"var(--gold)",flexShrink:0}}>✓</span><span style={{fontSize:13}}>{b}</span></div>)}</div>
        {preview.testimonial&&<div style={{background:"rgba(200,169,110,.05)",border:"1px solid rgba(200,169,110,.12)",borderRadius:12,padding:"18px 22px",maxWidth:480,margin:"0 auto 22px",textAlign:"center"}}><div style={{fontSize:14,fontStyle:"italic",lineHeight:1.7,marginBottom:10}}>&ldquo;{preview.testimonial.quote}&rdquo;</div><div style={{fontWeight:600,fontSize:13}}>{preview.testimonial.name}</div><div style={{fontSize:11,color:"var(--muted)",fontFamily:"var(--font-m)"}}>{preview.testimonial.title}</div></div>}
        <div style={{textAlign:"center"}}><button className="btn-gold" style={{padding:"13px 32px",fontSize:12,letterSpacing:".1em"}}>{preview.cta}</button></div>
      </div>
    </div>
  </div>);
  return(<div className="fade" style={{display:"flex",flexDirection:"column",gap:18}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontFamily:"var(--font-d)",fontSize:20,color:"var(--gold)",letterSpacing:".06em"}}>Landing Page Builder</div><div style={{color:"var(--muted)",fontSize:12,marginTop:4,fontStyle:"italic"}}>AI-powered copy · Instant publish · Custom domain</div></div>
      <button className="btn-gold" style={{fontSize:10}} onClick={()=>setAiOpen(true)}>✦ AI Generate Page</button>
    </div>
    {aiOpen&&<div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,padding:20}}>
      <div style={{fontFamily:"var(--font-d)",fontSize:11,letterSpacing:".08em",color:"var(--gold)",marginBottom:4}}>AI PAGE GENERATOR</div>
      <div style={{color:"var(--muted)",fontSize:13,marginBottom:12,fontStyle:"italic"}}>Describe what you're selling and Claude will build a full landing page in seconds.</div>
      <textarea style={{background:"rgba(200,169,110,.04)",border:"1px solid var(--border)",borderRadius:10,padding:13,color:"var(--text)",fontFamily:"var(--font-body)",fontSize:14,lineHeight:1.7,resize:"none",width:"100%",minHeight:80,outline:"none"}} placeholder="e.g. A 6-week kingdom business coaching program for Christian entrepreneurs. $2,000. Limited to 15 spots. Results: 10x revenue using biblical principles." value={idea} onChange={e=>setIdea(e.target.value)} />
      <div style={{display:"flex",gap:8,marginTop:10,justifyContent:"flex-end"}}>
        <button className="btn-outline" style={{fontSize:10}} onClick={()=>setAiOpen(false)}>Cancel</button>
        <button className="btn-gold" style={{fontSize:10,padding:"8px 20px"}} onClick={generate} disabled={gen}>{gen?<span style={{fontFamily:"var(--font-body)",fontStyle:"italic"}}>Generating...</span>:"✦ Generate Page"}</button>
      </div>
    </div>}
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:11}}>
      {TMPL.map((t,i)=><div key={i} style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,overflow:"hidden",cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(200,169,110,.28)"} onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
        <div style={{height:78,background:"linear-gradient(135deg,#1a1208,#0a0907)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,position:"relative"}}>{t.icon}<span style={{position:"absolute",top:7,right:7,fontSize:8,fontFamily:"var(--font-m)",color:"var(--gold)",background:"rgba(200,169,110,.13)",padding:"2px 7px",borderRadius:99}}>{t.tag}</span></div>
        <div style={{padding:13}}>
          <div style={{fontFamily:"var(--font-d)",fontSize:11,letterSpacing:".04em",marginBottom:3}}>{t.name}</div>
          <div style={{fontSize:11,color:"var(--muted)",marginBottom:11}}>{t.desc}</div>
          <div style={{display:"flex",gap:6}}><button className="btn-gold" style={{flex:1,padding:"6px",fontSize:9}} onClick={()=>{setIdea("");setAiOpen(true);showToast(`${t.name} template loaded!`);}}>Use Template</button><button className="btn-outline" style={{padding:"6px 9px",fontSize:9}} onClick={()=>showToast("Preview opened!")}>Preview</button></div>
        </div>
      </div>)}
    </div>
    <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,padding:18}}>
      <div style={{fontFamily:"var(--font-d)",fontSize:10,letterSpacing:".09em",marginBottom:11}}>YOUR PUBLISHED PAGES</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {[{name:"Kingdom Entrepreneurs Hub",url:"kingdomshift.io/p/entrepreneurs-hub",visits:1240,leads:87,live:true},{name:"Apostolic Business Mastery",url:"kingdomshift.io/p/apostolic-mastery",visits:890,leads:124,live:true},{name:"Prophetic School Opt-in",url:"kingdomshift.io/p/prophetic-school",visits:540,leads:203,live:false}].map((p,i)=><div key={i} style={{display:"flex",gap:12,alignItems:"center",padding:"10px 13px",background:"rgba(200,169,110,.04)",borderRadius:9,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:160}}><div style={{fontSize:13,fontWeight:500,marginBottom:2}}>{p.name}</div><div style={{fontSize:10,color:"var(--gold)",fontFamily:"var(--font-m)"}}>{p.url}</div></div>
          <div style={{display:"flex",gap:14,flexShrink:0}}>{[[""+p.visits,"VISITS"],[""+p.leads,"LEADS"]].map(([v,l])=><div key={l} style={{textAlign:"center"}}><div style={{fontFamily:"var(--font-d)",fontSize:13,color:"var(--gold)"}}>{v}</div><div style={{fontSize:8,fontFamily:"var(--font-m)",color:"var(--muted)"}}>{l}</div></div>)}</div>
          <div style={{display:"flex",gap:6,flexShrink:0}}><Bdg s={p.live?"active":"draft"} /><button className="btn-outline" style={{padding:"3px 9px",fontSize:9}} onClick={()=>showToast("Editor opening!")}>Edit</button><button className="btn-outline" style={{padding:"3px 9px",fontSize:9}} onClick={()=>showToast("Link copied!")}>Share</button></div>
        </div>)}
      </div>
    </div>
  </div>);
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type="success") => {
    setToast({msg,type});
    setTimeout(()=>setToast(null),3200);
  };

  const NAV = [
    {id:"dashboard",  icon:"⬡",  label:"Dashboard"},
    {id:"team",       icon:"✦",  label:"AI Marketing Team", highlight:true},
    {id:"payments",   icon:"💰", label:"Payments",           badge:"NEW"},
    {id:"community",  icon:"👥", label:"Community"},
    {id:"courses",    icon:"🎓", label:"Courses"},
    {id:"pages",      icon:"◻",  label:"Landing Pages"},
    {id:"fivefold",   icon:"⚜",  label:"Fivefold Hub"},
    {id:"marketplace",icon:"◈",  label:"KS Market"},
    {id:"campaigns",  icon:"◎",  label:"Campaigns"},
    {id:"contacts",   icon:"♥",  label:"Contacts"},
    {id:"analytics",  icon:"▤",  label:"Analytics"},
    {id:"admin",      icon:"⬢",  label:"Admin"},
    {id:"settings",   icon:"⚙",  label:"Settings"},
  ];

  const renderPage = () => {
    switch(page) {
      case "dashboard":  return <Dashboard setPage={setPage} showToast={showToast} />;
      case "team":       return <AIMarketingTeam showToast={showToast} />;
      case "payments":   return <PaymentsPage showToast={showToast} />;
      case "community":  return <CommunityPage showToast={showToast} />;
      case "courses":    return <CoursesPage showToast={showToast} />;
      case "pages":      return <LandingPages showToast={showToast} />;
      case "fivefold":   return <FivefoldHub showToast={showToast} setPage={setPage} />;
      case "marketplace":return <Marketplace showToast={showToast} />;
      default: return (
        <div className="fade" style={{display:"flex",flexDirection:"column",gap:22}}>
          <div style={{fontFamily:"var(--fd)",fontSize:22,color:"var(--gold)",letterSpacing:"0.06em",textTransform:"capitalize"}}>{page}</div>
          <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:40,textAlign:"center"}}>
            <div style={{fontSize:30,marginBottom:10,color:"rgba(200,169,110,.35)"}}>◎</div>
            <div style={{fontFamily:"var(--fd)",fontSize:12,color:"var(--muted)",letterSpacing:"0.06em",marginBottom:8}}>BUILDING NOW</div>
            <div style={{fontSize:13,color:"var(--muted)",fontStyle:"italic",marginBottom:16}}>Your AI team is constructing this section...</div>
            <button className="btn-gold" style={{fontSize:10}} onClick={()=>setPage("team")}>✦ Use AI Marketing Team</button>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div style={{display:"flex",minHeight:"100vh",background:"var(--bg)"}}>

        {/* SIDEBAR */}
        <aside style={{width:sidebarOpen?244:62,minHeight:"100vh",background:"var(--surface)",borderRight:"1px solid var(--border)",display:"flex",flexDirection:"column",transition:"width .3s cubic-bezier(.16,1,.3,1)",overflow:"hidden",flexShrink:0,position:"sticky",top:0,alignSelf:"flex-start",maxHeight:"100vh"}}>
          <div style={{padding:"22px 14px 16px",display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid var(--border)",overflow:"hidden"}}>
            <div style={{width:36,height:36,flexShrink:0,borderRadius:10,background:"linear-gradient(135deg,#c8a96e,#7c4f1e)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,letterSpacing:0}}>KS</div>
            {sidebarOpen && <div style={{overflow:"hidden",whiteSpace:"nowrap"}}>
              <div style={{fontFamily:"var(--fd)",fontSize:11,letterSpacing:"0.14em",color:"var(--gold)"}}>KINGDOM</div>
              <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:"0.18em",color:"var(--muted)",marginTop:1}}>MARKETPLACE · PLATFORM</div>
            </div>}
          </div>

          <nav style={{flex:1,padding:"12px 8px",display:"flex",flexDirection:"column",gap:2,overflowY:"auto"}}>
            {NAV.map(n=>(
              <button key={n.id} onClick={()=>setPage(n.id)}
                style={{display:"flex",alignItems:"center",gap:10,padding:sidebarOpen?"9px 12px":"9px",justifyContent:sidebarOpen?"flex-start":"center",borderRadius:10,background:page===n.id?"rgba(200,169,110,0.1)":n.highlight&&page!==n.id?"rgba(200,169,110,0.04)":"transparent",border:`1px solid ${page===n.id?"rgba(200,169,110,0.22)":n.highlight&&page!==n.id?"rgba(200,169,110,0.1)":"transparent"}`,color:page===n.id?"var(--gold)":n.highlight?"rgba(200,169,110,0.6)":"var(--muted)",fontSize:14,width:"100%",whiteSpace:"nowrap",overflow:"hidden"}}>
                <span style={{flexShrink:0,fontSize:12}}>{n.icon}</span>
                {sidebarOpen && <span style={{fontFamily:"var(--fd)",fontSize:10,letterSpacing:"0.08em"}}>{n.label.toUpperCase()}</span>}
                {sidebarOpen && n.highlight && page!==n.id && <span style={{marginLeft:"auto",fontSize:7,fontFamily:"var(--fm)",color:"var(--gold)",background:"rgba(200,169,110,0.12)",padding:"2px 6px",borderRadius:99}}>AI</span>}
                {sidebarOpen && n.badge && !n.highlight && <span style={{marginLeft:"auto",fontSize:7,fontFamily:"var(--fm)",color:"var(--green)",background:"rgba(72,187,120,0.12)",padding:"2px 6px",borderRadius:99}}>{n.badge}</span>}
              </button>
            ))}
          </nav>

          <div style={{padding:"10px 8px",borderTop:"1px solid var(--border)"}}>
            <button onClick={()=>setSidebarOpen(p=>!p)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:sidebarOpen?"flex-end":"center",background:"transparent",border:"none",color:"var(--muted)",fontSize:12,padding:"6px",cursor:"pointer"}}>
              {sidebarOpen?"◂":"▸"}
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{flex:1,padding:"32px 36px",overflowY:"auto",minHeight:"100vh"}}>
          {renderPage()}
        </main>
      </div>

      {toast && (
        <div className="fade" style={{position:"fixed",bottom:24,right:24,zIndex:2000,background:toast.type==="success"?"rgba(72,187,120,0.1)":"rgba(224,82,82,0.1)",border:`1px solid ${toast.type==="success"?"rgba(72,187,120,0.25)":"rgba(224,82,82,0.25)"}`,borderRadius:12,padding:"11px 18px",color:toast.type==="success"?"var(--green)":"var(--red)",fontFamily:"var(--fm)",fontSize:12,display:"flex",alignItems:"center",gap:8,backdropFilter:"blur(8px)"}}>
          <span>{toast.type==="success"?"✓":"✕"}</span>{toast.msg}
        </div>
      )}
    </>
  );
}
