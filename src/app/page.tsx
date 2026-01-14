import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Share Your Build. Track Your Mods.
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          CopyMod is the link-in-bio platform for car creators. Publish your
          build pages, showcase your mod lists, track clicks, and generate
          install quote leads.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/builds/new"
            className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg"
          >
            Create Your Build
          </Link>
          <Link
            href="/builds"
            className="border border-gray-300 text-gray-700 py-3 px-8 rounded-lg font-medium hover:bg-gray-50 transition-colors text-lg"
          >
            Browse Builds
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Create Your Profile</h3>
              <p className="text-gray-600">
                Get your unique @username URL to share across social media
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Add Your Builds</h3>
              <p className="text-gray-600">
                Upload photos and list every mod with trackable links
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Generate Leads</h3>
              <p className="text-gray-600">
                Visitors can request quotes and find installers near them
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">For Creators & Shops</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a car enthusiast showcasing your build or a shop
            looking to connect with customers, CopyMod brings everyone together.
          </p>
          <Link
            href="/builds/new"
            className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </main>
  );
}
