import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import matter from 'gray-matter';
import { ArrowUpRight, BookOpen, CalendarDays, Sparkles, User } from 'lucide-react';

export const metadata = {
  title: 'Blog - Airaz Khan',
  description: 'Articles on full-stack development, AI tools, React, Next.js, and modern web engineering.',
};

function getBlogs() {
  const contentDir = path.join(process.cwd(), 'content');
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.md'));

  return files
    .map((file) => {
      const fileContent = fs.readFileSync(path.join(contentDir, file), 'utf-8');
      const { data, content } = matter(fileContent);
      const wordCount = content.split(/\s+/).filter(Boolean).length;

      return {
        title: data.title,
        slug: data.slug || file.replace(/\.md$/, ''),
        description: data.description,
        date: data.date,
        author: data.author || 'Airaz Khan',
        image: data.image,
        readingTime: Math.max(2, Math.ceil(wordCount / 220)),
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default function Blog() {
  const blogs = getBlogs();
  const [featured, ...rest] = blogs;

  return (
    <main className="blog-shell">
      <section className="blog-hero">
        <div className="blog-hero-copy">
          <div className="eyebrow">
            <Sparkles size={15} />
            Engineering Notes
          </div>
          <h1>Blog</h1>
          <p>
            Practical writing on full-stack development, AI products, React, Next.js,
            and the systems behind polished web experiences.
          </p>
        </div>

        <div className="blog-hero-panel surface-panel">
          <BookOpen size={24} />
          <strong>{blogs.length}</strong>
          <span>Published Articles</span>
        </div>
      </section>

      {featured && (
        <section className="featured-blog section-inner">
          <Link href={`/blogpost/${featured.slug}`} className="featured-blog-card surface-panel">
            <div className="featured-image">
              <Image src={featured.image} alt={featured.title} width={760} height={460} priority />
            </div>
            <div className="featured-copy">
              <span className="featured-label">Featured</span>
              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
              <div className="blog-meta">
                <span>
                  <User size={15} />
                  {featured.author}
                </span>
                <span>
                  <CalendarDays size={15} />
                  {new Date(featured.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span>{featured.readingTime} min read</span>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section className="blog-grid-section section-inner">
        <div className="blog-grid">
          {rest.map((blog) => (
            <article key={blog.slug} className="blog-card surface-panel">
              <Link href={`/blogpost/${blog.slug}`} className="blog-card-image">
                <Image src={blog.image} alt={blog.title} width={520} height={320} />
              </Link>

              <div className="blog-card-copy">
                <div className="blog-meta">
                  <span>
                    <User size={15} />
                    {blog.author}
                  </span>
                  <span>
                    <CalendarDays size={15} />
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <h2>{blog.title}</h2>
                <p>{blog.description}</p>

                <Link href={`/blogpost/${blog.slug}`} className="blog-read-link">
                  Read Article
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
