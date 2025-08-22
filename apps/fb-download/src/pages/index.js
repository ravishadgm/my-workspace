import dynamic from "next/dynamic";
import Images from "../../public/images/index";
const Header = dynamic(() => import("shared/Header"), { ssr: false });

export default function Home() {
  return (
    <div>
      <Header logo={Images.Logo} />

    
    </div>
  );
}
