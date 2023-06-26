import React from 'react';

function SuccessPage() {
  return (
    <section className="bg-gray-900 from-transparent">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-gray-900 rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Success!
          </h2>
          <p className="text-white text-sm">Please check your email for further instructions.</p>
        </div>
      </div>
    </section>
  );
}

export default SuccessPage;