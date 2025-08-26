import { Contact, Footer, Header } from "@/shared";
import React from "react";
import Images from "../../public/images/index";
import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";
function ContactUs() {
    return (
        <>
            <Header logo={Images.Logo} />
            <Contact />
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

export default ContactUs;
