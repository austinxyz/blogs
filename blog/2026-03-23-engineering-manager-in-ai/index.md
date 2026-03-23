---
title: "The AI-Augmented Engineering Manager: How I Run a Team in 2026"
date: 2026-03-23
authors: [austin]
tags: [ai, leadership, management, career-development]
description: "Everyone's talking about AI replacing individual contributors. Nobody's talking about what it does to engineering managers — and the difference between EMs who use AI to become 2x managers and those who just produce prettier documents."
---

Everyone's talking about AI replacing individual contributors. Nobody's talking about what it does to engineering managers.

That asymmetry is interesting to me, because in my experience, EMs stand to gain *more* from AI than most ICs — or lose more ground if they ignore it. The difference isn't which tools you use. It's whether you use AI to reclaim the time that actually matters, or just use it to make your status updates look better.

Here's my honest accounting of what changed after a year of deliberately integrating AI into how I manage my team.

<!--truncate-->

## What Actually Takes Up an EM's Time

Before getting into AI, it's worth being honest about the job. An Engineering Manager's responsibilities look clean on paper: delivery, people growth, alignment, technical direction, productivity. In practice, the calendar looks nothing like that.

The actual day is fragmented across writing status updates, preparing for stakeholder meetings, screending resumes, writing performance reviews, drafting job descriptions, responding to Slack threads, prepping 1-on-1s, and handling whatever operational fire is burning that week. These tasks aren't trivial — they matter — but they're also high-frequency, low-ceiling work. They consume time without compounding.

During hiring season, a single one-hour interview used to cost me 3–4 hours total: preparation, the interview itself, writing feedback. With 3–4 interviews a week, half my time was gone before I touched anything strategic. During performance review cycles, I worked late just to have enough evidence and documentation to do right by my team. On Fridays, writing the weekly highlight report felt like the most dreaded part of the week.

AI didn't change what an EM does. It changed how much time the operational layer takes — and by extension, what I can do with the time I recovered.

The rough number: **the admin layer of my job now takes about a third of the time it used to.**

---

## Where AI Actually Helps

### Staying Technical

There's a well-documented drift that happens to EMs over time: you move further from the code, and you start relying entirely on your ICs to interpret the technical reality of your systems. The risk is subtle — you think you understand what's happening, but you're really understanding someone else's summary of what's happening, filtered through their perspective and priorities.

AI coding tools changed this for me. With Claude Code, I can read an unfamiliar repository and understand what it does in a fraction of the time. I can review a PR and form a real opinion on the approach, not just the description. I've used the Claude Code Skills my team built — code review, bug triage — and actually fixed a bug myself, which gave me a level of system detail that no architecture diagram would have surfaced.

The point isn't that EMs should be writing production code. It's that having your own ground truth in technical conversations makes you a better manager, a better decision-maker, and a better advocate for your team with stakeholders.

### Planning with Data Instead of Intuition

Quarterly planning used to take close to a month. Long meetings. Debate about what to cut and what to keep, often driven more by whoever argued most convincingly than by actual data. Decisions felt right in the room but hard to explain afterward.

Now the same process takes about two weeks. I feed in the team's current state, our yearly goals, stakeholder priorities, and capacity constraints, and AI helps structure the breakdown, surface dependencies, and generate the first draft of the plan. The decisions are still mine — and the judgment calls still require knowing the team, the codebase, and the organizational context. But the scaffolding is there faster, and the reasoning is documented.

What changed isn't the quality of the decisions, it's the quality of the conversation around them.

### Upward Communication

Fridays used to be my least favorite day because of the weekly highlight report. Not because writing is hard — because translating technical work into stakeholder-relevant language, under time pressure, at the end of a long week, is genuinely draining.

A status update that used to take 1–2 hours now takes about 15 minutes. I put in the raw inputs — what shipped, what's at risk, what decisions were made — and AI produces a structured executive summary framed around value and outcomes, not technical implementation. The emails I send to VPs now are tighter, more direct, less cluttered with technical detail that doesn't serve the reader.

One thing worth flagging: **prettier documents are not the same as better outcomes.** I'll come back to this.

### Understanding Your People Better

One of the hardest parts of performance reviews is that the evidence is scattered everywhere — Jira, GitHub, Slack, 1-on-1 notes, email threads. It's easy to inadvertently favor the work you remember most vividly, which is usually the work that happened most recently or created the most noise.

I now keep each engineer's 1-on-1 notes, their yearly goals, and the company's career development framework loaded in NotebookLM. At any point I can query across the entire history: what growth areas did we identify six months ago? What commitments did they make? Where have I seen patterns? When promotion time comes, the evidence doesn't require a frantic archaeology project — it's already organized.

The thing I heard most from engineers after implementing this: *"You actually remembered that."* They mentioned something in a 1-on-1 three months earlier, and I brought it up again with context. That moment of recognition — the feeling that their manager actually pays attention — is not something AI produces. But AI creates the conditions for it to happen consistently, not just when you happen to remember.

### Making Better-Informed Decisions

Build vs. buy decisions, technical stack choices, team structure changes — these used to involve a lot of time gathering information before I could even form an opinion. Now AI compresses that research phase significantly. I can have a structured pros/cons analysis in minutes, not days.

To be clear: AI doesn't make the decisions. It can't weigh the organizational politics, the team morale dynamics, or the unstated priorities that any experienced EM knows matter more than the logical case. But arriving at a decision with better information, faster, is genuinely useful.

---

## Six Workflows That Changed My Job

### 1. Upward Management — ChatGPT / Gemini

**What I do:** Weekly highlight reports, escalation emails, quarterly business review materials.

**How it works:** I feed in raw notes — project status, key decisions, risks — and AI drafts a structured executive summary. For important emails, I describe the situation and stakeholder context; AI produces a first draft in the right register.

**What changed:** The emails that reach my VP are now focused on impact and outcomes, not implementation details. They're tighter, clearer, and require far fewer revision cycles. The preparation time for a quarterly business review dropped from a full day to a couple of hours.

---

### 2. Internal Customer Management — Agent / MCP / Skills

**What I do:** My team serves internal engineering teams. I built agents and custom Skills to help those teams find information, run diagnostics, and handle common requests without requiring my team's direct involvement.

**What changed:** Team toil dropped by about 50%. More importantly, incidents dropped from 3–4 per month to roughly 1 — some months, zero. That's time I'm not spending on post-mortems, root cause analyses, and stakeholder communication during an outage. It's also morale: nobody enjoys the reactive work that follows an incident.

---

### 3. People Management and Performance Reviews — Glean / NotebookLM

**What I do:** 1-on-1 notes, career development plans, promotion documents, and (when necessary) performance improvement plans.

**How it works:** I use Glean to search across an engineer's Jira activity, Slack contributions, documents, and email history. NotebookLM holds the 1-on-1 notes, their yearly goals, and the career framework. When writing a promotion document, the evidence comes from every signal — not just what I happened to notice.

**What changed:** Performance materials are more complete and more credible. More importantly, engineers feel seen. The manager who remembers a specific thing you said three months ago — that's not a memory trick, it's a system. But to the engineer, it feels like genuine attention.

---

### 4. Hiring — Claude Code + Custom Skills Pipeline

**What I do:** End-to-end recruiting workflow, from job description to offer.

**The pipeline:**
- **JD Creation** — Input role requirements, output calibrated job description
- **Resume-JD Matcher** — Batch screening with match scores and key gaps
- **Interview Question Generator** — Personalized questions based on the specific candidate's background and the role requirements
- **Interview Feedback Collector** — Structured template that prompts for the right evidence; auto-aggregates across interviewers
- **Debrief Tool** — Surfaces score divergence across interviewers, prompts discussion of disagreements
- **Offer Package Tool** — Generates offer range recommendations based on leveling and market data

**What changed:** Each one-hour interview used to cost me 3–4 hours total. Now it's about 90 minutes. Candidates consistently say the questions feel tailored, not generic. The structured feedback reduces the chance of a strong candidate slipping through on a bad day.

Most visibly: our hiring cycle went from 3+ months down to 4–6 weeks.

---

### 5. Project Management — Claude Code

**What I do:** Quarterly plans, OKR tracking, weekly team health reports.

**How it works:** The planning system integrates yearly goals, breaks them down into sprint-level work, and produces a living quarterly plan. An automated weekly report pulls from Jira and GitHub to flag OKRs at risk before they become problems.

**What changed:** Our team OKR completion rate went from around 50% to 80%. Planning meetings went from 2–3 hours of debate down to a 30-minute alignment check. The improvement isn't just efficiency — it's that people know what we're doing and why, which changes how they make day-to-day decisions.

---

### 6. Remote Team Management — Claude Code

**What I do:** Team knowledge base, onboarding system.

**How it works:** Every core system has structured documentation: architecture overview, key modules, environment setup, development workflow, incident response runbook. Onboarding is broken down by day, not week.

**What changed:** A new team member in Dublin previously took about three months to reach full productivity. That's now around six weeks. The improvement comes from reducing the time spent asking people for context — the knowledge is findable without requiring someone to be available.

---

## The Side Effects (Being Honest)

### Beautiful Documents Don't Mean Better Execution

This is the one I had to learn the hard way. A polished Q2 plan, beautifully structured with clear OKRs and well-defined milestones, is still just a document. If the EM spends time refining the AI's output instead of validating whether the team actually understands and agrees with the plan, you end up with great artifacts and poor execution.

AI makes it easy to produce documentation that looks authoritative. That can create a false sense of clarity. The calibration still has to come from direct observation and honest conversation — no tool replaces that.

### Tool Fatigue Is Real

In the past year alone, my workflow has gone through: ChatGPT → Glean + NotebookLM → Cline → Claude Code. First I was learning prompt engineering. Then agent frameworks. Then MCP. Now Skills and spec-driven development. Each shift required real time investment to do properly.

My suggestion: go deep on 2–3 core workflows rather than chasing every new tool. The compounding value comes from depth, not breadth.

### Over-Reliance Degrades Judgment

If you generate every document through AI, your sense of what a *good* document looks like atrophies. If you consult AI before forming your own opinion on every decision, the muscle for making independent judgments weakens.

I keep a deliberate practice: for important decisions, I think through my own view before I ask AI to help structure or pressure-test it. The AI is most useful as a thinking partner, not as a replacement for thinking.

---

## What AI Cannot Do for You

### Build Trust

Trust is accumulated through consistency, follow-through, and genuine care — over time, in individual conversations, in how you handle the hard moments. AI can help you remember things. It cannot make you actually care about your people. Engineers know the difference.

### Make Organizational Judgments

Stakeholder politics, the unspoken priorities behind a request, the right way to navigate a cross-team conflict — these require context and relationship that no AI has access to. AI gives you information. Judgment comes from knowing the organization, the people, and the history.

### Handle a Crisis

When an incident fires at 2am and you need to make fast calls with incomplete information — who owns what, what to escalate, how to communicate outward while the team is working — you need your own clarity and calm. Pausing to prompt an AI is not a useful move in the middle of active incident response. The systems you've built help prevent incidents. But handling them when they happen is still on you.

### Generate Curiosity

AI amplifies the curiosity you already have. It doesn't create it. The managers who are growing fastest in this environment are the ones using AI to explore questions they were already interested in — going deeper, moving faster. If you're not naturally curious about your craft, AI won't fix that.

---

## The Framework: Use AI to Manage Information, Use Your Time to Manage People

| Work type | AI can do | You have to do |
|---|---|---|
| Documentation & reporting | Generate, structure, polish | Decide what's worth writing |
| Performance management | Gather evidence, draft materials | The actual 1-on-1 conversations |
| Hiring | Screen, generate questions, aggregate feedback | Final judgment calls, offer conversations |
| Project planning | Break down, track, flag risks | Priority decisions and tradeoffs |
| Technical direction | Research, compare options, summarize | Choosing direction and owning the outcome |

The EMs who benefit most from AI are the ones who use it to compress the operational layer — so they can invest more deeply in the irreplaceable parts: genuine relationships, organizational judgment, technical credibility, and the hard conversations that no tool can have for you.

The EMs who benefit least are the ones who use AI to polish the surface while the underlying work stays the same.

The gap between those two groups is growing.
