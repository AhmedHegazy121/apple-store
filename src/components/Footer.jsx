import { footerLinks } from "../constants";

function Footer() {
  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        <div>
          <p className="font-semibold text-gray-400 text-xs">
            More ways to shop:{" "}
            <span className="underline text-blue">Find An Apple Store </span>
            or <span className="underline text-blue">Other Retailer </span> near
            you.
          </p>
          <p className="font-semibold text-gray-400 text-xs mt-2">
            or Call 00900-050-16667
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px]" />

        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <p className="font-semibold text-gray-400 text-xs">
            Copyright @ 2026 Apple Inc. All rights reserved.
          </p>
          <div className="flex">
            {footerLinks.map((link, i) => (
              <p key={link} className="font-semibold text-gray-400 text-xs">
                {link}{" "}
                {i !== footerLinks.length - 1 && (
                  <span className="mx-2"> | </span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
