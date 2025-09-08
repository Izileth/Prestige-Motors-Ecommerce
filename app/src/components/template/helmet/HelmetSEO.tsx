
import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'product';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
    price?: string;
    currency?: string;
    availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
    brand?: string;
    model?: string;
}

const SEO = ({
    title,
    description,
    image = "https://prestigemotors.online/images/og-prestige-motors.jpg",
    url,
    type = "website",
    author,
    publishedTime,
    modifiedTime,
    tags = [],
    price,
    currency = "BRL",
    availability = "InStock",
    brand,
    model
    }: SEOProps) => {
    const baseTitle = "Prestige Motors";
    const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    const baseDescription = "Concessionária de veículos de luxo e alto padrão. Ferrari, Lamborghini, Porsche, BMW, Mercedes-Benz e mais.";
    const fullDescription = description || baseDescription;
    
    return (
        <Helmet>
        {/* Título e descrição */}
        <title>{fullTitle}</title>
        <meta name="description" content={fullDescription} />
        {author && <meta name="author" content={author} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={fullDescription} />
        <meta property="og:type" content={type} />
        <meta property="og:image" content={image} />
        {url && <meta property="og:url" content={url} />}
        
        {/* Twitter */}
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={fullDescription} />
        <meta name="twitter:image" content={image} />
        
        {/* Para produtos de veículos */}
        {type === 'product' && (
            <>
            <meta property="product:price:amount" content={price} />
            <meta property="product:price:currency" content={currency} />
            <meta property="product:availability" content={availability} />
            {brand && <meta property="product:brand" content={brand} />}
            </>
        )}
        
        {/* Para artigos */}
        {type === 'article' && (
            <>
            {author && <meta property="article:author" content={author} />}
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
            {tags.map((tag) => (
                <meta key={tag} property="article:tag" content={tag} />
            ))}
            </>
        )}
        
        {/* URL canônica */}
        {url && <link rel="canonical" href={url} />}
        
        {/* Schema.org para veículos */}
        {type === 'product' && brand && model && (
            <script type="application/ld+json">
            {JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "Car",
                "name": `${brand} ${model}`,
                "brand": {
                "@type": "Brand",
                "name": brand
                },
                "model": model,
                "offers": {
                "@type": "Offer",
                "price": price,
                "priceCurrency": currency,
                "availability": `https://schema.org/${availability}`,
                "seller": {
                    "@type": "AutoDealer",
                    "name": "Prestige Motors"
                }
                },
                "image": image,
                "description": fullDescription
            })}
            </script>
        )}
        </Helmet>
    );
};

export default SEO;