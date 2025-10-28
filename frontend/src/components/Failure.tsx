import { XCircle } from "lucide-react";

export function Failure() {
  return (
    <div className="text-xs bg-red-700 max-w-max px-2 py-1 rounded-full font-extrathin flex items-center gap-[0.5rem]">
      {' '}
      <div>
        {' '}
        <XCircle size={15} strokeWidth={1} />{' '}
      </div>{' '}
      <div>
        {' '}
        <h1>Failed</h1>{' '}
      </div>{' '}
    </div>
  );
}