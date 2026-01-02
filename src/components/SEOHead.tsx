import { Helmet } from 'react-helmet-async';

interface FAQ {
  q: string;
  a: string;
}

interface Breadcrumb {
  name: string;
  url: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  breadcrumbs?: Breadcrumb[];
  faqs?: FAQ[];
  additionalSchema?: Record<string, unknown>[];
  ogImage?: string;
  noindex?: boolean;
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  breadcrumbs,
  faqs,
  additionalSchema,
  ogImage = 'https://tradecalcs.co.uk/og-image.jpg',
  noindex = false
}: SEOHeadProps) {
  const baseUrl = 'https://tradecalcs.co.uk';
  const fullCanonical = canonicalUrl.startsWith('http') ? canonicalUrl : `${baseUrl}${canonicalUrl}`;

  const schemaGraph: Record<string, unknown>[] = [];

  // Breadcrumbs schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemaGraph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url.startsWith('http') ? crumb.url : `${baseUrl}${crumb.url}`
      }))
    });
  }

  // FAQ schema
  if (faqs && faqs.length > 0) {
    schemaGraph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a
        }
      }))
    });
  }

  // Additional schema (Organization, WebSite, LocalBusiness, etc.)
  if (additionalSchema && additionalSchema.length > 0) {
    schemaGraph.push(...additionalSchema);
  }

  const fullSchema = {
    '@context': 'https://schema.org',
    '@graph': schemaGraph
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />
      
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TradeCalcs" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema.org JSON-LD */}
      {schemaGraph.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(fullSchema)}
        </script>
      )}
    </Helmet>
  );
}
