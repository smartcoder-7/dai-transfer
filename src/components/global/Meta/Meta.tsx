import Head from 'next/head';

interface MetaProps {
  icon?: string;
  metaDescription?: string;
  title?: string;
}

function Meta({ icon, metaDescription, title }: MetaProps) {
  return (
    <Head>
      {title && <title>{title}</title>}
      {metaDescription && <meta name="description" content={metaDescription} />}
      {icon && <link rel="icon" href={icon} />}
    </Head>
  );
}

export default Meta;
