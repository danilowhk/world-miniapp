import { useState, useEffect } from 'react';
import { MiniKit, ResponseEvent, MiniAppSendTransactionPayload } from '@worldcoin/minikit-js';
import { useWaitForTransactionReceipt } from '@worldcoin/minikit-react';
import { createPublicClient, http, PublicClient } from 'viem';
import { worldchain } from 'viem/chains';
import TestABI from '../../abi/Test.json';

export default function PayTransactionPage() {
  const [transactionId, setTransactionId] = useState<string>('');

  const client = createPublicClient({
    chain: worldchain,
    transport: http('https://worldchain-mainnet.g.alchemy.com/public'),
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    client: client as PublicClient,
    appConfig: {
      app_id: 'app_5163d7ca23d0d3931c0d5930134a9a4d',
    },
    transactionId: transactionId,
  });

  const sendTransactionCommand = async() => {
    const {commandPayload, finalPayload} = await MiniKit.commandsAsync.sendTransaction({
      transaction: [
        {
          address: '0xA0C794A7896285c893385B18E8BaF4F0eB87C836', // Replace with actual contract address
          abi: [{ type: "function", name: "mint", inputs: [{ name: "amount", type: "uint256", internalType: "uint256" }], outputs: [], stateMutability: "nonpayable" }],
          functionName: 'mint',
          args: ['5000000000000000000'], // 1 ether = 10^18 wei
        },
      ],
    });

    console.log(commandPayload, finalPayload);
  };

  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    MiniKit.subscribe(
      ResponseEvent.MiniAppSendTransaction,
      async (payload: MiniAppSendTransactionPayload) => {
        if (payload.status === 'error') {
          console.error('Error sending transaction', payload);
        } else {
          setTransactionId(payload.transaction_id);
        }
      }
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppSendTransaction);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm">
          <span className="text-xl">🎁</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Claim Rewards</h1>
      </div>
      
      <button 
        onClick={sendTransactionCommand} 
        disabled={isConfirming}
        className={`w-full py-3 px-6 rounded-xl font-medium text-white transition-all
          ${isConfirming 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'
          }`}
      >
        {isConfirming ? 'Confirming...' : 'Send Transaction'}
      </button>
      
      {isConfirmed && (
        <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-xl">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-green-700 font-medium">Transaction Confirmed!</p>
          </div>
        </div>
      )}
    </div>
  );
}