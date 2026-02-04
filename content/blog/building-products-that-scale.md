---
title: "Building products that scale"
description: "A few principles I've learned from shipping across AdTech, EdTech, and startups."
date: "2025-01-20"
---

When you're building something new, it helps to separate what *scales* from what doesn't. Here’s a short take with concrete examples.

![Team and whiteboard](https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80)

## What actually scales

- **Clear problem and audience** – If you can’t say who it’s for and what pain it solves in one sentence, you’ll keep changing scope.
- **Simple data model** – Fancy schemas are tempting; start with the smallest model that supports the core flow.
- **Automation over manual steps** – Every manual step will break at 10x. Automate early where it matters.

For more on product thinking, [Lenny’s Newsletter](https://www.lennysnewsletter.com/) and [Reforge](https://www.reforge.com/) are good places to go deeper.

## Picking the stack

Rough comparison I keep in mind when starting something new:

| Need              | Prefer                    | Avoid (until you need it)   |
|-------------------|---------------------------|-----------------------------|
| Backend           | Supabase, Edge functions  | Custom servers, k8s          |
| Frontend          | Vue/React + Tailwind      | Heavy design systems        |
| AI / search       | GPT, embeddings, RAG      | Custom models, fine-tuning  |
| Auth & payments   | Built-in (Supabase, Stripe)| DIY auth, custom billing    |

Start with the “Prefer” column; move right only when you hit real limits. I used this kind of filter when choosing the stack for [NabuAI](https://nabuai.me).

## One rule

> Ship the smallest version that delivers the core value. Add scale and polish after people use it.

Two more posts on shipping and on NabuAI are coming next.
