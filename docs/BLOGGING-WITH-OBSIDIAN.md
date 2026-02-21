# Blogging with Obsidian

Your site uses **Nuxt Content** with markdown in `content/blog/`. Each file’s path becomes the URL: `content/blog/my-post.md` → `/blog/my-post`.

## Recommended setup

### 1. Use the repo as your vault (or a subfolder)

- **Option A:** Open the whole repo as the Obsidian vault. You edit `content/blog/*.md` directly.
- **Option B:** Use **Obsidian Git** (or your existing GitHub Sync) so edits in Obsidian are committed and pushed; your host (e.g. GitHub Pages) builds from the same repo.

### 2. New post in Obsidian

1. Create a new note in `content/blog/`.
2. **Filename = URL slug:** e.g. `my-new-post.md` → `/blog/my-new-post`. Use lowercase, hyphens, no spaces.
3. Use the **Blog post** template (folder `Templates/Blog post.md`) so frontmatter matches the site:
   - `title` (required)
   - `description` (optional, used in listing and SEO)
   - `image` (optional, path from site root, e.g. `/my-image.png` → put file in `public/`)
   - `date` (optional, ISO or `"YYYY-MM-DD"`)

4. Write the body in standard markdown. Headings (h2, h3, h4) appear in the post’s “On this page” TOC.

### 3. Images

- Put images in `public/` (e.g. `public/my-photo.png`).
- In frontmatter: `image: /my-photo.png`.

### 4. Optional: Template folder in Obsidian

1. **Settings → Core plugins → Templates:** turn on **Templates**.
2. **Settings → Templates:** set “Template folder location” to `Templates` (the one in this repo).
3. For a new post: create note in `content/blog/`, then **Insert template → Blog post**.

### 5. Optional: Quick switcher

- Use **Quick switcher** (Ctrl/Cmd + P) and type the filename to jump to a post under `content/blog/`.

## Frontmatter reference (blog)

| Field         | Required | Example / notes                          |
|---------------|----------|------------------------------------------|
| `title`       | Yes      | `My post title`                          |
| `description` | No       | Short summary for listing and SEO        |
| `date`        | No       | `"2025-01-15"` or full ISO              |
| `image`       | No       | `/filename.png` (file in `public/`)     |

Posts are ordered **newest first** on `/blog`; the card shows **month + year** from `date`.
