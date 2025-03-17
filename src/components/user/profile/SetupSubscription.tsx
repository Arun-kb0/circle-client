import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { setUserSubscriptionPlan } from '../../../features/payment/paymentApi';
import { UserSubscriptionPlanType } from '../../../constants/types';

type Props = {
  plan: UserSubscriptionPlanType | null
}

type FormValues = {
  monthly: number
  yearly: number
  lifetime: number
};


const SetupSubscription = ({ plan }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      monthly: plan ? plan.monthly : 200,
      yearly: plan ? plan.yearly : 1000,
      lifetime: plan ? plan.lifetime : 5000,
    },
  });

  const patternForInputs = {
    value: /^[0-9]*$/,
    message: "Only numbers are allowed",
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('setup subscriptions form data')
    const convertedData = {
      monthly: Number(data.monthly),
      yearly: Number(data.yearly),
      lifetime: Number(data.lifetime),
    }
    dispatch(setUserSubscriptionPlan(convertedData))
  }

  return (
    <div className='space-y-5'>
      <h5 className='text-lg font-semibold text-center capitalize'> setup subscription</h5>
      <div className='card-with-shadow p-4'>
        <span className='text-red-400 text-center text-md'>Read this before setting up subscription</span>
        <p>
          Please set the subscription amounts for each duration.
          By default, the subscription amounts are as follows:
          <br />
          <strong>Monthly:</strong>₹{200},
          <strong>Yearly:</strong> ₹{1000},
          <strong>Lifetime:</strong> ₹{5000}.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <article className="flex items-center mb-4">
          <div className="flex-1 min-w-0 ms-4">
            <label htmlFor="monthly" className="text-sm font-medium text-gray-900 truncate dark:text-white" >
              Monthly
            </label>
          </div>
          <div className="flex-1 min-w-0 ms-4 items-center">
            <div className='flex gap-1 items-center'>
              <h5 className='text-xl'>₹</h5>
              <input
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                id="monthly"
                {...register("monthly", {
                  pattern: patternForInputs
                })}
              />
            </div>
            {errors.monthly &&
              <p className="mt-2 text-sm text-red-600 dark:text-red-500"> {String(errors.monthly?.message)}</p>
            }
          </div>
        </article>
        <article className="flex items-center mb-4">
          <div className="flex-1 min-w-0 ms-4">
            <label htmlFor="yearly" className="text-sm font-medium text-gray-900 truncate dark:text-white" >
              Yearly
            </label>
          </div>
          <div className="flex-1 min-w-0 ms-4 items-center">
            <div className='flex gap-1 items-center'>
              <h5 className='text-xl'>₹</h5>
              <input
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                id="yearly"
                {...register("yearly", {
                  pattern: patternForInputs
                })}
              />
            </div>
            {errors.yearly &&
              <p className="mt-2 text-sm text-red-600 dark:text-red-500"> {String(errors.yearly?.message)}</p>
            }
          </div>
        </article>
        <article className="flex items-center mb-4">
          <div className="flex-1 min-w-0 ms-4">
            <label htmlFor="lifetime" className="text-sm font-medium text-gray-900 truncate dark:text-white" >
              Lifetime
            </label>
          </div>
          <div className="flex-1 min-w-0 ms-4 items-center">
            <div className='flex gap-1 items-center'>
              <h5 className='text-xl'>₹</h5>
              <input
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                id="lifetime"
                {...register("lifetime", {
                  pattern: patternForInputs
                })}
              />
            </div>
            {errors.lifetime &&
              <p className="mt-2 text-sm text-red-600 dark:text-red-500"> {String(errors.lifetime?.message)}</p>
            }
          </div>
        </article>

        <div className='flex justify-center items-center'>
          <button type='submit' className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">setup subscription</span>
          </button>
        </div>

      </form>
    </div>
  )
}

export default SetupSubscription