interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  canonical?: string;
  robots?: string;
  image?: string;
  type?: string;
  locale?: string;
  siteName?: string;
}

export default function SEO({
  title,
  description,
  keywords = [],
  author,
  canonical,
  robots = "index, follow",
  image,
  type = "website",
  locale = "en_US",
  siteName = "My Website",
}: SEOProps) {
  return (
    <>
      {/* Basic */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robots} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* OpenGraph */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      {canonical && <meta property="og:url" content={canonical} />}
      {siteName && <meta property="og:site_name" content={siteName} />}
      <meta property="og:locale" content={locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && (
        <meta name="twitter:description" content={description} />
      )}
      {image && <meta name="twitter:image" content={image} />}
    </>
  );
}
