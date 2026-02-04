---
title: "Lessons from shipping NabuAI"
description: "What worked and what didn’t when building an AI-powered knowledge base."
date: "2025-01-22"
---

We’ve been building [NabuAI](https://nabuai.me) – an AI-powered knowledge management tool for researchers and knowledge workers. Here are a few lessons from the first months.

![Laptop and notes](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80)

## 1. RAG before custom models

We tried to get fancy with custom embeddings and fine-tuning early. It slowed us down and didn’t move the needle for our early users. Switching to a simple **GraphRAG**-style pipeline (chunk → embed → retrieve → generate) gave us:

- Faster iteration
- Good enough quality for v1
- Room to improve retrieval and prompts without changing the whole stack

So: **get RAG right first**, then consider custom models only when you have clear, measurable gaps.

## 2. Where time actually went

Rough breakdown of where engineering time went in the first 3 months:

| Area              | % of time | Note                          |
|-------------------|-----------|-------------------------------|
| Retrieval & RAG   | ~35%      | Chunking, embeddings, ranking |
| UI & workflows    | ~30%      | Capture, organize, query      |
| Integrations      | ~20%      | Chrome extension, APIs        |
| Infra & ops       | ~15%      | Supabase, Postgres, deploy    |

Integrations and UI took more than we’d guessed; infra stayed manageable thanks to [Supabase](https://supabase.com) and [Vercel](https://vercel.com).

## 3. Links we leaned on

- [LlamaIndex docs](https://docs.llamaindex.ai/) – for RAG patterns and graph-based retrieval
- [Vue 3 + TypeScript](https://vuejs.org/) – for the frontend
- [Tailwind CSS](https://tailwindcss.com/) – for layout and theming

## 4. One code decision that helped

We kept “sources” for every answer in a simple table and exposed them in the UI from day one:

```text
answer_sources: [ document_id, chunk_id, score ]
```

That made it easy to show “from which note this came” and to debug bad answers. Small schema choice, big product and debugging win.

---

More posts on GraphRAG, the Chrome extension, and our stack choices are planned. If you’re building something similar, [say hi](https://twitter.com/coderuth).
