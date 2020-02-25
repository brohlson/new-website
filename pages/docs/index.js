import { gqlStaticProps } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import gql from 'graphql-tag';
import Link from 'next/link';
import Head from 'next/head';
import s from './style.css';

import docHref from 'utils/docHref';

export const unstable_getStaticProps = gqlStaticProps(
  gql`
    query {
      roots: allDocGroups(filter: { parent: { exists: false } }) {
        name
        slug
        pages {
          page {
            slug
          }
        }
        children {
          name
          slug
          pages {
            page {
              slug
            }
          }
          children {
            name
            slug
            pages {
              page {
                slug
              }
            }
          }
        }
      }
    }
  `,
);

const normalize = slug => (slug === 'index' ? '' : `/${slug}`);

const Sidebar = ({ roots }) => (
  <>
    {roots.map(root => (
      <div className={s.group} key={root.slug}>
        <div className={s.groupName}>{root.name}</div>
        <div className={s.guides}>
          {root.children.map(sub => (
            <Link
              href={docHref(
                `/docs/p/${sub.slug}${normalize(sub.pages[0].page.slug)}`,
              )}
              as={`/docs/p/${sub.slug}${normalize(sub.pages[0].page.slug)}`}
              key={sub.slug}
            >
              <a className={s.guide}>{sub.name}</a>
            </Link>
          ))}
        </div>
      </div>
    ))}
  </>
);

export default function Docs({ roots }) {
  return (
    <DocsLayout sidebar={<Sidebar roots={roots} />}>
      <Head>
        <title>DatoCMS Documentation</title>
      </Head>
      <div className={s.container}>
        <h2 className={s.title}>Documentation</h2>
        <p className={s.subtitle}>
          Whether you’re a startup or a global enterprise, learn how to
          integrate with Stripe to accept payments and manage your business
          online.
        </p>

        <h6 className={s.introTitle}>Start with your use case</h6>
        <div className={s.useCaseCards}>
          <Link
            href={docHref('/docs/p/general-concepts')}
            as="/docs/p/general-concepts"
          >
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Getting started</div>
              <p>Learn all the basic concepts and features behind DatoCMS.</p>
            </a>
          </Link>
          <Link
            href={docHref('/docs/p/content-modelling')}
            as="/docs/p/content-modelling"
          >
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Model your schema</div>
              <p>
                Build your administrative area and define the structure of your
                content.
              </p>
            </a>
          </Link>
          <Link
            href={docHref('/docs/p/content-delivery-api/overview')}
            as="/docs/p/content-delivery-api/overview"
          >
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>GraphQL API</div>
              <p>Learn how to fetch your content into any frontend project.</p>
            </a>
          </Link>
        </div>

        <h6 className={s.introTitle}>Start from a template</h6>
        <div className={s.useCaseCards}>
          <Link href="/docs/p/general-concepts">
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Gatsby website</div>
              <p>Learn all the basic concepts and features behind DatoCMS.</p>
            </a>
          </Link>
          <Link href="/docs/p/content-delivery-api/overview">
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>NextJS website</div>
              <p>Learn how to fetch your content into any frontend project.</p>
            </a>
          </Link>
          <Link href="/docs/p/content-modelling">
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Hugo website</div>
              <p>
                Build your administrative area and define the structure of your
                content.
              </p>
            </a>
          </Link>
        </div>
      </div>
    </DocsLayout>
  );
}
