import type { Question, Project, Skill, Stat } from '@/types'

export const questions: Question[] = [
  {
    id: 'budget',
    text: {
      en: 'Do you have a budget?',
      tr: 'Bütçen belli mi?',
    },
    options: [
      {
        label: { en: 'Yes, I do', tr: 'Evet' },
        value: 'yes',
        isPositive: true,
      },
      {
        label: { en: 'Not yet', tr: 'Henüz değil' },
        value: 'no',
        isPositive: false,
        message: { en: 'Maybe another time', tr: 'Belki başka zaman' },
      },
    ],
  },
  {
    id: 'scope',
    text: {
      en: 'Do you know what you want?',
      tr: 'Ne istediğini biliyor musun?',
    },
    options: [
      {
        label: { en: 'Yes, I do', tr: 'Evet' },
        value: 'yes',
        isPositive: true,
      },
      {
        label: { en: "Let's figure it out", tr: 'Birlikte çözeriz' },
        value: 'figureout',
        isPositive: true,
      },
    ],
  },
  {
    id: 'deadline',
    text: {
      en: 'Do you have a deadline?',
      tr: 'Deadline var mı?',
    },
    options: [
      {
        label: { en: 'Yes', tr: 'Evet' },
        value: 'yes',
        isPositive: true,
      },
      {
        label: { en: 'Flexible', tr: 'Esnek' },
        value: 'flexible',
        isPositive: true,
      },
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'upwork-freelance',
    title: 'Upwork Freelance',
    description: {
      en: '8+ completed projects with 100% Job Success Score and Top Rated status. Specialized in full-stack web development, AI integration, and complex business applications.',
      tr: '8+ tamamlanmış proje, %100 İş Başarı Puanı ve Top Rated statüsü. Full-stack web geliştirme, AI entegrasyonu ve karmaşık iş uygulamalarında uzmanlaşmış.',
    },
    tags: ['100% Job Success', 'Top Rated', '8+ Projects', '$2,300+ Earned'],
    link: 'https://www.upwork.com/freelancers/~016544c646cef66bec',
    images: ['/projects/upwork-logo.png'],
  },
  {
    id: 'neoone-chatbot',
    title: 'NeoOne AI Chatbot',
    description: {
      en: 'RAG-powered AI chatbot for business document analysis. Built with Python, FastAPI, and React. Enables companies to query their internal documents using natural language.',
      tr: 'İş belgeleri için RAG destekli AI chatbot. Python, FastAPI ve React ile geliştirildi. Şirketlerin dahili belgelerini doğal dil kullanarak sorgulamasını sağlar.',
    },
    tags: ['Python', 'FastAPI', 'React', 'AI', 'RAG', 'Claude API'],
    images: ['/projects/neoone-logo.svg'],
  },
  {
    id: 'inspection-system',
    title: 'Home Inspection System',
    description: {
      en: 'Complete inspection report system with image annotation, interactive checklists, and automated PDF generation. Used by real estate professionals.',
      tr: 'Görsel açıklama, interaktif kontrol listeleri ve otomatik PDF oluşturma ile tam teşekküllü muayene rapor sistemi. Emlak profesyonelleri tarafından kullanılıyor.',
    },
    tags: ['Next.js', 'TypeScript', 'PDF Generation', 'Canvas', 'Supabase'],
    images: ['/projects/inspection-1.png', '/projects/inspection-2.png', '/projects/inspection-3.png'],
  },
  {
    id: 'duygu-evreni',
    title: 'Duygu Evreni',
    description: {
      en: '3D anonymous emotion sharing platform. Users share their emotions as glowing stars orbiting planets in an interactive 3D space.',
      tr: '3D anonim duygu paylaşım platformu. Kullanıcılar duygularını interaktif 3D uzayda gezegenlerin etrafında dönen parlayan yıldızlar olarak paylaşıyor.',
    },
    tags: ['Three.js', 'React Three Fiber', 'Next.js', 'Supabase', 'WebGL'],
    link: 'https://duyguevreni.com',
    images: ['/projects/duygu-evreni-1.png'],
  },
]

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend', level: 90 },
  { name: 'Next.js', category: 'frontend', level: 85 },
  { name: 'TypeScript', category: 'frontend', level: 85 },
  { name: 'Three.js', category: 'frontend', level: 75 },
  { name: 'Tailwind CSS', category: 'frontend', level: 90 },
  { name: 'Framer Motion', category: 'frontend', level: 80 },
  // Backend
  { name: 'Node.js', category: 'backend', level: 80 },
  { name: 'Python', category: 'backend', level: 75 },
  { name: 'FastAPI', category: 'backend', level: 70 },
  // Database
  { name: 'Supabase', category: 'database', level: 85 },
  { name: 'PostgreSQL', category: 'database', level: 75 },
  { name: 'Prisma', category: 'database', level: 80 },
  // AI
  { name: 'Claude API', category: 'ai', level: 90 },
  { name: 'OpenAI API', category: 'ai', level: 85 },
  { name: 'RAG Systems', category: 'ai', level: 80 },
  // Tools
  { name: 'Git', category: 'tools', level: 85 },
  { name: 'Vercel', category: 'tools', level: 90 },
  { name: 'Figma', category: 'tools', level: 70 },
]

export const stats: Stat[] = [
  {
    value: '8+',
    label: { en: 'Projects', tr: 'Proje' },
  },
  {
    value: '100%',
    label: { en: 'Success Rate', tr: 'Başarı' },
  },
  {
    value: '⭐',
    label: { en: 'Top Rated', tr: 'Top Rated' },
  },
]

export const links = {
  upwork: 'https://www.upwork.com/freelancers/~016544c646cef66bec',
  email: 'mailto:kemalyavaass@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kemalyavaas/',
  github: 'https://github.com/Kemalyavas',
  phone: 'tel:+905549690011',
}
