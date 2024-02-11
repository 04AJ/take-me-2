"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFlightQuery } from "@/hooks/useFlightQuery";
import { ZodType, z } from "zod";
import { useRouter } from "next/navigation";

type Input = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate: string;
};

const SearchForm = () => {
  const query = useFlightQuery();
  const router = useRouter();

  const schema = z.object({
    originLocationCode: z.string().min(1),
    destinationLocationCode: z.string().min(1),
    departureDate: z.string().min(1),
    returnDate: z.string().min(1),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Input>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<Input> = (data) => {
    query.setOriginLocationCode(data.originLocationCode);
    query.setDestinationLocationCode(data.destinationLocationCode);
    query.setDepartureDate(data.departureDate);
    query.setReturnDate(data.returnDate);
    router.push("/flights");
  };
  const [openModal, setOpenModal] = useState(false);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="flex flex-row justify-content-center w-11/12 p-5">
      {/* <div className="flex flex-col text-sm">
        <p>originLocationCode: {watch("originLocationCode")}</p>
        <p>destinationLocationCode: {watch("destinationLocationCode")}</p>
        <p>departureDate: {watch("departureDate")}</p>
        <p>returnDate: {watch("returnDate")}</p>
      </div> */}

      <div className="flex flex-row md:flex-row gap-5 text-sm">
        <div className="basis-1/2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-5">
              {/* register your input into the hook by invoking the "register" function */}

              <div className="flex flex-col">
                <label className="text-primary-red">originLocationCode*</label>
                <input
                  {...register("originLocationCode", { required: true })}
                  placeholder="originLocationCode"
                  className="p-2 rounded text-black"
                />
                {errors.originLocationCode && (
                  <span className="text-sm text-red-700">
                    {errors.originLocationCode.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-primary-red">
                  destinationLocationCode*
                </label>
                <input
                  {...register("destinationLocationCode", { required: true })}
                  placeholder="destinationLocationCode"
                  className="p-2 rounded text-black"
                />
                {errors.destinationLocationCode && (
                  <span className="text-sm text-red-700">
                    {errors.destinationLocationCode.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-primary-red">departureDate*</label>
                <input
                  {...register("departureDate", { required: true })}
                  placeholder="departureDate"
                  className="p-2 rounded text-black"
                />
                {errors.departureDate && (
                  <span className="text-sm text-red-700">
                    {errors.departureDate.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-primary-red">returnDate</label>
                <input
                  {...register("returnDate", { required: true })}
                  placeholder="returnDate"
                  className="p-2 rounded text-black"
                />
                {errors.returnDate && (
                  <span className="text-sm text-red-700">
                    {errors.returnDate.message}
                  </span>
                )}
              </div>

              <input
                type="submit"
                className="transition ease-in-out border-2 bg-primary-red text-white p-2 hover:bg-blue-700 duration-300 w-min"
                value="Find Flights"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
