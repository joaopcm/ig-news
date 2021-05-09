import Prismic from "@prismicio/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.div}>
          <a href="#">
            <time>March 12th 2021</time>
            <strong>Lorem impsum title</strong>
            <p>Lorem impsum dolor sit amet, consectetur adipiscing elit</p>
          </a>
          <a href="#">
            <time>March 12th 2021</time>
            <strong>Lorem impsum title</strong>
            <p>Lorem impsum dolor sit amet, consectetur adipiscing elit</p>
          </a>
          <a href="#">
            <time>March 12th 2021</time>
            <strong>Lorem impsum title</strong>
            <p>Lorem impsum dolor sit amet, consectetur adipiscing elit</p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.Predicates.at("document.type", "publication")],
    { fetch: ["publication.title", "publication.content"], pageSize: 100 }
  );

  return {
    props: {},
  };
};
