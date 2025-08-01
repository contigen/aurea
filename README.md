# Aurea — Taste-Driven Audience Intelligence

**Aurea** is a taste-powered, privacy-first audience discovery tool for indie creators, niche brands, and cultural products.  
Built for the [Qloo LLM Hackathon](https://qloo.devpost.com/), Aurea combines the power of **LLMs** with **Qloo’s Taste AI™ API** to help you find your ideal audience

## What it does?

Input your brand's _tone_, _inspiration_, or _vibe_ — and Aurea builds personas and a complete **Launch Pack**

- Lazy loaded dynamic icon from Lucide react via an LLM
- Generate personas' images via Gemini 2.0 flash preview image generation model
- Upload image to Pinata cloud
- Generate personas via Gemini using the entity endpoint as the data source
- Generate launchpacks

All powered with **zero personal data.**

## Key Features

| Feature                       | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| **Taste-Inspired Onboarding** | Describe your brand’s tone, inspirations, and cultural DNA            |
| **Cultural Audience Mapping** | Discover who aligns with your brand based on taste — not demographics |

---

## Example Use Case

> `"I’m launching a slow fashion line inspired by Phoebe Bridgers, Nordic noir, and French arthouse cinema."`

**Aurea Returns**:

- Cultural personas: `Dark academia`, `Indie film lovers`, `Post-rock fans`
- Platforms: `Tumblr`, `Substack`, `Pinterest`, `r/malefashion`
- Copy: `"Clothes for the quiet storm inside you."`
- Launch Pack with tone & hashtags
- Moodboard: Futute Update

---

## 🏗️ Technologies

- `Next.js App Router (TypeScript)`
- Gemini via Vercel AI SDK
- `TailwindCSS + Shadcn UI` – for elegant, responsive frontend
- Zod for AI structured output
- `Vercel` – for deployment

---

## 🚀 Getting Started

```bash
git clone https://github.com/contigen/aurea
cd aurea

# Add your Qloo API, + Gemini, Pinata IPFS API keys
bun install
bun run dev
```
