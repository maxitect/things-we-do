import { ArrowRightIcon, WrenchIcon } from "@heroicons/react/24/solid";
import {
  PresentationChartLineIcon,
  EllipsisHorizontalCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-twd-background text-white min-h-screen px-8 py-4">
      <h2 className="text-2xl text-center font-semibold mb-4">Hello There!</h2>
      <p className="text-lg font-thin mb-1">Gain awareness and autonomy over what you are feeling and doing:</p>
      
      {/* Decision maker block */}
      <div className="mt-6">
        <div className="pt-2">
          <div className="flex items-center space-x-2 mb-4">
            <PresentationChartLineIcon className="w-5 h-5" />
            <h2 className="text-xl mb-0">Decision maker</h2>
          </div>
          
          <p className="text-base mb-1">
            Work out how your decision might affect how you feel, find out if it&apos;s important, and what you can do about it.
          </p>
          <div className="flex justify-center">
            <Image
              src="/drawings/maker.svg"
              alt="Decision maker drawing"
              className="object-contain"
              layout="fixed"
              width={64} 
              height={64}
              priority
            />
          </div>
        </div>
    
        <>
          <Image
            src="/images/decisionMaker.png"
            alt="Decision maker cube"
            className="object-cover"
            layout="responsive"
            width={100}
            height={76}
            priority
          />
          <Link href="/moods">
            <button
              className="absolute bg-twd-primary-purple rounded-full text-white py-2 px-4 flex items-center gap-2"
              style={{
                top: "78%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="text-base font-medium">Decision maker</span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </Link>
          
        </>
      </div>

      {/* Toolkit block */}
      <div className="mt-6">
        <div className="pt-2">
          <h2 className="text-xl mb-4">Toolkit</h2>
          <p className="text-base mb-1">
            Create a Toolkit of what helps when you are overwhelmed:
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 max-w-6xl w-full">
          <div className="flex flex-col h-full justify-center relative">
            <div className="flex justify-center">
              <WrenchIcon className="w-5 h-5" />
            </div>

            <div className="text">
              <p className="text-base">
                Create a <span className="font-bold">Toolkit</span> of things that help
              </p>
            </div>

            <div className="h-1/4 flex items-start">
              <Link href="/toolkit">
                <button className="bg-twd-primary-purple text-white py-2 px-4 rounded-full flex items-center gap-2">
                  <span className="text-base font-medium">Go to Toolkit</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </Link>
              
            </div>
          </div>


          <div className="grid grid-rows-2 gap-6">
            <div className="flex justify-center">
              <Image 
                src="/drawings/toolkit.svg" 
                alt="Toolkit drawing" 
                className="max-w-xs object-contain" 
                layout="responsive"
                width={80}
                height={80}
                priority />
            </div>

            <div className="flex justify-center">
              <Image 
                src="/images/toolkit_screen.png" 
                alt="Toolkit screenshot" 
                className="max-w-sm object-contain rounded-lg shadow-md"
                layout="responsive" 
                width={2}
                height={3}
                priority/>
            </div>
          </div>
        </div>
      </div>


      {/* Needs block */}
      <div className="mt-6">
        <div className="pt-2">
          <h2 className="text-xl mb-4">Needs</h2>
          <p className="text-base mb-1">
            Improve your mood by identifying what you need and how to get it:
          </p>
          <div className="bg-twd-secondary-purple mx-auto mt-4 mb-4 py-4 w-3/4 h-3/4 flex flex-col items-center justify-center rounded-lg">
            <EllipsisHorizontalCircleIcon className="w-8 h-8 mb-4" />
            
            <p className="text-base font-medium mb-4" >What do I need right now?</p>
            
            <Link href="/needs">
              <button className="bg-twd-primary-purple text-white py-2 px-6 rounded-full flex items-center gap-2">
                <span className="text-sm font-medium">Go to Needs</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </Link>
          </div>
          <div className="flex justify-center mb-4">
              <Image 
                src="/drawings/needs.svg" 
                alt="Needs drawing" 
                layout="intrinsic"
                width={80}
                height={80}
                className="max-w-xs object-contain" 
                priority />
          </div>
        </div>
      </div>


      {/* Insights block */}
      <div className="mt-6">
        <div className="pt-2">
          <h2 className="text-xl mb-4">Insights</h2>
          <p className="text-base mb-1">
            Use the data you collect to explore patterns and trends:
          </p>  
        </div>
        <div className="relative">
          <ChartBarIcon
            className="absolute w-6 h-6 text-white"
            style={{
              top: "10%",
              left: "50%",
            }}
          />
          
          <Image
            src="/images/insights_screen.png"
            alt="Insights line graph"
            className="object-cover"
            layout="responsive"
            width={16}
            height={9}
            priority
          />

          <Link href="/insights">
            <button
              className="absolute bg-twd-primary-purple rounded-full text-white py-2 px-4 flex items-center gap-2"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", 
              }}
            >
              <span className="text-base font-medium">Go to Insights</span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </Link>
          
        </div>

        <div className="flex justify-end">
          <Image
            src="/drawings/insights.svg"
            alt="Insights drawing"
            className="object-contain"
            width={120}
            height={120}
            priority
          />
        </div>
      </div>
    </div>
  )
};