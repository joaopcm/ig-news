import Head from "next/head";
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
