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
import { steps, faqs } from "@/dataStore/faqContent";

export default function Home() {
  return (
    <>
      <Header logo={Images.Logo} />

      <Downloader
        title="Facebook Downloader"
        subtitle="Download Facebook Videos, Reels, Stories & Photos"
        mainLinks={mainNavLinks}
        previewComponentMap={previewComponentMap}
        downloadHandler={downloadFacebookMedia}
      />
      <AboutProcess
        image={Images.Download}
        title="Facebook Videos and Photos Download"
        description="FacebookDl is an online web tool that helps you download Facebook Videos, Photos, Reels, and IGTV. FacebookDl.app is designed to be easy to use on any device, such as a mobile phone, tablet, or computer."
        heading="How to download from Facebook?"
        smallDescription="You must follow these three easy steps to download video, reels, and photo from Facebook. Follow the simple steps below."
        steps={steps}
      />
      <WhyUs />
      <DownloadDescription
        heading="FacebookDl.app features"
        headingDescription="With FacebookDl you can download any type of content from Facebook. Our service has an IG video downloader, Reels, story & photo."
        image={Images.videoImg2}
        title="Video Downloader"
        description="FacebookDl.app supports Facebook video download for singular videos and multiple videos from carousels. FacebookDl is created to enable you to download IG videos from your personal page."
        link="/video"
        secondImage={Images.DownloadTwo}
        secondTitle="Photos Downloader"
        secondDescription="Facebook photo download provided by FacebookDl.app is a great tool for saving images from Facebook posts. With FacebookDl, you can download a single post image and multiple Facebook photos (carousel)."
        secondLink="/photo"
      />
      <DownloadDescription
        image={Images.videoImg1}
        title="Reels Downloader"
        description="Reels is a new video format that clones the principle of TikTok. Facebook Reels download with the help of FacebookDl. Our Facebook Reels downloader can help you to save your favorite Reels videos."
        link="/reels"
        secondImage={Images.videoImg3}
        secondTitle="Story Downloader"
        secondDescription="Story is a long video type. If you can’t watch it now, you can download Story videos to your device to be sure that you can return to watching later, without the need to be online or in case the Story can be deleted."
        secondLink="/story"
      />


      <AppPromotion mobileImg={Images.mobile} appHeight={377} />
      <FaqSection
        title="Frequently asked questions (FAQ)"
        intro="This FAQ answers common questions and worries about FacebookDl.app, which is a tool to download public Facebook content. If you can't find the answer to your question, you can email us through our contact page."
        image={Images.Download}
        faqs={faqs}
      />

      <Footer
        logo={Images.Logo}
        mainLinks={mainNavLinks}
        legalLinks={legalLinks}
        logoWidth={180}
        logoHeight={24}
      />
    </>
  );
}
