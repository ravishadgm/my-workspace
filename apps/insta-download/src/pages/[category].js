import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";
import Images from "../../public/images/index";
import {
  Header,
  Footer,
  Downloader,
  AboutProcess,
  WhyUs,
  DownloadDescription,
  AppPromotion,
  FaqSection,
} from "../shared";
import { previewComponentMap } from "@/dataStore/mediaPreviewTypes";
import { downloadFacebookMedia } from "@/utils/api";
import { faqs, steps } from "@/dataStore/faqContent";
export default function CategoryPage({ content }) {
  if (!content) {
    return <h1>404 | Page Not Found</h1>;
  }

  return (
    <>
      <Header logo={Images.Logo} />
      <Downloader
        title={content.title}
        subtitle={content.subtitle}
        mainLinks={mainNavLinks}
        previewComponentMap={previewComponentMap}
        downloadFacebookMedia={downloadFacebookMedia}
      />
      <AboutProcess
        image={content.about.image}
        title={content.about.title}
        description={content.about.description}
        heading={content.about.heading}
        smallDescription={content.about.smallDescription}
        steps={content.about.steps}
      />

      <DownloadDescription
        heading={content.downloadDescription.heading}
        headingDescription={content.downloadDescription.headingDescription}
        image={content.downloadDescription.image}
        title={content.downloadDescription.title}
        description={content.downloadDescription.description}
        link={content.downloadDescription.link}
        secondImage={content.downloadDescription.secondImage}
        secondTitle={content.downloadDescription.secondTitle}
        secondDescription={content.downloadDescription.secondDescription}
        secondLink={content.downloadDescription.secondLink}
      />

      <AppPromotion mobileImg={Images.mobile} />
      <FaqSection
        title="Frequently asked questions (FAQ)"
        intro="This FAQ answers common questions and worries about InstaDl.app, which is a tool to download public Instagram content. If you can't find the answer to your question, you can email us through our contact page."
        image={Images.Download}
        faqs={faqs}
      />
      <Footer
        logo={Images.Logo}
        mainLinks={mainNavLinks}
        legalLinks={legalLinks}
      />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { category } = params;
  const { categoryContent } = await import("@/dataStore/categoryContent");

  return {
    props: {
      content: categoryContent[category] || null,
    },
  };
}
