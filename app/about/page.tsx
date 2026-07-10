



import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-white px-6 py-12">
	
      <a
        href="/"
        className="mb-6 inline-block rounded-full border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-stone-50"
      >
        ← Back to Baby Name Finder
      </a>
	  
      <div className="mx-auto max-w-4xl rounded-3xl bg-white/90 p-10 shadow-xl">
	  
	    <div className="mb-8 flex justify-center">
	      <Image
		    src="/name-beginnings-logo.png"
		    alt="BabezNamez Logo"
		    width={200}
		    height={200}
		    priority
			style={{ width: "auto", height: "auto" }}
		  />
        </div>

        <h1 className="mb-6 text-center text-5xl font-bold text-emerald-800">
          About BabezNamez
        </h1>

        <p className="mb-6 text-lg leading-8 text-slate-700">
          Welcome to <strong>BabezNamez</strong>! Choosing a baby's name is one
          of the most meaningful decisions a family will ever make. A name
          becomes part of a person's identity for a lifetime, and finding the
          right one should be an enjoyable, exciting, and inspiring experience.
        </p>

        <p className="mb-6 text-lg leading-8 text-slate-700">
          We created BabezNamez to help parents and families discover beautiful
          baby names using the creativity of artificial intelligence combined
          with meaningful information. Whether you're looking for a timeless
          classic, something modern, unique, elegant, nature-inspired, or rooted
          in your family's heritage, our goal is to help you explore names that
          truly feel right.
        </p>

        <h2 className="mt-10 mb-4 text-3xl font-semibold text-emerald-700">
          Our Mission
        </h2>

        <p className="mb-6 text-lg leading-8 text-slate-700">
          Our mission is simple: to help families confidently discover meaningful
          baby names while making the journey enjoyable and stress-free. We
          believe technology should make important life moments easier—not
          replace personal judgment.
        </p>

        <h2 className="mt-10 mb-4 text-3xl font-semibold text-emerald-700">
          Why Families Choose BabezNamez
        </h2>

        <ul className="mb-8 list-disc space-y-3 pl-8 text-lg leading-8 text-slate-700">
          <li>AI-powered personalized baby name suggestions.</li>
          <li>Search by style, origin, popularity, and gender.</li>
          <li>Explore meanings and origins of names.</li>
          <li>Generate similar names instantly.</li>
          <li>Save your favorite names for later.</li>
          <li>Create printable PDF lists to share with family and friends.</li>
          <li>Always free to use.</li>
        </ul>

        <h2 className="mt-10 mb-4 text-3xl font-semibold text-emerald-700">
          Looking Ahead
        </h2>

        <p className="mb-6 text-lg leading-8 text-slate-700">
          We're continually improving BabezNamez by adding new features, richer
          information about names, and additional tools to help growing
          families. Our vision is to become one of the web's most trusted
          destinations for discovering meaningful baby names.
        </p>

        <p className="text-lg leading-8 text-slate-700">
          Thank you for visiting BabezNamez. We hope we can play a small part in
          helping you find the perfect name for someone very special.
        </p>
		
		


      </div>
    </main>
  );
}