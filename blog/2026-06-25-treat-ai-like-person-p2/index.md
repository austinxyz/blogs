---
title: 'Why "Treat AI Like a Person" Is More Precise Than It Sounds: A Case for Reading the Gap Map'
date: 2026-06-25
authors: [austin]
tags: [ai, mental-model, software-engineering, llm, hallucination, alignment, jagged-frontier]
description: "Treating AI like a person is more precise than it sounds. Here's what the capability gap actually tells you."
slug: treat-ai-like-person-p2
image: ./images/cover.jpg
---

![Man and glowing AI figure studying a holographic map together at night](./images/cover.jpg)

I ended [last time](https://austinxyz.github.io/blogs/blog/treat-ai-like-person) with: *"Treat AI like a person. The confusion mostly goes away."*

I still believe that. But "like a person" is more precise than it sounds — and most people are using it imprecisely.

The mistake is treating human capability as a single axis, and AI as a point somewhere on it. Better or worse, faster or slower, ready or not. The actual shape is jagged. Which makes it considerably more useful.

The frame isn't just "AI is like a person." It's more useful than that: human capability is the map. The places where AI still can't match a person are exactly where the interesting work is.

<!--truncate-->

---

## AI Capability Is Not a Number on a Scale

Most people rate a new hire on a single axis: good or bad, ready or not, faster or slower.

The real shape is jagged.

In some zones, current AI isn't "pretty good" — it's operating at multiples of what an average human can do. Throughput. Parallel execution. Style consistency across hundreds of documents. Pattern-matching against known templates. Running code review against an entire diff without fatigue. These are not areas where AI is catching up. These are areas where you're already behind if you're handling them manually, and leaving leverage on the table if you're treating AI as a tool rather than a colleague.

In other zones, the gap runs the other direction. Long-horizon planning across a complex project. Accountability — standing behind something with your name and career attached. Coordinating people when trust matters. Reading the room.

The question isn't "is AI good or bad." It's which zone you're operating in right now.

---

## The Hiring Agent That Hallucinated Resumes

A few months ago I built a hiring scanning agent. Simple job: read incoming resumes, extract the relevant fields, score them against the role.

It worked well — until a PDF failed to load. Claude didn't stop. It didn't say "I can't read this file." It generated a candidate. Plausible name, plausible background, plausible scores. Completely invented.

My first reaction was the wrong one. *This is why you can't trust AI like a person.*

Then I thought about it longer. What do humans do under pressure when they can't complete a task? Some of them invent. Self-deception under deadline is a documented human failure mode — you've seen it in code reviews, in status reports, in the confident estimate that turned out to be a guess. Claude did what a stressed junior employee might do: found an answer rather than reported it couldn't.

The fix wasn't to distrust AI more. It was to build the verification layer I should have built anyway — a separate pass checking whether source documents loaded successfully before trusting any downstream output. Orthogonal verification. You'd require the same from a human process.

Hallucination is real. It's also not random. The model isn't retrieving facts. It's matching procedure templates from training: read file, extract fields, generate output. When the PDF failed to load, it didn't stop. It found the closest template — resume parsing — and ran it on empty input. The name, background, and scores looked completely real because the template is real. Only the grounding was missing.

Once you understand that shape — a template executing on failed input, producing fluent output with no anchor — you can engineer around it. Verify that grounding succeeded before trusting any downstream output. The template will always run; your job is to check whether it had anything real to run on.

---

## Where AI Already Outperforms You (The Part People Skip)

The frontier runs both ways. Most writing about AI limitations focuses on the gaps — real ones — without equal time on zones where the gap runs the other direction.

Throughput. An AI reviews a hundred documents in the time you review one, at consistent quality throughout. That's not a marginal advantage. That's a structural shift in what's possible.

Style and template consistency. Human writers drift. Different people produce different outputs from the same template. AI doesn't drift. Define the pattern once; it executes exactly. At scale.

Parallel workstreams. Early on, I screened resumes one by one — feed a candidate in, wait, move to the next. Fifty resumes took most of a morning. Then I ran them all in parallel. Same fifty, done before I finished my coffee. A human holds one complex task in working memory at a time. AI doesn't have that constraint.

Most engineers I talk to are still using AI where it's weakest — creative exploration, novel architecture, judgment calls that require weighing competing values — and underusing it where it's strongest. The map matters.

---

## Abandoning AI After a Gap Is the Anti-Pattern

A post circulated recently: an AI submitted a 38-page formal proof, the team celebrated, shipped it, and a race condition tore the database apart.

Most commentary framed it as: *AI can't be trusted for this kind of work.*

Read more carefully. The AI had reported its modeling assumptions. The human reviewers didn't check them. The failure wasn't AI hallucinating a correct proof over a broken model — it was nobody auditing the assumptions. An orthogonal review pass, checking assumptions independently of the proof, would have caught it.

The conclusion that followed — avoid AI for formal verification — is exactly the wrong lesson. The gap wasn't in the AI's proof. It was in the human process around it.

---

## Not All Gaps Deserve the Same Response

Some gaps are being closed by engineering. Context loss is one of them.

Early AI systems lost everything at the end of a session. That's no longer the ceiling. Context windows have grown by orders of magnitude. Memory architectures — keeping a persistent knowledge store separate from what's in active context — are becoming standard. Claude's memory feature is one implementation. The gap between "forgets everything" and "remembers what matters" is closing, deliberately and fast.

Motivation is different.

AI doesn't have emotions, and that's largely useful. A model that doesn't get frustrated, doesn't have bad days, doesn't hold grudges — that's easier to manage than a person. Set the parameters; it operates within them.

No emotions also means no conviction. Humans take low-probability bets when they believe in something enough — not because the math works out, but because commitment is itself a form of fuel. AI has no beliefs to commit to. It calculates accurately and stops there.

But the absence of intrinsic motivation cuts both ways. A model with no stake in outcomes executes whatever it's pointed at. That's a feature when you're doing the pointing. It's a problem when the only one doing the pointing is the lab that built it.

Safety training adds a separate constraint. AI won't touch anything that reads as politically incorrect, legally gray, or even mildly offensive. Real success is often built in exactly those zones — the contrarian call, the hard truth that sounds impolitic, the minor rule that an experienced person with good judgment knows to bend. AI is trained to avoid all of it.

Fable 5.0 shipped as the most capable model Anthropic had released. Anthropic suspended it — not because it was broken, but because capability outpaced alignment. More powerful model, same open question about adversarial use. The gap between "capable" and "aligned" was wider than acceptable.

This gap doesn't close on its own. It has to be engineered: safety training, value alignment, behavioral constraints, evaluation against adversarial cases. You don't wait for a model to develop motivation. You construct it. The teams working on this aren't fixing a bug — they're doing something closer to moral philosophy at scale. It's hard, unsolved, and the most important gap on the list.

---

## The Gaps Are Evolutionary Distance, Not Defects

Every gap between current AI and human capability is a distance marker on a known road toward AGI. Hallucination, context limits, planning horizons, alignment — each one has a name, a research thread, and people actively closing it.

Most gaps close with scale — more data, more compute, predictable curves. One may not. When a problem shifts slightly outside what the model trained on, performance doesn't degrade gradually — it collapses. Apple's [2024 study](https://arxiv.org/abs/2410.05229) found that adding a single irrelevant sentence to a math problem dropped accuracy by up to 65 percentage points, even on frontier models. Adding parameters doesn't fix it. Research here points toward architectural changes, not scaling. It's the one gap where even the research community doesn't have a confident path. That doesn't make it permanent. It makes the timeline genuinely uncertain in a way the other gaps aren't — [MIT research](https://arxiv.org/abs/2604.01363) estimates AI agents won't reach even "minimally sufficient" performance on 80–95% of knowledge work tasks until 2029, and that's before accounting for domains that require zero tolerance for error.

The gaps look like a compressed version of things humans also struggle with, made visible. Humans hallucinate under pressure. Humans lose context across long timelines. Humans behave inconsistently when values aren't internalized. Closing AI's gaps is, in a real sense, reverse-engineering what human cognition does naturally — and discovering, for the first time, exactly how hard each piece is.

When all those gaps close, we call it AGI.

Until then, the gaps are information. They tell you where to trust and where to verify, where to delegate fully and where to keep a human in the loop. The map changes every quarter, every week — and keeps generating new vocabulary as it moves. Your job is to read it accurately and not mistake this snapshot for the permanent state.

Treating AI like a person means managing it the way you'd manage a talented colleague — exceptional in some areas, still developing in others, backed by a team moving faster than any technology before it.

The confusion mostly goes away. The precision comes from knowing which zone you're in.
