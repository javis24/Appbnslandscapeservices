// app/page.jsx
import Image from "next/image";
// app/page.jsx

export const metadata = {
  title: "B&S Landscape Services LLC | Landscaping in El Mirage, Arizona",
  description:
    "B&S Landscape Services LLC ofrece servicios de irrigación, debris removal, stump removal, yard service y extensive landscape clean up en El Mirage, Arizona y alrededores. Free estimates al (623) 210 3071.",
    icons: {
    icon: "/B&SLogosl.png", 
    shortcut: "/B&SLogosl.png",
    apple: "/B&SLogosl.png",
  },
  keywords: [
    "landscape services El Mirage",
    "yard maintenance El Mirage AZ",
    "irrigation system El Mirage",
    "debris removal Arizona",
    "stump removal",
    "yard service",
    "landscape clean up",
    "tree removal El Mirage",
    "B&S Landscape Services LLC",
  ],
  openGraph: {
    title: "B&S Landscape Services LLC | Landscape & Yard Services in El Mirage, AZ",
    description:
      "Professional landscape services: irrigation systems, debris & stump removal, yard service and extensive landscape clean up in El Mirage, Arizona.",
    url: "https://bnslandscapeservices.com", 
    siteName: "B&S Landscape Services LLC",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://bnslandscapeservices.com/B&SLogosl.png", 
        width: 1200,
        height: 630,
        alt: "B&S Landscape Services LLC - Professional Landscape Services in El Mirage, Arizona",
      },
    ],
  },
  alternates: {
    canonical: "https://bnslandscapeservices.com", 
  },
  twitter: {
    card: "summary_large_image",
    title: "B&S Landscape Services LLC | Landscaping in El Mirage, AZ",
    description:
      "Trust B&S Landscape Services LLC to keep your trees and yard looking good in El Mirage, Arizona.",
    images: ["https://bnslandscapeservices.com/B&SLogosl.png"], 
  },
};


export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "B&S Landscape Services LLC",
    image: "https://bnslandscapeservices.com/B&SLogosl.png", 
    telephone: "+1-623-210-3071",
    email: "quotes@bnslandscapeservices.com",
    url: "https://bnslandscapeservices.com/B&SLogosl.png", 
    address: {
      "@type": "PostalAddress",
      streetAddress: "12145 Grand Ave N",
      addressLocality: "El Mirage",
      addressRegion: "AZ",
      postalCode: "85335",
      addressCountry: "US",
    },
    areaServed: [
      "Peoria",
      "Glendale",
      "Sun City Grand",
      "Sun City Festival",
      "Sun City West",
      "Surprise",
      "Buckeye",
      "Avondale",
      "Tolleson",
      "Litchfield Park",
    ],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:30",
      },
    ],
    sameAs: [
      "https://www.facebook.com/BnSLandscapeServicesLLC",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-white text-slate-900">
      {/* BOTÓN WHATSAPP FLOTANTE */}
      <a
        href="https://wa.me/16232103071"
        target="_blank"
        rel="noreferrer"
        className="fixed z-40 bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40 text-white text-3xl"
      >
        <i className="fa fa-whatsapp" aria-hidden="true" />
      </a>

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg">
              B&S
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-700 font-semibold">
                B&S Landscape Services LLC
              </p>
              <p className="text-xs text-slate-500">
                El Mirage, Arizona
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#services" className="text-slate-700 hover:text-emerald-700 transition">
              Services
            </a>
            <a href="#gallery" className="text-slate-700 hover:text-emerald-700 transition">
              Gallery
            </a>
            <a href="#contact" className="text-slate-700 hover:text-emerald-700 transition">
              Contact
            </a>
            <a
              href="tel:+16232103071"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/80 bg-emerald-500 text-white px-4 py-2 text-xs uppercase tracking-wide shadow-sm hover:bg-emerald-600 transition"
            >
              <i className="fa fa-phone" aria-hidden="true" />
              (623) 210 3071
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold text-emerald-700">
                Professional Landscape Care
              </p>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-slate-900">
                Trust us to keep your trees
                <span className="block text-emerald-700">and yard looking good</span>
              </h1>
              <p className="text-base md:text-lg text-slate-600 max-w-xl">
                B&S Landscape Services LLC offers reliable, detailed yard care for homes in
                El Mirage and the surrounding areas. From debris removal to irrigation systems,
                we’ve got your outdoor space covered.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+16232103071"
                  className="inline-flex flex-col sm:flex-row sm:items-center sm:gap-2 rounded-full bg-emerald-600 text-white px-6 py-3 text-sm font-semibold shadow-md hover:bg-emerald-700 transition"
                >
                  <span className="text-xs uppercase tracking-[0.18em] text-emerald-100">
                    Free Estimates
                  </span>
                  <span className="text-base">(623) 210 3071</span>
                </a>
                <a
                  href="tel:+16232529640"
                  className="inline-flex flex-col sm:flex-row sm:items-center sm:gap-2 rounded-full border border-emerald-500 text-emerald-700 px-6 py-3 text-sm font-semibold bg-white/70 hover:bg-emerald-50 transition"
                >
                  <span className="text-xs uppercase tracking-[0.18em] text-emerald-700/80">
                    Free Estimates
                  </span>
                  <span className="text-base">(623) 252 9640</span>
                </a>
              </div>

              <p className="text-xs text-slate-500 uppercase tracking-[0.2em]">
                Licensed • Reliable • Local
              </p>
            </div>

            {/* Logo / imagen */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-100 blur-3xl opacity-60" />
                <div className="absolute -bottom-10 -left-4 h-32 w-32 rounded-full bg-emerald-200 blur-3xl opacity-60" />
                <div className="relative rounded-3xl bg-white/80 shadow-xl border border-emerald-100 p-6 flex items-center justify-center">
                  <img
                    src="./01.jpg"
                    alt="B&S Landscape Service LLC"
                    className="w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES / ABOUT */}
        <section id="services" className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-[1.1fr,1fr] gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                B&amp;S Landscape Services LLC
              </h2>
              <p className="mt-4 text-slate-600">
                We offer the following services:
              </p>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>• Irrigation System</li>
                <li>• Debris Removal</li>
                <li>• Stump Removal</li>
                <li>• Yard Service</li>
                <li>• Extensive Landscape Clean up</li>
              </ul>

              <a
                href="tel:+16232103071"
                className="mt-6 inline-flex flex-col sm:flex-row sm:items-center sm:gap-2 rounded-full bg-emerald-600 text-white px-6 py-3 text-sm font-semibold shadow hover:bg-emerald-700 transition"
              >
                <span className="text-xs uppercase tracking-[0.18em] text-emerald-100">
                  Free Estimates
                </span>
                <span className="text-base">(623) 210 3071</span>
              </a>
            </div>

            {/* Burbujas de servicios */}
            <div className="relative flex items-center justify-center min-h-[260px]">
              <div className="absolute h-40 w-40 rounded-full bg-emerald-100"></div>
              <div className="absolute h-56 w-56 rounded-full bg-emerald-200 translate-x-20 -translate-y-4"></div>
              <div className="absolute h-56 w-56 rounded-full bg-emerald-300/80 -translate-x-10 translate-y-10"></div>

              <div className="relative space-y-3 text-center text-white font-semibold">
                <div>
                  <p className="text-xs tracking-wide">DEBRIS</p>
                  <p>REMOVAL</p>
                  <p className="mt-4 text-xl">LANDSCAPE</p>
                  <p>MAINTENANCE</p>
                </div>

                <div className="mt-4">
                  <p className="text-xs tracking-wide">ROCK</p>
                  <p>INSTALLATION</p>
                </div>

                <div className="mt-4">
                  <p className="text-xs tracking-wide">TREE</p>
                  <p>REMOVAL</p>
                  <p className="mt-4 text-xl">IRRIGATION</p>
                  <p>SYSTEM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                B&amp;S Landscape Services LLC
              </h2>
              <p className="mt-3 text-slate-600">
                We are the experts you can trust to keep your yard looking beautiful.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "img-one.png",
                "img-two.png",
                "img-tree.png",
                "img-for.png",
                "img-five.png",
                "img-six.png",
                "img-nineteen.jpg",
                "img-eight.png",
                "img-nine.png",
                "img-uno.jpg",
                "img-dos.jpg",
                "img-ten.png",
                "img-tres.jpg",
                "img-eighteen.jpg",
                "img-seventeen.png",
                "team-handy.jpeg",
              ].map((file) => (
                <div
                  key={file}
                  className="overflow-hidden rounded-xl bg-white/70 border border-emerald-100 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={`./${file}`}
                    alt={file}
                    className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href="tel:+16232103071"
                className="inline-flex flex-col sm:flex-row sm:items-center sm:gap-2 rounded-full bg-emerald-600 text-white px-8 py-3 text-sm font-semibold shadow hover:bg-emerald-700 transition"
              >
                <span className="text-xs uppercase tracking-[0.18em] text-emerald-100">
                  Free Estimates
                </span>
                <span className="text-base">(623) 210 3071</span>
              </a>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contact" className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1.4fr,0.9fr] gap-12">
            {/* Formulario (solo UI, ya lo puedes conectar a tu API o a tu endpoint existente) */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6">
                Get in Touch
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    className="w-full rounded-xl border border-emerald-100 bg-white/80 px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 min-h-[120px]"
                    placeholder="Enter message"
                    name="message"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Name
                    </label>
                    <input
                      className="w-full rounded-xl border border-emerald-100 bg-white/80 px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                      placeholder="Enter your name"
                      name="name"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      className="w-full rounded-xl border border-emerald-100 bg-white/80 px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                      placeholder="Email"
                      name="email"
                      type="email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone
                  </label>
                  <input
                    className="w-full rounded-xl border border-emerald-100 bg-white/80 px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                    placeholder="Enter phone"
                    name="phone"
                    type="text"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 text-white px-8 py-3 text-sm font-semibold shadow hover:bg-emerald-700 transition"
                >
                  Send
                </button>
              </form>
            </div>

            {/* Info de contacto */}
            <div className="space-y-6">
              <div className="flex gap-3">
                <span className="mt-1 text-emerald-600">
                  <i className="fa fa-home" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Address
                  </h3>
                  <p className="text-sm text-slate-600">
                    12145 Grand Ave N<br />
                    El Mirage, Arizona, 85335
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="mt-1 text-emerald-600">
                  <i className="fa fa-tablet" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Phone
                  </h3>
                  <p className="text-sm text-slate-600">
                    (623) 210 3071<br />
                    (623) 252 9640
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Mon to Fri 8:00am – 5:30pm<br />
                    Saturday 9:00am – 2:30pm
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="mt-1 text-emerald-600">
                  <i className="fa fa-envelope" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Email
                  </h3>
                  <p className="text-sm text-slate-600">
                    quotes@bnslandscapeservices.com<br />
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Send us your query anytime!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-emerald-100 bg-white/80">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-12 grid md:grid-cols-4 gap-8 text-sm">
          <div className="md:col-span-1">
            <p className="text-emerald-700 font-semibold mb-3">
              Let us beautify your lawn with the best Landscape Service.
            </p>
            <p className="text-slate-600 text-sm">
              Find us, like us and refer us on Facebook!
            </p>
            <div className="mt-4">
              <a
                href="https://www.facebook.com/BnSLandscapeServicesLLC"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <i className="fa fa-facebook" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-emerald-700 font-semibold mb-3">
              Landscape
            </h3>
            <ul className="space-y-1 text-slate-700">
              <li>Irrigation System</li>
              <li>Debris Removal</li>
              <li>Stump Removal</li>
              <li>Yard Service</li>
              <li>Extensive Landscape</li>
            </ul>
          </div>

          <div>
            <h3 className="text-emerald-700 font-semibold mb-3">
              Service Area
            </h3>
            <ul className="space-y-1 text-slate-700">
              <li>Peoria</li>
              <li>Glendale</li>
              <li>Sun City Grand</li>
              <li>Sun City Festival</li>
              <li>Sun City West</li>
              <li>Surprise</li>
              <li>Buckeye</li>
              <li>Avondale</li>
              <li>Tolleson</li>
              <li>Litchfield Park</li>
            </ul>
          </div>

          <div>
            <h3 className="text-emerald-700 font-semibold mb-3">Address</h3>
            <p className="text-slate-700 text-sm">
              B&amp;S Landscape Services LLC<br />
              12145 Grand Ave N<br />
              El Mirage, AZ 85335<br />
              United States
            </p>
          </div>
        </div>

        <div className="border-t border-emerald-100">
          <p className="text-center text-xs text-slate-500 py-4">
            <a
              href="https://www.webgomezpalacio.com"
              className="text-emerald-700 font-semibold hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Webgomezpalacio
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
