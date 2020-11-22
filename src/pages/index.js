import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import Skills from "../../components/Skills";
import styled from "styled-components";
const features = [
  {
    title: <>About Me</>,
    imageUrl: "img/avataaars.svg",
    description: (
      <p>
        Hi, It's me <b> Samundra Khatri</b>. I love to make web apps and I
        mostly work with things that are in the JavaScript
        Ecosystem(Frontend/Node) and equally interested in server-side/DevOps.
        <br />
        <br />
        You will find me very passionate about computer science who has a keen
        an eye for paradigms, architecture, patterns, and principles.
      </p>
    ),
  },
  {
    title: <>Experience</>,
    imageUrl: "img/undraw_docusaurus_tree.svg",
    description: (
      <p>
        I have worked from a product-based company to a service-based agency
        where I worked in the development of projects like Realtime Dashboards,
        CRM, CMS, Plugins, Libraries, E-Commerce, PWA, Cloud Storages, Video
        Streaming, etc where my primary focus was on Frontend.
      </p>
    ),
  },
  {
    title: <>Skills</>,
    imageUrl: "img/undraw_docusaurus_react.svg",
    description: <Skills />,
  },
];

const HeroHeader = styled("header")`
  background: url("img/nepal.jpg") no-repeat center;
  background-size: cover;
`;
function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      {description}
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="JavaScript developer from nepal who loves to do project in React, TypeScript, Redux, ExpressJS, NodeJS, NestJS, NextJS."
    >
      <HeroHeader
        className={classnames("hero hero--primary", styles.heroBanner)}
      >
        <div className="container image-bg">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <a
              className={classnames(
                "button   button--primary button--lg",
                styles.getStarted
              )}
              href={useBaseUrl("samundra.pdf")}
            >
              Download Resume
            </a>
          </div>
        </div>
      </HeroHeader>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
