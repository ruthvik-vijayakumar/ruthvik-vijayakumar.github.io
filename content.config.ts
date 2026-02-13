import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

/** Attachment entry for portfolio items */
const attachmentSchema = z.object({
  url: z.string(),
  label: z.string().optional(),
  icon: z.string().optional(),
});

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/**",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.union([z.string(), z.date()]).optional(),
        image: z.string().optional(),
      }),
    }),
    experience: defineCollection({
      type: "page",
      source: "experience/**",
      schema: z.object({
        company: z.string(),
        link: z.string().optional(),
        external_links: z.array(z.string()).optional(),
        role: z.string(),
        start_date: z.union([z.string(), z.date()]).optional(),
        end_date: z.union([z.string(), z.date()]).optional(),
        skills: z.array(z.string()).optional(),
      }),
    }),
    portfolio: defineCollection({
      type: "page",
      source: "portfolio/**",
      schema: z.object({
        title: z.string(),
        link: z.string().optional(),
        gh_link: z.string().optional(),
        date: z.union([z.string(), z.date()]).optional(),
        type: z.enum(["project", "case_study"]).optional(),
        visible: z.boolean().optional(),
        tools_tech: z.array(z.string()).optional(),
        attachments: z.array(attachmentSchema).optional(),
      }),
    }),
    publications: defineCollection({
      type: "page",
      source: "publications/**",
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.union([z.string(), z.date()]).optional(),
        link: z.string().optional(),
      }),
    }),
  },
});
