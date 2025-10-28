import { CheckCircle2 } from "lucide-react";

export function Success() {
  return (
    <div className="text-xs bg-[#0A3713] max-w-max px-2 py-1 rounded-full font-extrathin flex items-center gap-[0.5rem]">
      {' '}
      <div>
        {' '}
        <CheckCircle2 size={15} strokeWidth={1} />{' '}
      </div>{' '}
      <div>
        {' '}
        <h1>SUCCESS</h1>{' '}
      </div>{' '}
    </div>
  );
}