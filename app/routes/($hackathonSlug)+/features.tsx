export default function Features() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 bg-hero-pattern bg-cover bg-no-repeat p-4 text-white">
        <h1 className="font-poppins text-4xl font-bold leading-none tracking-tight">
          Cool Features
        </h1>
        <code className="text-center font-mono text-xl">
          &#47;* Evolve your app */
        </code>
      </div>

      <section className="mx-auto max-w-5xl p-4">
        <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          Multi-region
        </h2>
        <p>More details...</p>
      </section>
      <section className="mx-auto max-w-4xl p-4">
        <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          Geo Partitioning
        </h2>
        <p>More details...</p>
      </section>
      <section className="mx-auto max-w-4xl p-4">
        <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          Row-level TTL
        </h2>
        <p>More details...</p>
      </section>
      <section className="mx-auto max-w-4xl p-4">
        <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          Change Data Capture
        </h2>
        <p>More details...</p>
      </section>
      <section className="mx-auto max-w-4xl p-4">
        <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          CockroachDB as a Document Database
        </h2>
        <p>More details... Working with JSON</p>
      </section>
      <section className="mx-auto max-w-4xl p-4">
        <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          Full Text Search
        </h2>
        <p>More details...</p>
      </section>
      <section className="mx-auto max-w-4xl p-4">
        <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          Working with Spatial Data
        </h2>
        <p>More details...</p>
      </section>
      <section className="mx-auto max-w-4xl p-4">
        <h2 className="font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          Intelligent Insights
        </h2>
        <p>More details...</p>
      </section>
    </>
  );
}
