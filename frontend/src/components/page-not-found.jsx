const PageNotFound = () => {
  return (
    <section class="bg-white">
      <div class="py-8 px-4 mx-auto max-w-screen-xl h-screen lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center flex items-center justify-center flex-col">
          <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-zinc-600">
            404
          </h1>
          <p class="mb-4 text-3xl tracking-tight font-bold text-zinc-900 md:text-4xl">
            Something's missing.
          </p>
          <p class="mb-4 text-lg font-light text-zinc-500">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <a
            href="/"
            className="h-8 max-w-xs flex justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
