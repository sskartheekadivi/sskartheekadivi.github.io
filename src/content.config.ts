import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const commonSchema = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()),
    img: z.string(),
    img_alt: z.string().optional(),
  }),
});

const resumeSchema = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    email: z.string(),
    phone: z.string(),
    linkedin: z.string(),
    website: z.string(),
    location: z.string(),
    skills: z.object({
      languages: z.array(z.string()),
      embedded: z.array(z.string()),
      hardware: z.array(z.string()),
      tools: z.array(z.string()),
    }),
    experience: z.array(z.object({
      role: z.string(),
      company: z.string(),
      location: z.string(),
      dates: z.string(),
      details: z.array(z.string()),
    })),
    education: z.array(z.object({
      degree: z.string(),
      school: z.string(),
      dates: z.string(),
    })),
    certifications: z.array(z.object({
        title: z.string(),
        issuer: z.string().optional(),
        date: z.string().optional(),
        url: z.string().optional(),
    })),
    talks: z.array(z.object({
        title: z.string(),
        conference: z.string().optional(),
        date: z.string().optional(),
        url: z.string().optional(),
    })),
    awards: z.array(z.object({
        title: z.string(),
        issuer: z.string().optional(),
        date: z.string().optional(),
        description: z.string().optional(),
    })),
  }),
});

export const collections = {
  blogs: commonSchema,
  projects: commonSchema,
  resume: resumeSchema,
};
