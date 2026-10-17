import { Lightbulb } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd } from '@/components/JsonLd'
import { OfferArt } from '@/components/OfferArt'
import { RichText } from '@/components/RichText'
import { BlogCard, StoreGrid } from '@/components/ui'
import { formatLongDate } from '@/lib/format'
import { getPost, getPosts, getRelatedPosts, getStore } from '@/lib/queries'
import { absoluteUrl, site } from '@/lib/site'
import type { BlogBlock } from '@/lib/types'

export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/blog/${slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'p':
      return (
        <p>
          <RichText text={block.text} />
        </p>
      )
    case 'h2':
      return <h2 id={block.id ?? slugify(block.text)}>{block.text}</h2>
    case 'h3':
      return <h3>{block.text}</h3>
    case 'ul':
    case 'ol': {
      const List = block.type
      return (
        <List>
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </List>
      )
    }
    case 'tip':
      return (
        <aside className="my-6 flex gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-5 text-[16px] leading-7">
          <Lightbulb className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
          <p className="!my-0">
            <strong>Tip: </strong>
            <RichText text={block.text} />
          </p>
        </aside>
      )
  }
}

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  const post = getPost(slug)
  if (!post) notFound()

  const headings = post.body.filter((b): b is Extract<BlogBlock, { type: 'h2' }> => b.type === 'h2')
  const stores = post.relatedStores.flatMap((s) => getStore(s) ?? [])
  const related = getRelatedPosts(slug)

  return (
    <div className="container-page pt-6 sm:pt-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[
            { name: 'Blog', href: '/blog' },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
        />
        <article className="mt-4">
          <header>
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <li key={t} className="chip bg-brand-50 text-brand-700">
                  {t}
                </li>
              ))}
            </ul>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-[2.6rem]">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-ink-soft">{post.description}</p>
            <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 border-y border-line py-3 text-sm text-muted">
              <span>
                By <span className="font-semibold text-ink">{post.author}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Published <time dateTime={post.publishedAt}>{formatLongDate(post.publishedAt)}</time>
              </span>
              {post.updatedAt !== post.publishedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime={post.updatedAt}>{formatLongDate(post.updatedAt)}</time>
                  </span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
            </p>
          </header>

          <figure className="mt-8">
            <OfferArt theme={post.theme} accent="#008A2E" className="aspect-[16/8] rounded-3xl border border-line" />
            <figcaption className="sr-only">{post.imageAlt}</figcaption>
          </figure>

          {headings.length > 2 && (
            <nav aria-labelledby="toc" className="mt-8 rounded-2xl bg-surface p-5">
              <h2 id="toc" className="text-sm font-extrabold uppercase tracking-wider text-ink">
                In this guide
              </h2>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[15px] marker:text-muted">
                {headings.map((h) => (
                  <li key={h.text}>
                    <a href={`#${h.id ?? slugify(h.text)}`} className="text-ink-soft hover:text-brand-700 hover:underline">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="prose-cc mt-6">
            {post.body.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>

          <p className="mt-10 rounded-2xl border border-line p-5 text-sm leading-6 text-muted">
            Written by the {site.name} editorial team. Prices, policies and promotions change often — check the
            retailer’s site for current terms. This article may contain affiliate links.
          </p>
        </article>
      </div>

      {stores.length > 0 && (
        <section aria-labelledby="stores" className="mt-16">
          <h2 id="stores" className="section-title mb-5">
            Stores mentioned in this guide
          </h2>
          <StoreGrid stores={stores} />
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related" className="mt-16">
          <h2 id="related" className="section-title mb-5">
            Related articles
          </h2>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.description,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          author: { '@type': 'Organization', name: site.name, url: site.url },
          publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: absoluteUrl('/icon.svg') } },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
        }}
      />
    </div>
  )
}
