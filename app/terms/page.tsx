export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
	  <a
        href="/"
        className="mb-6 inline-block rounded-full border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-stone-50"
      >
        ← Back to Baby Name Finder
      </a>
      <h1 className="mb-6 text-4xl font-bold">Terms of Use</h1>

      <p className="mb-4">
        Baby Name Finder is provided for informational and entertainment
        purposes only.
      </p>

      <p className="mb-4">
        Name suggestions and meanings are generated automatically and may not
        always be historically or culturally complete.
      </p>

      <p className="mb-4">
        Users are responsible for their own decisions regarding baby names.
      </p>

      <p>
        By using this website, you agree to these terms.
      </p>
    </main>
  );
}