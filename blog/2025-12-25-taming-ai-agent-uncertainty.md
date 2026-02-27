---
title: "Taming AI Agent Uncertainty: What Resume Screening Taught Me About Reliability"
date: 2025-12-25
authors: [austin]
tags: [ai, agents, machine-learning, best-practices, reliability]
description: "Building reliable AI agents by applying HR best practices to manage uncertainty. Lessons learned from developing a resume screening agent with inconsistent scoring."
---

Same resume. Same job description. Two different scores: 78/100, then 68/100.

I had built a `resume-jd-matcher` agent to automate candidate screening. On a whim, I ran the same resume through it twice. The inconsistency wasn't just frustrating—it was dangerous. How could I trust hiring decisions based on unpredictable evaluations? How could I ensure fairness to candidates when the same resume might score differently depending on when it was assessed?

**The core challenge:** AI agents complete tasks differently than traditional programs. They're probabilistic, not deterministic. The same input can produce different outputs due to sampling and contextual variations. In many ways, AI behaves more like human judgment than code execution.

<!--truncate-->

## The Familiar Problem

This challenge felt strangely familiar. Human hiring managers face the exact same issues:

- Reviewing the same resume today versus tomorrow might yield different impressions
- Different interviewers have inconsistent opinions about the same candidate
- It's hard to quantify what "good enough" actually means

But HR has spent decades developing best practices to manage subjectivity. Could we apply these same principles to AI agents?

> **What if the solution to AI uncertainty already exists in how we handle human uncertainty?**

---

## How Humans Ensure Objectivity

When designing fair evaluation systems, HR professionals use several proven strategies:

### 1. **Process Decomposition**
Break the judgment process into multiple steps. For deterministic steps, use programmatic checks (e.g., "Does the candidate have a bachelor's degree?" → Yes/No). For subjective steps, provide clear criteria.

### 2. **Detailed Scoring Rubrics**
Instead of vague assessments ("strong candidate"), use quantified scoring with explicit formulas:
- 3 years experience = 8 points
- 4 years experience = 9 points
- 5+ years experience = 10 points

### 3. **Review and Consistency Checks**
Compare assessments to identify inconsistencies. Flag outliers for re-review.

### 4. **Multi-Reviewer Validation**
Have multiple people evaluate the same candidate. Aggregate their independent judgments.

### 5. **Reference Benchmarks**
Provide calibration examples: "This is what a 90/100 candidate looks like. This is 70/100."

### 6. **Feedback Loops**
Track false positives and negatives. Update criteria based on actual outcomes.

These aren't theoretical—they're battle-tested practices that make human evaluation systems work.

---

## Translating HR Principles to AI Agents

Here's how I adapted each HR best practice for my AI agent system:

### 1. **Process Decomposition → Workflows + Script/MCP**

**Agents naturally support workflows:** Break evaluation into stages (information extraction → evidence categorization → score calculation).

**Deterministic parts → Tools:** For programmatic checks (e.g., calculating years of experience), use Script or MCP tools instead of LLM reasoning. This removes uncertainty from parts of the process that should be deterministic.

```python
# Instead of asking the AI to "estimate years of experience"
# Use a deterministic function:
def calculate_years_of_experience(resume_data):
    experiences = resume_data['work_history']
    total_months = sum(exp['duration_months'] for exp in experiences)
    return total_months / 12
```

### 2. **Detailed Scoring Rubrics → Explicit Formulas in Prompts**

I created a `scoring-rubric.md` that provides precise formulas for each category:

```markdown
## Years of Experience (10 points)

if relevant_years >= 5:
    score = 10 points
elif relevant_years >= 3:
    score = 8 + (years - 3) × 1 point
elif relevant_years >= 2:
    score = 6 points
else:
    score = (relevant_years / 2) × 6 points

**Evidence required:** Extract specific job titles, dates, and responsibilities
**Round down when uncertain:** If dates are ambiguous, use the lower estimate
```

This eliminates ambiguity. Instead of "evaluate experience level," the agent now has clear mathematical guidance.

### 3. **Review and Consistency → Calibration Checks**

I added a calibration step to the agent prompt:

```markdown
**Calibration Check**
- Most similar to: [Reference Example A/B/C/D]
- Score differential: [Higher/Lower than reference by X points]
- Justification: [If differential >10 points, explain why]
```

The agent must compare every evaluation against benchmark cases and provide reasoning for deviations.

### 4. **Multi-Reviewer → Multi-Agent Validation**

Run the same resume through multiple agent configurations:
- Agent A (Conservative): Strict standards
- Agent B (Balanced): Standard criteria
- Agent C (Optimistic): Values potential more

If scores diverge by >10 points, flag for human review.

### 5. **Reference Benchmarks → Example Resume Library**

I created `reference-resumes.md` with 4 calibration examples:

```markdown
**Example A: 92/100 (Strong Recommend)**
- Profile: Deep kernel expert with 6 years experience
- Key strengths: Led performance optimization team, 15+ merged patches to Linux kernel
- Why 92: Exceeds requirements on technical depth and leadership

**Example B: 76/100 (Recommend with Reservations)**
- Profile: Strong K8s background but weaker kernel depth
- Key strengths: Scaled infrastructure to 10K nodes
- Why 76: Meets most requirements but lacks low-level systems experience

**Example C: 58/100 (Maybe)**
- Profile: Application developer transitioning to infrastructure
- Key strengths: Fast learner, some container experience
- Why 58: Has potential but significant skill gaps

**Example D: 32/100 (Do Not Recommend)**
- Profile: IT support with no programming experience
- Why 32: Fundamental skill mismatch
```

These anchors help the agent understand what different score ranges represent.

### 6. **Feedback Loops → Miss Tracking**

After interviews, I log outcomes:

```markdown
**Interview Outcome Log**

Candidate: John Doe
Resume Score: 82/100
Interview Result: Rejected (failed system design)

Root Cause Analysis:
- Agent scored Kubernetes experience as 17/20
- Candidate only knew basic kubectl commands
- Discrepancy: Agent gave "knows kubectl" 8/10, should be 3-4/10

Action: Updated rubric with concrete skill level definitions
```

---

## The Results: Before vs. After

### Original Agent
- **Prompt:** Generic instructions ("Evaluate candidate fit for this role")
- **Scoring:** Subjective match levels (Strong/Partial/Weak)
- **Output:** Narrative assessment
- **Consistency:** ±10 point variance on same resume

### Improved Agent
- **Prompt:** Explicit workflow with forced rubric reading
- **Scoring:** Quantified formulas across 7 categories (Education, Experience, Kernel/Linux, Programming, Kubernetes, Domain Experience, Leadership)
- **Output:** Tabular breakdown with evidence citations
- **Consistency:** ±4 point variance (60% improvement)

### Quantified Impact

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Score Variance | ±10 pts | ±4 pts | 60% reduction |
| Explainability | Narrative | Table + Evidence | Qualitative leap |
| Calibration | None | 4 reference cases | N/A |
| Conservative Scoring | No | Yes (round down when uncertain) | Fewer false positives |

> **Key insight:** The variance didn't disappear—it's inherent to AI. But by applying HR principles, I made it predictable and manageable.

---

## The Production Safety Question

This raises a critical question for any business team deploying agents: **If AI agent behavior is unpredictable, is it dangerous to use them in production environments where mistakes could cause irreversible damage?**

Wrong changes to production systems can cascade into outages, data loss, or security breaches. We need additional safeguards.

### Making AI Agents Production-Safe

The same core principles apply, plus extra guardrails:

#### 1. **Same Core Principles**
- **Process decomposition:** Separate deterministic work (via Skills/MCP using programmatic checks) from AI decisions
- **Validation and rollback steps:** Every change must have a validation phase and rollback plan
- **Error tracking:** Log past mistakes in agent prompts to prevent repetition

#### 2. **Additional Production Safeguards**

**a) AI Plans, Humans Execute**

The AI agent generates implementation plans, tests them in staging, but humans approve and execute production changes.

```markdown
Example Workflow:

Agent: "Here's the migration plan for upgrading the system..."
[Agent runs plan in test cluster]
Agent: "Tests passed. Here's the production runbook."
Human: [Reviews, approves, executes production change]
```

**b) Deterministic Code Generation**

For programmatic tasks with clear specs, use AI for "vibe coding":
1. AI writes code
2. Tests validate correctness
3. Code review ensures quality
4. Code executes deterministically in production

The uncertainty is in the creative phase (writing), not the execution phase (running).

**c) Leverage AI's Documentation Advantage**

AI excels at documentation. Use it to:
- Generate detailed runbooks for every operation
- Automatically maintain changelogs
- Create post-mortems from incident data

This preserves institutional knowledge and enables auditability.

**d) Keep Humans in the Loop**

AI is co-pilot, not autopilot:
- **Human-driven:** Humans initiate and guide workflows
- **Critical step approvals:** Dangerous operations require human confirmation
- **Human review:** Humans review documentation and provide feedback
- **Continuous improvement:** Feedback loops from human oversight improve agent behavior

**Key safety properties:**
- Deterministic checks (compatibility, health) use programmatic tools
- AI handles planning and documentation (non-destructive)
- Humans approve each phase transition
- Automatic rollback on health check failure

---

## Best Practices for AI Agent Development

Based on this experience, here are my guidelines for building reliable AI agents:

### For Non-Destructive Tasks (e.g., Resume Screening)

**1. Quantify Everything**
- Replace subjective assessments with numerical scores
- Provide explicit formulas and thresholds
- Cite evidence for every claim

**2. Provide Reference Anchors**
- Include calibration examples in prompts
- Define what "excellent" vs. "poor" looks like
- Force agents to compare outputs against benchmarks

**3. Enforce Consistency Checks**
- Build calibration steps into workflows
- Flag large deviations for review
- Track variance over time

**4. Default to Conservative**
- When uncertain, round scores down
- Prefer false negatives over false positives
- Explicitly acknowledge uncertainty

### For Destructive/Production-Impacting Tasks

**5. Separate Planning from Execution**
- AI generates plans and tests them
- Humans approve and execute critical changes
- Clear separation of concerns

**6. Automate Validation**
- Every change has programmatic health checks
- Automatic rollback on failure
- No AI decision is final without verification

**7. Document Everything**
- AI generates runbooks for every operation
- Changelogs are automatic and detailed
- Post-mortems include AI decision reasoning

**8. Human Oversight is Mandatory**
- Dangerous operations require explicit approval
- Humans review all AI-generated documentation
- Feedback loops: humans correct AI mistakes

**9. Fail-Safe Defaults**
- AI defaults to no-op when uncertain
- Irreversible operations require explicit confirmation
- Graceful degradation: fall back to manual processes

---

## A Call for Community Input

These are initial best practices based on one use case (resume screening) and considerations for production systems. I'm sharing them to start a conversation, not to claim they're complete.

> **These are starting points, not final answers.**

**I invite you to contribute your experience:**

- Have you built AI agents with consistency challenges?
- What techniques have you used to ensure reliability?
- What additional safeguards should we consider for production environments?
- Where do you see these principles falling short?

The field of AI agent reliability is still emerging. The more we share concrete experiences—both successes and failures—the faster we'll develop robust practices.

---

## Discussion

What challenges have you faced with AI agent consistency? Share your experiences and recommendations in the comments. Let's build a knowledge base together.

---

*If you found this useful, consider sharing it with your team. The conversation around AI reliability benefits from diverse perspectives across different domains and use cases.*
