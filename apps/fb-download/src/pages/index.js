import dynamic from "next/dynamic";

// import Header dynamically from shared remote
const Header = dynamic(() => import("shared/Header"), { ssr: false });

export default function Home() {
  return (
    <div>
      {/* Federated Header */}
      <Header />

<h1>fdgdf</h1>

      {/* Federated Footer */}
    </div>
  );
}
