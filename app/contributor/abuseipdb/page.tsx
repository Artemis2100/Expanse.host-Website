"use client";

import Navbar from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

export default function AbuseIPDBContributorPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center py-20 px-4">
        <a
          href="https://www.abuseipdb.com/user/277125"
          title="AbuseIPDB is an IP address blacklist for webmasters and sysadmins to report IP addresses engaging in abusive behavior on their networks"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://www.abuseipdb.com/contributor/277125.svg"
            alt="AbuseIPDB Contributor Badge"
            style={{
              width: 319,
              background: "#35c246 linear-gradient(rgba(255,255,255,0), rgba(255,255,255,.3) 50%, rgba(0,0,0,.2) 51%, rgba(0,0,0,0))",
              padding: 5,
              boxShadow: "2px 2px 1px 1px rgba(0, 0, 0, .2)",
            }}
          />
        </a>
      </div>
      <Footer />
    </>
  );
}
