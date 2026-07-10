'use client';

import { useEffect, useState } from 'react';


type NameResult = {
  name: string;
  meaning: string;
  origin: string;
  vibe: string;
  whySelected?: string;
  popularity?: string;
  nicknames?: string[];
  siblingCompatibility?: string;
};

type SavedName = NameResult & {
  settings: {
    parent1First: string;
    parent1Middle: string;
    parent2First: string;
    parent2Middle: string;
    gender: string;
    style: string;
    length: string;
    popularity: string;
    origins: string[];
    notes: string;
  };
};

export default function BabyNameFinder() {
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [savedNames, setSavedNames] = useState<SavedName[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [similarLoadingName, setSimilarLoadingName] = useState<string | null>(null);
  const [results, setResults] = useState<NameResult[]>([]);
  const [previousResults, setPreviousResults] = useState<NameResult[]>([]);
  const [selectedFavorite, setSelectedFavorite] = useState<SavedName | null>(null);
  
  const [formData, setFormData] = useState({
    parent1First: '',
    parent1Middle: '',
    parent2First: '',
    parent2Middle: '',
    gender: '',
    style: '',
    length: '',
    popularity: '',
    notes: '',
  });
//Load saved favorites
  useEffect(() => {
    const storedNames = localStorage.getItem('savedBabyNames');

    if (storedNames) {
      setSavedNames(JSON.parse(storedNames));
    }
  }, []);


//Save favorites whenever they change
  useEffect(() => {
    localStorage.setItem('savedBabyNames', JSON.stringify(savedNames));
  }, [savedNames]); 


//Load saved form data
  useEffect(() => {
    const storedFormData = localStorage.getItem('babyNameFormData');

    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);


//Save form data whenever it changes
  useEffect(() => {
    localStorage.setItem(
	  'babyNameFormData',
	  JSON.stringify(formData)
	);
  }, [formData]); 
  

//Load saved origins
  useEffect(() => {
    const storedOrigins = localStorage.getItem(
	  'babyNameSelectedOrigins'
	);

    if (storedOrigins) {
      setSelectedOrigins(JSON.parse(storedOrigins));
    }
  }, []);


//Save origins whenever they change
  useEffect(() => {
    localStorage.setItem(
      'babyNameSelectedOrigins',
      JSON.stringify(selectedOrigins)
    );
  }, [selectedOrigins]);
  
  




  const originOptions = [
    'No Preference', 'Mix Origins', 'African', 'Arabic', 'Chinese', 'Dutch',
    'English', 'French', 'German', 'Greek', 'Hawaiian', 'Hebrew', 'Hindi',
    'Indian', 'Irish', 'Italian', 'Japanese', 'Korean', 'Latin',
    'Native American', 'Nordic', 'Persian', 'Polish', 'Portuguese', 'Russian',
    'Scottish', 'Slavic', 'Spanish', 'Swedish', 'Turkish', 'Welsh',
  ];

  const exampleResults: NameResult[] = [
    {
      name: 'Alden',
      meaning: 'Old friend or wise protector',
      origin: 'English',
      vibe: 'Warm, steady, timeless, and easy to pronounce',
    },
    {
      name: 'Mira',
      meaning: 'Wonderful, peace, or ocean depending on origin',
      origin: 'Multicultural',
      vibe: 'Gentle, elegant, globally familiar, and graceful',
    },
    {
      name: 'Rowan',
      meaning: 'Little red one or rowan tree',
      origin: 'Irish / Scottish',
      vibe: 'Nature-inspired, calm, modern, and strong',
    },
  ];

  const toggleOrigin = (origin: string) => {
    if (origin === 'No Preference') {
      setSelectedOrigins(['No Preference']);
      return;
    }

    setSelectedOrigins((current) => {
      const filtered = current.filter((item) => item !== 'No Preference');

      if (filtered.includes(origin)) {
        return filtered.filter((item) => item !== origin);
      }

      return [...filtered, origin];
    });
  };

  const findNames = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-names', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          origins: selectedOrigins,
        }),
      });

      const data = await response.json();

      if (data.names) {
        setResults(data.names);
      } else {
        alert('No names were returned. Please try again.');
      }
    } catch (error) {
      console.error('Find names error:', error);
      alert('Sorry, something went wrong while finding names.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveName = (result: NameResult) => {
    setSavedNames((current) => [
      ...current,
      {
        ...result,
        settings: {
          ...formData,
          origins: selectedOrigins,
        },
      },
    ]);
  };

  const createPdf = () => {
    const printWindow = window.open('', '_blank');

    if (!printWindow) return;

   const searchCriteriaHtml = `
    <div class="criteria">
      <h2>Search Criteria</h2>
      <p><strong>Parent 1:</strong> ${formData.parent1First} ${formData.parent1Middle}</p>
      <p><strong>Parent 2:</strong> ${formData.parent2First} ${formData.parent2Middle}</p>
      <p><strong>Gender:</strong> ${formData.gender || 'No preference'}</p>
      <p><strong>Style:</strong> ${formData.style || 'No preference'}</p>
      <p><strong>Length:</strong> ${formData.length || 'No preference'}</p>
      <p><strong>Popularity Preference:</strong> ${formData.popularity || 'No preference'}</p>
      <p><strong>Origins:</strong> ${selectedOrigins.join(', ') || 'No preference'}</p>
      <p><strong>Notes:</strong> ${formData.notes || 'None'}</p>
    </div>
  `;

  const savedHtml = savedNames
    .map(
      (item) => `
      <div class="card">
        <h2>${item.name}</h2>
        <p><strong>Meaning:</strong> ${item.meaning}</p>
        <p><strong>Origin:</strong> ${item.origin}</p>
        <p><strong>Vibe:</strong> ${item.vibe}</p>

        ${
          item.whySelected
            ? `<p><strong>Why Selected:</strong> ${item.whySelected}</p>`
            : ''
        }

        ${
          item.popularity
            ? `<p><strong>Popularity:</strong> ${item.popularity}</p>`
            : ''
        }

        ${
          item.nicknames?.length
            ? `<p><strong>Nicknames:</strong> ${item.nicknames.join(', ')}</p>`
            : ''
        }

        ${
          item.siblingCompatibility
            ? `<p><strong>Sibling Compatibility:</strong> ${item.siblingCompatibility}</p>`
            : ''
        }
      </div>
    `
    )
    .join('');

  printWindow.document.write(`
    <html>
      <head>
        <title>Saved Baby Names</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #1f2937;
            line-height: 1.5;
          }

          .logo {
            text-align: center;
            margin-bottom: 24px;
          }

          .logo img {
            max-width: 220px;
          }

          h1 {
            text-align: center;
            margin-bottom: 24px;
          }

          .criteria {
            border: 1px solid #d6d3d1;
            background: #f9fafb;
            border-radius: 16px;
            padding: 22px;
            margin-bottom: 30px;
          }

          .criteria h2 {
            margin-top: 0;
          }

          .card {
            border: 1px solid #ddd;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 24px;
            page-break-inside: avoid;
          }

          .card h2 {
            margin-top: 0;
            font-size: 28px;
          }

          @media print {
            body {
              padding: 24px;
            }
          }
        </style>
      </head>

      <body>
        <div class="logo">
          <img src="/name-beginnings-logo.png" />
        </div>

        <h1>Saved Baby Names</h1>

        ${searchCriteriaHtml}

        <h2>Saved Names</h2>

        ${savedHtml || '<p>No names saved yet.</p>'}

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
};

  const generateSimilarNames = async (result: NameResult) => {
    setSimilarLoadingName(result.name);

    try {
      const response = await fetch('/api/similar-names', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      });

      const data = await response.json();

      if (data.names) {
        setPreviousResults(results);
        setResults(data.names);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('No similar names were returned. Please try again.');
      }
    } catch (error) {
      console.error('Similar names error:', error);
      alert('Sorry, something went wrong while finding similar names.');
    } finally {
      setSimilarLoadingName(null);
    }
  };






  const isNameSaved = (name: string) => {
    
	return savedNames.some((saved) => saved.name === name);
  };
  const namesToShow = results.length > 0 ? results : exampleResults;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-emerald-50 p-6 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <img
            src="/name-beginnings-logo.png"
            alt="Name Beginnings logo"
            className="mx-auto mb-6 max-h-52 rounded-3xl shadow-xl"
          />

          <h1 className="mb-4 text-5xl font-bold text-slate-900">
            Baby Name Finder
          </h1>
		  
          {savedNames.length > 0 && (
            <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-800">
             ⭐ {savedNames.length} favorite{savedNames.length === 1 ? '' : 's'} saved
            </div>
          )}


          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Discover meaningful baby names tailored to your family, preferences,
            and cultural style.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-dashed border-stone-300 bg-white/70 p-3 text-center shadow">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Advertisement
          </p>
          <div className="flex h-16 items-center justify-center rounded-xl bg-stone-100 text-slate-400">
            Google Ad Placeholder
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white/85 p-8 shadow-xl">
            <h2 className="mb-6 text-2xl font-semibold">
              Tell Us About Your Family
            </h2>

            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  placeholder="Parent 1 First Name"
                  className="rounded-2xl border p-3"
                  value={formData.parent1First}
                  onChange={(e) =>
                    setFormData({ ...formData, parent1First: e.target.value })
                  }
                />
                <input
                  placeholder="Parent 1 Middle Name"
                  className="rounded-2xl border p-3"
                  value={formData.parent1Middle}
                  onChange={(e) =>
                    setFormData({ ...formData, parent1Middle: e.target.value })
                  }
                />
                <input
                  placeholder="Parent 2 First Name"
                  className="rounded-2xl border p-3"
                  value={formData.parent2First}
                  onChange={(e) =>
                    setFormData({ ...formData, parent2First: e.target.value })
                  }
                />
                <input
                  placeholder="Parent 2 Middle Name"
                  className="rounded-2xl border p-3"
                  value={formData.parent2Middle}
                  onChange={(e) =>
                    setFormData({ ...formData, parent2Middle: e.target.value })
                  }
                />
              </div>

              {[
                ['gender', 'Baby Gender', ['Boy', 'Girl', 'Neutral', 'Surprise Me']],
                ['style', 'Name Style', ['Classic', 'Modern', 'Unique', 'Elegant', 'Strong', 'Nature-Inspired']],
                ['length', 'Name Length', ['Short', 'Medium', 'Long', 'No Preference']],
                ['popularity', 'Popularity', ['Popular', 'Balanced', 'Uncommon', 'Rare']],
              ].map(([key, label, options]) => (
                <div key={key as string}>
                  <label className="mb-2 block text-sm font-medium">
                    {label as string}
                  </label>
                  <select
                    className="w-full rounded-2xl border p-3"
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key as string]: e.target.value })
                    }
                  >
                    <option value="">Select an option</option>
                    {(options as string[]).map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}

              <div>
                <label className="mb-3 block text-sm font-medium">
                  Preferred Origins
                </label>
                <div className="flex flex-wrap gap-2 rounded-3xl border bg-white p-4">
                  {originOptions.map((origin) => {
                    const selected = selectedOrigins.includes(origin);

                    return (
                      <button
                        key={origin}
                        type="button"
                        onClick={() => toggleOrigin(origin)}
                        className={
                          selected
                            ? 'rounded-full bg-emerald-600 px-4 py-2 text-sm text-white'
                            : 'rounded-full bg-stone-100 px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50'
                        }
                      >
                        {selected ? `✓ ${origin}` : origin}
                      </button>
                    );
                  })}
                </div>
              </div>

              <textarea
                rows={4}
                placeholder="Extra notes"
                className="w-full rounded-2xl border p-3"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />

              <button
                onClick={findNames}
                disabled={isLoading}
                className="w-full rounded-2xl bg-slate-900 py-4 text-lg font-semibold text-white disabled:opacity-60"
              >
                {isLoading ? 'Finding Names...' : 'Find Names'}
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white/85 p-8 shadow-xl">


            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                Suggested Names
              </h2>

              {previousResults.length > 0 && (
                <button
                  onClick={() => {
                    setResults(previousResults);
                    setPreviousResults([]);
                  }}
                  className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-stone-50"
                >
                  ← Back
                </button>
              )}
            </div>



            <div className="space-y-5">
              {namesToShow.map((result) => (
                <div key={result.name} className="rounded-3xl border bg-white p-6">
                  <h3 className="text-2xl font-bold">{result.name}</h3>
                  <p className="text-sm text-slate-500">{result.origin} Origin</p>

                  <p className="mt-3">
                    <strong>Meaning:</strong> {result.meaning}
                  </p>
                  <p>
                    <strong>Vibe:</strong> {result.vibe}
                  </p>
				  {result.whySelected && (
					<p>
						<strong>Why selected:</strong> {result.whySelected}
					</p>
				)}

				{result.popularity && (	
					<p>
						<strong>Popularity:</strong> {result.popularity}
					</p>
				)}

				{result.nicknames && result.nicknames.length > 0 && (
					<p>
						<strong>Nicknames:</strong> {result.nicknames.join(', ')}
					</p>
				)}

				{result.siblingCompatibility && (
					<p>
						<strong>Sibling compatibility:</strong> {result.siblingCompatibility}
					</p>
				)}	



				

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => saveName(result)}
                disabled={isNameSaved(result.name)}
                className={
                  isNameSaved(result.name)
                    ? 'rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white'
                    : 'rounded-full border px-4 py-2 text-sm font-medium hover:bg-stone-50'
                }
              >
                {isNameSaved(result.name) ? '✓ Saved' : 'Save Name'}
              </button>

              <button
                onClick={() => generateSimilarNames(result)}
                disabled={similarLoadingName === result.name}
                className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100 disabled:opacity-60"
              >
                {similarLoadingName === result.name ? 'Finding Similar...' : 'Generate Similar Names'}
              </button>
            </div>
				  
				  
				  
				  
                </div>
              ))}
            </div>





            <div className="mt-8 rounded-3xl bg-emerald-50 p-5">
              <h3 className="mb-2 text-xl font-semibold">⭐ Saved Favorites</h3>

              <div className="mb-3 rounded-xl bg-emerald-100 p-3 text-sm text-emerald-900">
                ✓ Your saved names are automatically remembered on this device and will be available when you return.
              </div>

              <p className="mb-4 text-slate-600">
                {savedNames.length} favorite{savedNames.length === 1 ? '' : 's'} saved
              </p>

              {savedNames.length > 0 && (
                <div className="mb-5 max-h-64 space-y-3 overflow-y-auto rounded-2xl bg-white p-4">
				  {savedNames.map((saved) => (
                    <div
                      key={saved.name}
                      className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <button
                            onClick={() => setSelectedFavorite(saved)}
                            className="text-left font-semibold text-slate-900 hover:text-emerald-700"
                          >
                            {saved.name}
                          </button>

                          <p className="text-sm text-slate-600">{saved.origin} Origin</p>
                        </div>

                        <button
                          onClick={() =>
                            setSavedNames((current) =>
                              current.filter((item) => item.name !== saved.name)
                            )
                          }
                          className="text-sm font-medium text-slate-400 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>

                      <p className="mt-2 text-sm text-slate-600">
                        {saved.meaning}
                      </p>
                    </div>
                  ))}
 				  
                </div>
              )}
			  
		      {selectedFavorite && (
                <div className="mb-5 rounded-2xl bg-white p-4 text-sm space-y-2">
                  <h4 className="text-lg font-semibold text-slate-900">
                    {selectedFavorite.name}
                  </h4>

                  <p>
                    <strong>Meaning:</strong> {selectedFavorite.meaning}
                  </p>

                  <p>
                    <strong>Origin:</strong> {selectedFavorite.origin}
                  </p>

                  <p>
                    <strong>Vibe:</strong> {selectedFavorite.vibe}
                  </p>

                  {selectedFavorite.whySelected && (
                    <p>
                      <strong>Why Selected:</strong> {selectedFavorite.whySelected}
                    </p>
                  )}

                  {selectedFavorite.popularity && (
                    <p>
                      <strong>Popularity:</strong> {selectedFavorite.popularity}
                    </p>
                  )}

                  {selectedFavorite.nicknames?.length && (
                    <p>
                      <strong>Nicknames:</strong> {selectedFavorite.nicknames.join(', ')}
                    </p>
                  )}

                  {selectedFavorite.siblingCompatibility && (
                    <p>
                      <strong>Sibling Compatibility:</strong>{' '}
                      {selectedFavorite.siblingCompatibility}
                    </p>
                  )}
                </div>
              )}	  

              <button
                onClick={createPdf}
                disabled={savedNames.length === 0}
                className="w-full rounded-2xl bg-emerald-700 py-3 font-semibold text-white disabled:opacity-50"
              >
                Create PDF / Print
              </button>

              <button
                onClick={() => {
				setSavedNames([]);
				setSelectedFavorite(null);
				}}
                disabled={savedNames.length === 0}
                className="mt-3 w-full rounded-2xl border border-emerald-700 py-3 font-semibold text-emerald-800 hover:bg-emerald-100 disabled:opacity-50"
              >
                Clear Saved Names
              </button>
            </div>
			
			
			
			
          </div>
        </div>

        <section className="mt-12 rounded-3xl bg-white/85 p-8 shadow-xl">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Why Choose BabezNamez?
          </h2>

          <p className="mb-6 text-slate-600">
            Finding the perfect baby name is one of the most exciting parts of preparing
            for a new arrival. BabezNamez combines the creativity of artificial
            intelligence with meaningful name information to help parents discover names
            they&apos;ll love.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                AI-Powered Name Discovery
              </h3>
              <p className="text-slate-600">
                Generate thoughtful baby name suggestions based on gender, style,
                origin, popularity, and name length.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Explore Meaning and Origin
              </h3>
              <p className="text-slate-600">
                Each suggested name includes helpful meaning and origin details so you
                can choose with confidence.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Discover Similar Names
              </h3>
              <p className="text-slate-600">
                Love a name but want more ideas? Generate similar names instantly and
                keep exploring.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Save Your Favorites
              </h3>
              <p className="text-slate-600">
                Build a personalized shortlist of favorite names and revisit them later
                on the same device.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Print or Save Your List
              </h3>
              <p className="text-slate-600">
                Create a printable PDF of your favorite names and search preferences to
                share or keep.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Designed for Every Family
              </h3>
              <p className="text-slate-600">
                Explore classic, modern, unique, elegant, strong, and nature-inspired
                names in a welcoming experience.
              </p>
            </div>
          </div>
        </section>











        <footer className="mt-12 border-t border-stone-200 pt-6 text-center text-sm text-slate-500">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/privacy" className="hover:text-emerald-700">
              Privacy Policy
            </a>

            <a href="/terms" className="hover:text-emerald-700">
              Terms of Use
            </a>

            <a href="/contact" className="hover:text-emerald-700">
              Contact
            </a>
			
			<a href="/about" className="hover:text-emerald-700">
              About
            </a>
			
          </div>

          <p className="mt-4">
            © {new Date().getFullYear()} Baby Name Finder. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}