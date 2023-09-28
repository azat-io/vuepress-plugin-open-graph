import type { Plugin } from '@vuepress/core'

interface OpenGraphPluginOptions {
  twitterCard?: 'summary_large_image' | 'summary'
  defaultImage?: string
  twitterSite?: string
  host: string
}

export let openGraphPlugin =
  ({
    twitterCard = 'summary',
    defaultImage,
    twitterSite,
    host,
  }: OpenGraphPluginOptions): Plugin =>
  () => ({
    extendsPage: page => {
      let head = page.frontmatter.head || []

      head.push(['meta', { property: 'og:locale', content: page.lang }])

      if (page.title) {
        head.push(['meta', { property: 'og:title', content: page.title }])
      }

      if (page.frontmatter.description) {
        head.push([
          'meta',
          { content: page.frontmatter.description, property: 'og:description' },
        ])
      }

      if (!page.frontmatter.layout) {
        head.push(['meta', { property: 'og:type', content: 'article' }])
        if (page.frontmatter.date {
          head.push([
            'meta',
            {
              content: new Date(page.frontmatter.date!).toISOString(),
              property: 'article:published_time',
            },
          ])
        }
      }

      head.push([
        'meta',
        { content: `${host}${page.path}`, property: 'og:url' },
      ])

      if (page.frontmatter.image) {
        head.push([
          'meta',
          { content: page.frontmatter.image as string, property: 'og:image' },
        ])
      } else if (defaultImage) {
        head.push(['meta', { content: defaultImage, property: 'og:image' }])
      }

      if (page.title) {
        head.push(['meta', { name: 'twitter:title', content: page.title }])
      }

      if (page.frontmatter.description) {
        head.push([
          'meta',
          {
            content: page.frontmatter.description,
            name: 'twitter:description',
          },
        ])
      }

      if (page.frontmatter.image) {
        head.push([
          'meta',
          {
            content: page.frontmatter.image as string,
            name: 'twitter:image',
          },
        ])
      } else {
        head.push([
          'meta',
          { content: '/hero-preview.png', name: 'twitter:image' },
        ])
      }

      head.push(['meta', { name: 'twitter:card', content: twitterCard }])

      if (twitterSite) {
        head.push(['meta', { name: 'twitter:site', content: twitterSite }])
      }

      page.frontmatter.head = head
    },
    name: 'vuepress-plugin-open-graph',
  })
