import React from 'react';
import { Grid3x3 } from 'lucide-react';

const OtherServices: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
          <Grid3x3 className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Other Services
          </h1>
          <p className="text-gray-400 mt-1">
            Additional tools and utilities for the Solana ecosystem
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-2">Staking</h3>
          <p className="text-gray-400 text-sm">Stake SOL and earn rewards while securing the network</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-2">DeFi Integration</h3>
          <p className="text-gray-400 text-sm">Connect with decentralized finance protocols</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-2">Network Explorer</h3>
          <p className="text-gray-400 text-sm">Explore blocks, transactions, and network statistics</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-2">Developer Tools</h3>
          <p className="text-gray-400 text-sm">Access APIs and utilities for building on Solana</p>
        </div>
      </div>
    </div>
  );
};

export default OtherServices;
