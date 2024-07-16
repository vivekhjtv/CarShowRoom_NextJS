export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Order</h1>
      <div className="grid sm:px-10 lg:grid-cols-1 lg:px-20 xl:px-32">
        <div className="px-4 pt-2 ">
          <div className="text-center">
            <img
              className="h-20 w-20 rounded-md mx-auto"
              src="/images/confetti.png"
              alt=""
            />
            <p className="text-3xl mt-4 font-medium text-green-500">
              Congratulation !!
            </p>
            <p className="text-gray-400 mt-2 text-lg">
              Your Order have been booked.
            </p>
          </div>

          {/* <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <span className=" text-gray-400">Similar Items</span>
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">New Civix Honda</span>
                <span className="float-right text-gray-400">Hybrid</span>
                <p className="text-lg font-bold">$45000</p>
              </div>
            </div>
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">
                  The 2024 Honda Civic Sedan
                </span>
                <span className="float-right text-gray-400">Gas</span>
                <p className="mt-auto text-lg font-bold">$43000</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
}
