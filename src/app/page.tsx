"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { sdk } from "@farcaster/miniapp-sdk";
import { CONTRACT_ADDRESS, ABI } from "../lib/contract";

export default function Home() {
  const [parties, setParties] = useState<string[]>([]);
  const [votes, setVotes] = useState<number[]>([]);
  const [status, setStatus] = useState("");

  const RPC_URL = "https://base-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY"; // EDIT THIS
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  useEffect(() => {
    (async () => {
      try {
        await sdk.actions.ready();
      } catch {}
    })();
    fetchVotes();
  }, []);

  async function fetchVotes() {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const p = await contract.getParties();
      const r = await contract.getResults();
      setParties(p);
      setVotes(r.map((x: any) => Number(x)));
    } catch (e) {
      setStatus("⚠️ Could not fetch votes");
    }
  }

  async function vote(index: number) {
    try {
      const ethProvider = await sdk.wallet.getEthereumProvider();
      const signerProvider = new ethers.BrowserProvider(ethProvider);
      const signer = await signerProvider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const tx = await contract.vote(index);
      await tx.wait();
      setStatus("✅ Vote confirmed!");
      fetchVotes();
    } catch (e) {
      setStatus("⚠️ Transaction failed or already voted");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">🗳 Voting</h1>

      <div className="w-full max-w-sm space-y-3">
        {parties.map((p, i) => (
          <div key={i} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
            <span>{p} — {votes[i] ?? 0} votes</span>
            <button
              onClick={() => vote(i)}
              className="ml-2 px-3 py-1 bg-white text-black rounded hover:bg-gray-200"
            >
              Vote
            </button>
          </div>
        ))}
      </div>

      {status && <p className="mt-4 text-sm text-yellow-400">{status}</p>}

      <footer className="mt-8 text-xs text-gray-400">⚡ Created By Legendxkilla</footer>
    </div>
  );
}