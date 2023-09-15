import { IconGradient } from "~/components/icon.tsx";
import { TrackingLink } from "~/components/tracking-link.tsx";

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
        While CockroachDB is great for handling distributed transactions and
        storing your data, here are some more features to take your project to
        the next level.
      </section>
      <section className="mx-auto max-w-5xl px-4 py-6">
        <h2 className="-ml-4 mb-2 font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          <IconGradient className="mr-1 inline-block h-9 w-9" name="globe" />{" "}
          Geo-partition data in multi-region clusters
        </h2>
        <p className="mb-4 text-gray-800">
          Multi-region capabilities make it easier to run global applications.
          Data can be stored in different geographic regions by table or table
          row. Data can also be replicated globally.
          <br />
          <TrackingLink
            className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
            href="https://www.cockroachlabs.com/docs/stable/multiregion-overview"
          >
            Learn More...
          </TrackingLink>
        </p>
        <div className="md:flex">
          <figure className="md:basis-1/2">
            <figcaption className="mb-1.5 font-semibold text-crl-deep-purple">
              Use Cases
            </figcaption>
            <ul className="list-disc pl-4 text-sm">
              <li>
                Keep user data in a region close to the application deployment
                they use
              </li>
              <li>Globally replicate a table of i18n translations</li>
              <li>
                Lock data to geographic data centers for compliance reason, i.e.
                GDPR
              </li>
            </ul>
          </figure>
          <figure className="md:basis-1/2">
            <figcaption className="mb-1.5 font-semibold text-crl-deep-purple">
              More Resources
            </figcaption>
            <ul className="list-disc pl-4 text-sm">
              <li>
                <a
                  className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                  href="https://www.youtube.com/watch?v=qoexXvuHNfI"
                >
                  Video:How to set up a multi-region CockroachDB serverless
                  cluster
                </a>
              </li>
              <li>
                <a
                  className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                  href="https://www.youtube.com/watch?v=a7PbyoOAAAk"
                >
                  Video: What is Data Residency? Data partitioning demo for
                  global database
                </a>
              </li>
              <li>
                <a
                  className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                  href="https://www.youtube.com/watch?v=3gmF_yXj3q8"
                >
                  Video: Multi-Region CockroachDB Serverless | Why Regional
                  Tables are useful
                </a>
              </li>
              <li>
                <a
                  className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                  href="https://www.youtube.com/watch?v=sO1Mr0Gmde0"
                >
                  Video: Low latency with server and data location in
                  multi-region serverless DB
                </a>
              </li>
              <li>
                <TrackingLink
                  className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                  href="https://www.cockroachlabs.com/demos/demo-data-residency/app/"
                >
                  Demo: The Art of Data Residency
                </TrackingLink>
              </li>
            </ul>
          </figure>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-6">
        <h2 className="-ml-4 mb-2 font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          <IconGradient
            className="mr-1 inline-block h-9 w-9 stroke-current"
            name="alarm-clock"
          />{" "}
          Row-level Time to Live (TTL)
        </h2>
        <p className="mb-4 text-gray-800">
          Set rows of a table to expire based on a time expression. Let
          CockroachDB handle removing no longer needed data. This helps prevent
          unbound table grow without the need for extra code.
          <br />
          <TrackingLink
            className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
            href="https://www.cockroachlabs.com/docs/stable/row-level-ttl"
          >
            Learn More...
          </TrackingLink>
        </p>
        <div className="md:flex">
          <figure className="md:basis-1/2">
            <figcaption className="mb-1.5 font-semibold text-crl-deep-purple">
              Use Cases
            </figcaption>
            <ul className="list-disc pl-4 text-sm">
              <li>
                Delete sensor readings after 30 days to create a sliding window
                of data.
              </li>
              <li>
                Remove user accounts that are unverified or haven't changed
                their temporary password after 7 days.
              </li>
              <li>Set a message to expire 1 hour after being read.</li>
            </ul>
          </figure>
          <figure className="md:basis-1/2">
            <figcaption className="mb-1.5 font-semibold text-crl-deep-purple">
              More Resources
            </figcaption>
            <ul className="list-disc pl-4 text-sm">
              <li>
                <TrackingLink
                  className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                  href="https://www.cockroachlabs.com/blog/abandoned-cart-problem/"
                >
                  Blog Post: How to solve the `abandoned cart problem` using
                  row-level TTL
                </TrackingLink>
              </li>
            </ul>
          </figure>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-6">
        <h2 className="-ml-4 mb-2 font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          <IconGradient
            className="mr-1 inline-block h-9 w-9 stroke-current"
            name="binary"
          />{" "}
          Stream Data
        </h2>
        <p className="mb-4 text-gray-800">
          Use Change Data Capture (CDC) to stream data as message to a
          configurable destination when a row-level change is detected.
          <br />
          <TrackingLink
            className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
            href="https://www.cockroachlabs.com/docs/stable/change-data-capture-overview"
          >
            Learn More...
          </TrackingLink>
          .
        </p>
        <div className="md:flex">
          <figure className="md:basis-1/2">
            <figcaption className="mb-1.5 font-semibold text-crl-deep-purple">
              Use Cases
            </figcaption>
            <ul className="list-disc pl-4 text-sm">
              <li>
                Add real-time capabilities to your website using a combination
                of WebHooks and WebSockets/Server-Sent Events
              </li>
              <li>Stream messages to Kafka or PubSub to trigger events</li>
              <li>Send updates to data stores for machine learning models</li>
            </ul>
          </figure>
          <figure className="md:basis-1/2">
            <figcaption className="mb-1.5 font-semibold text-crl-deep-purple">
              More Resources
            </figcaption>
            <ul className="list-disc pl-4 text-sm">
              <li>
                <a
                  className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                  href="https://youtu.be/ppB_GLbfFHo?si=fNZN-AK_-xx1xl-w"
                >
                  Video: Why use Change Data Capture | Batch Data vs Streaming
                  Data
                </a>
              </li>
              <li>
                <a
                  className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                  href="https://www.youtube.com/watch?v=UXsKuXbkjws"
                >
                  Video: How to use changefeeds to export data out of
                  CockroachDB
                </a>
              </li>
              <li>
                <a
                  className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                  href="https://www.youtube.com/watch?v=mea4czXi7tI"
                >
                  Video: How to use CockroachDB's CDC Queries feature
                </a>
              </li>
            </ul>
          </figure>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-6">
        <h2 className="-ml-4 mb-2 font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          <IconGradient
            className="mr-1 inline-block h-9 w-9 stroke-current"
            name="file-json"
          />{" "}
          CockroachDB as a Document Database
        </h2>
        <p className="mb-4 text-gray-800">
          While CockroachDB is primarily a relational database, sometimes you
          need to store and work with JSON data. JSON support using the JSONB
          column type will allow you to optimally read and write data in a table
          row.
          <br />
          <TrackingLink
            className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
            href="https://www.cockroachlabs.com/docs/stable/jsonb"
          >
            Learn More...
          </TrackingLink>
        </p>
        <div className="md:flex">
          <figure className="md:basis-1/2">
            <figcaption className="mb-1.5 font-semibold text-crl-deep-purple">
              Use Cases
            </figcaption>
            <ul className="list-disc pl-4 text-sm">
              <li>
                Store the result of an API call where the data has a variable
                structure
              </li>
              <li>
                Store application and user preferences in a UI friendly manner
              </li>
              <li>Store flexible data snapshots</li>
            </ul>
          </figure>
          <figure className="md:basis-1/2">
            <figcaption className="mb-1.5 font-semibold text-crl-deep-purple">
              More Resources
            </figcaption>
            <ul className="list-disc pl-4 text-sm">
              <li>
                <a
                  className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                  href="https://www.youtube.com/watch?v=FUW2HTwM1_Y"
                >
                  Live Stream: Distributed Tea Time: Wrangling API JSON like a
                  Pro
                </a>
              </li>
            </ul>
          </figure>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-6">
        <h2 className="-ml-4 mb-2 font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          <IconGradient
            className="mr-1 inline-block h-9 w-9 stroke-current"
            name="search"
          />{" "}
          Full Text Search
        </h2>
        <p className="mb-4 text-gray-800">
          Perform natural-language searches on documents such as articles,
          websites, or other written formats.
          <br />
          <TrackingLink
            className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
            href="https://www.cockroachlabs.com/docs/stable/full-text-search"
          >
            Learn More...
          </TrackingLink>
        </p>
        <div className="md:flex">
          <figure className="md:basis-1/2">
            <figcaption className="mb-1.5 font-semibold text-crl-deep-purple">
              Use Cases
            </figcaption>
            <ul className="list-disc pl-4 text-sm">
              <li>Search contents of blog posts and other article-type data</li>
              <li>Search a list of products using their description</li>
              <li>Show search result rankings</li>
            </ul>
          </figure>
          <figure className="md:basis-1/2">
            <figcaption className="mb-1.5 font-semibold text-crl-deep-purple">
              More Resources
            </figcaption>
            <ul className="list-disc pl-4 text-sm">
              <li>
                <a
                  className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                  href="https://goddard.hashnode.dev/good-enough-text-search"
                  rel="noreferrer"
                  target="_blank"
                >
                  Blog: Good Enough Text Search
                </a>
              </li>
            </ul>
          </figure>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-6">
        <h2 className="-ml-4 mb-2 font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          <IconGradient
            className="mr-1 inline-block h-9 w-9 stroke-current"
            name="map-pin"
          />{" "}
          Working with Spatial Data
        </h2>
        <p className="mb-4 text-gray-800">
          Efficiently store and query spatial data.
          <br />
          <TrackingLink
            className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
            href="https://www.cockroachlabs.com/docs/stable/spatial-data-overview"
          >
            Learn More...
          </TrackingLink>
        </p>
        <div className="md:flex">
          <figure className="md:basis-1/2">
            <figcaption className="mb-1.5 font-semibold text-crl-deep-purple">
              Use Cases
            </figcaption>
            <ul className="list-disc pl-4 text-sm">
              <li>Search for stored locations in a geo-fenced area</li>
              <li>Find locations within a radius of another location</li>
              <li>Find the overlaps of two geometry regions</li>
            </ul>
          </figure>
          <figure className="md:basis-1/2">
            <figcaption className="mb-1.5 font-semibold text-crl-deep-purple">
              More Resources
            </figcaption>
            <ul className="list-disc pl-4 text-sm">
              <li>
                <a
                  className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                  href="https://gist.github.com/codingconcepts/0d4c8e5264b5634f4ab2e4ce8ddeae09"
                  rel="noreferrer"
                  target="_blank"
                >
                  Sample Code: Filtering based on Location
                </a>
              </li>
            </ul>
          </figure>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-6">
        <h2 className="-ml-4 mb-2 font-poppins text-3xl font-bold leading-none tracking-tight text-crl-deep-purple">
          <IconGradient
            className="mr-1 inline-block h-9 w-9 stroke-current"
            name="brain"
          />{" "}
          Intelligent Insights
        </h2>
        <p className="mb-4 text-gray-800">
          Intelligent Insights exposes problems that CockroachDB has detected in
          your workloads and schemas. It also offers recommendations to improve
          the performance of your workloads.
          <br />
          <TrackingLink
            className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
            href="https://www.cockroachlabs.com/docs/stable/ui-insights-page"
          >
            Learn More...
          </TrackingLink>
        </p>
        <div className="md:flex">
          <figure className="md:basis-1/2">
            <figcaption className="mb-1.5 font-semibold text-crl-deep-purple">
              Use Cases
            </figcaption>
            <ul className="list-disc pl-4 text-sm">
              <li>
                Identify SQL statements with high retry counts, slow execution,
                or suboptimal plans.
              </li>
              <li>
                Identify indexes that should be created, altered, replaced, or
                dropped to improve performance.
              </li>
            </ul>
          </figure>
          <figure className="md:basis-1/2">
            <figcaption className="mb-1.5 font-semibold text-crl-deep-purple">
              More Resources
            </figcaption>
            <ul className="list-disc pl-4 text-sm">
              <li>
                <a
                  className="text-crl-electric-purple hover:text-crl-action-blue hover:underline"
                  href="https://youtu.be/1Twb3Q84_Gs?si=eMm2_Foe9QEDPXOd"
                >
                  Video: Intelligent Insights Demo: How to find, fix, and
                  prevent slow queries
                </a>
              </li>
            </ul>
          </figure>
        </div>
      </section>
    </>
  );
}
