This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Project Structure
DevConnect/
├── app/
│ ├── (auth)/
│ │ ├── login/
│ │ │ └── page.tsx
│ │ ├── register/
│ │ │ └── page.tsx
│ │ └── layout.tsx
│ ├── (dashboard)/
│ │ ├── profile/
│ │ │ └── page.tsx
│ │ ├── projects/
│ │ │ ├── [id]/
│ │ │ │ └── page.tsx
│ │ │ ├── create/
│ │ │ │ └── page.tsx
│ │ │ └── page.tsx
│ │ ├── blog/
│ │ │ ├── [slug]/
│ │ │ │ └── page.tsx
│ │ │ ├── create/
│ │ │ │ └── page.tsx
│ │ │ └── page.tsx
│ │ ├── forum/
│ │ │ ├── [id]/
│ │ │ │ └── page.tsx
│ │ │ └── page.tsx
│ │ ├── chat/
│ │ │ └── page.tsx
│ │ ├── jobs/
│ │ │ └── page.tsx
│ │ └── layout.tsx
│ ├── api/
│ │ ├── auth/
│ │ │ └── [...nextauth]/
│ │ │ └── route.ts
│ │ ├── projects/
│ │ │ └── route.ts
│ │ ├── blog/
│ │ │ └── route.ts
│ │ ├── forum/
│ │ │ └── route.ts
│ │ ├── chat/
│ │ │ └── route.ts
│ │ └── jobs/
│ │ └── route.ts
│ ├── layout.tsx
│ ├── page.tsx
│ └── globals.css
├── components/
│ ├── layout/
│ │ ├── Header.tsx
│ │ ├── Footer.tsx
│ │ └── Sidebar.tsx
│ ├── auth/
│ │ ├── LoginForm.tsx
│ │ └── RegisterForm.tsx
│ ├── profile/
│ │ ├── ProfileCard.tsx
│ │ └── SkillTags.tsx
│ ├── projects/
│ │ ├── ProjectCard.tsx
│ │ ├── ProjectForm.tsx
│ │ └── ProjectGallery.tsx
│ ├── blog/
│ │ ├── BlogPost.tsx
│ │ ├── BlogForm.tsx
│ │ └── CommentSection.tsx
│ ├── forum/
│ │ ├── ForumPost.tsx
│ │ └── ForumReply.tsx
│ ├── chat/
│ │ ├── ChatWindow.tsx
│ │ └── MessageBubble.tsx
│ ├── jobs/
│ │ ├── JobCard.tsx
│ │ └── JobForm.tsx
│ └── ui/
│ ├── Button.tsx
│ ├── Input.tsx
│ ├── Modal.tsx
│ └── ... (other UI components)
├── lib/
│ ├── prisma.ts
│ ├── auth.ts
│ └── api.ts
├── hooks/
│ ├── useUser.ts
│ ├── useProjects.ts
│ ├── useBlog.ts
│ └── useChat.ts
├── context/
│ └── AppContext.tsx
├── types/
│ ├── user.ts
│ ├── project.ts
│ ├── blog.ts
│ └── job.ts
├── utils/
│ ├── formatDate.ts
│ └── validation.ts
├── public/
│ ├── images/
│ └── fonts/
├── styles/
│ └── tailwind.css
├── prisma/
│ └── schema.prisma
├── middleware.ts
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
