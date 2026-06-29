function Footer() {
  return (
    <footer className="bg-gray-50 p-4 mt-10 border-t border-gray-200 py-6 px-6 text-center text-xs text-gray-500 flex flex-col gap-2">
      <p>
        Event data provided by the{" "}
        <a
          href="https://api.edinburghfestivalcity.com"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-gray-600"
        >
          Edinburgh Festivals Listings API
        </a>
      </p>
      <p>
        {" "}
        This is an independent application and is not officially affiliated with
        or endorsed by the Edinburgh Festivals.
      </p>
      <a
        href="https://www.edfringe.com"
        target="_blank"
        rel="noreferrer"
        className="underline hover:text-gray-600"
      >
        Visit the Edinburgh Fringe website
      </a>
      <p>Created by Emily Spiers</p>

      <p>
        Last updated:{" "}
        {new Date().toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        })}
      </p>
      <p className="text-xs text-gray-500">
        Experiencing issues? Get in touch at{" "}
        <a
          href="mailto:support@myfringeplanner.co.uk"
          className="underline hover:text-gray-700"
        >
          support@myfringeplanner.co.uk
        </a>
      </p>
    </footer>
  );
}

export default Footer;
