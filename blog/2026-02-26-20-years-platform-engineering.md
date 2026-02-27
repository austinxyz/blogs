---
title: "20 Years of Platform Engineering: Lessons from Building Cloud at Scale"
date: 2026-02-26
authors: [austin]
tags: [cloud-computing, kubernetes, career-development, leadership]
description: "Reflections on two decades building cloud platforms, from VMware to Kubernetes, and lessons learned along the way."
---

Looking back at 20 years in platform engineering feels both humbling and exhilarating. From building RAD tools for web applications in 2000 to managing Kubernetes clusters with 2 million pods today, the journey has been one of continuous learning, adaptation, and growth. This is my story of building platforms at scale, and the lessons I've learned along the way.

<!--truncate-->

## The Journey Begins: 2000-2007

I started my career in 2000 at Mainet System Inc. in Shanghai, fresh out of graduate school from Zhejiang University. The dot-com boom was in full swing, and enterprises were just beginning to understand the power of web-based applications.

As a Project Manager and Architect, I worked on building RAD (Rapid Application Development) tools that would help developers build web applications faster. We used Spring, Hibernate, and Struts—technologies that were cutting-edge at the time. Our team developed web-based ERP products including CRM, HRM, and CMS systems for over 40 enterprise customers.

One of my proudest achievements during this period was building and scaling R&D teams across three cities—Shanghai, Shenzhen, and Qingdao—eventually growing to 50+ developers. I learned early on that great platforms aren't just about technology; they're about building great teams.

## Joining eBay: The DevEx Revolution (2007-2012)

In 2007, I made a pivotal career move to eBay China. I was tasked with building the Platform Development Experience Tools team from the ground up. Our mission was simple but ambitious: improve productivity for eBay's 2,000+ developers.

We built Raptor IDE, optimized eBay's development environment, and created wizards for frontend, service, and database frameworks. The impact was immediate and measurable. What used to take developers days could now be done in hours. We also developed eBay APIs and SDKs for third-party developers, expanding the platform's reach beyond internal teams.

This experience taught me a fundamental lesson: **Developer Experience is Everything**. A platform is only as good as the experience it provides to its users. If developers struggle with your tools, they won't adopt them, no matter how technically sophisticated they are.

## The Cloud Transformation: Three Generations (2012-2017)

In 2012, I took on a new challenge as Software Development Manager for Cloud at eBay's China Center of Excellence. This marked the beginning of my deep dive into cloud infrastructure.

Leading a team of 20 engineers, we architected and delivered eBay's internal cloud platforms, covering both IaaS and PaaS. This was the era of private cloud, and we went through three distinct generations of infrastructure:

### Generation 1: VMware
We started with VMware-based virtualization. It worked, but provisioning a new environment took days, sometimes weeks. The manual processes were a bottleneck.

### Generation 2: OpenStack
We then built our own OpenStack-based cloud. I designed a MongoDB-based Configuration Management System (CMS) that became the backbone of our infrastructure. We also built Zebra, a fully automated provisioning system that reduced provisioning time from days to just 10 minutes.

This was a game-changer. Developers could now get environments on-demand, and our infrastructure team could focus on innovation rather than manual toil.

### Generation 3: Kubernetes
By 2015-2016, we saw the writing on the wall. Containers and Kubernetes were the future. We started planning our migration to what would become eBay's container platform—Tess.

During this period, I also drove eBay China's Innovation Program, and we won multiple Skunkworks awards. The lesson here: **Start Simple, Then Scale**. Each generation of our platform built on the lessons of the previous one.

## Kubernetes at Scale: The Migration Years (2017-2023)

In 2017, I returned to San Jose to lead the Cloud App Lifecycle team. Our mission was massive: migrate 5,000+ applications from OpenStack to Kubernetes, with zero downtime.

This was platform engineering at its most challenging. We were running:
- Applications across multiple regions and 25 availability zones
- 100+ Kubernetes clusters
- 2 million+ pods in production
- 35,000+ deployments per week across 20,000+ app pools

### Building the Platform

We developed an end-to-end CI/CD platform using Tekton pipelines. We built an auto-deployment platform that could handle the massive scale of eBay's deployments. And critically, we built a self-healing remediation system called LOM (Lifecycle Operations Manager) that used observability signals to detect and fix issues automatically.

### The Regional Migration

One of the most challenging projects was the regional data center migration—exiting PHX and launching RENO—with zero downtime. This required meticulous planning, automation, and coordination across dozens of teams. The fact that we pulled it off without impacting customers remains one of my proudest achievements.

The key lesson: **Automate Everything You Can**. At this scale, manual processes don't work. Automation isn't just a nice-to-have; it's essential for survival.

## Leading Cloud Fleet: The Present (2023-Present)

In 2023, I took on my current role as Software Development Manager for Cloud Fleet Management. This role has been about taking everything we learned and scaling it globally.

### Global Expansion

We established engineering hubs in Europe and India, hiring 8+ engineers and building truly distributed teams. Managing global teams across time zones requires different skills than managing co-located teams, but the diversity of perspectives and round-the-clock coverage has been invaluable.

### Innovation Programs

We participated in the DoJ and Jade programs, accelerating the stand-up of new availability zones and clusters. We've expanded eBay's Kubernetes infrastructure to 3 regions, 25 AZs, and continue to scale.

### AI-Powered Engineering

Perhaps most exciting has been our exploration of AI in platform engineering. We've built 6+ Claude-based hiring skills and piloted spec-driven development. AI isn't replacing engineers—it's making us more productive and allowing us to focus on higher-level problems.

The lesson: **Embrace Change and Innovation**. The technologies that got us here won't get us where we need to go next.

## Five Key Lessons from 20 Years

Looking back, here are the most important lessons I've learned:

### 1. Developer Experience is Everything
Your platform's success depends on how well it serves developers. Invest in tools, documentation, and support. Make the easy things easy and the hard things possible.

### 2. Start Simple, Then Scale
Don't over-engineer from day one. Build what you need now, but architect for future scale. Each iteration should be better than the last.

### 3. Automate Everything You Can
At scale, manual processes break down. Automation isn't just about efficiency—it's about reliability and consistency.

### 4. Embrace Change
The technology landscape changes rapidly. What's cutting-edge today will be legacy tomorrow. Stay curious, keep learning, and don't be afraid to reinvent your platform when needed.

### 5. Build Great Teams
Technology is important, but people are more important. Hire well, mentor generously, and create an environment where engineers can do their best work. The best platforms are built by the best teams.

## What's Next?

After 20 years, I'm more excited about platform engineering than ever. The next frontiers include:

- **AI-Native Platforms**: How do we build platforms that leverage AI to self-optimize, self-heal, and even self-evolve?
- **Multi-Cloud Orchestration**: As organizations adopt multi-cloud strategies, the complexity of orchestration will increase. How do we abstract this complexity while maintaining flexibility?
- **Sustainability**: As platforms grow, so does their environmental impact. How do we build efficient, sustainable platforms that minimize waste?
- **Developer Productivity**: With AI assistance, what will developer workflows look like? How do platforms need to evolve to support AI-augmented development?

## Closing Thoughts

Twenty years ago, I couldn't have imagined managing Kubernetes clusters with 2 million pods. Twenty years from now, today's cutting-edge will seem quaint. That's what makes this field so exciting.

To those starting their careers in platform engineering: embrace the journey. Learn the fundamentals, stay curious, invest in people, and don't be afraid to reinvent yourself every few years. The platforms you build will enable thousands of developers to create amazing things.

And that's what it's all about—building the foundation that empowers others to build the future.

---

*What has your experience been with platform engineering? What lessons have you learned? I'd love to hear your thoughts in the comments below.*
