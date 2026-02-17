---
title: "Better Together - Local Commerce Discovery for Communities"
link: "#"
date: 2024-07-12
type: project
visible: true
tools_tech:
  ["Vue.js", "Tailwind CSS", "Pinia", "Supabase", "Square API", "Mapbox GL", "Fastify", "Handlebars", "Deno", "Edge Functions"]
---
Better Together is a local commerce discovery platform that connects consumers with merchants, deals, and activities in their neighborhood. The consumer-facing app lets users browse curated deals with budget and category filters, explore local merchants through an interactive map or list view, watch Instagram-style spotlight stories with booking CTAs, and complete bookings with integrated payment processing. A dedicated seller dashboard enables merchants to authenticate via Square OAuth, sync their catalog (items, categories, pricing) into the platform, and manage cross-merchant partnerships. The backend leverages Supabase Edge Functions for the OAuth authorization flow with CSRF protection and a PostgreSQL data layer modeling deals, merchants, offers, stories, and catalog items with relational mappings.
