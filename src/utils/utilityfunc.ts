import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import {
  confirmTransactionFromBackend,
  confirmTransactionFromFrontend,
} from "./shyft";

export async function signAndConfirmTransaction(
  network: any,
  transaction: any,
  callback: any,
  prvKey: any
) {
  const phantom = new PhantomWalletAdapter();
  await phantom.connect();
  const rpcUrl = clusterApiUrl(network);
  const connection = new Connection(rpcUrl, "confirmed");
  const ret = await confirmTransactionFromBackend(network, transaction, prvKey);
  console.log(ret);

  connection.onSignature(ret, callback, "finalized");
  return ret;
}
export async function signAndConfirmTransactionFe(
  network: any,
  transaction: any,
  callback: any
) {
  const phantom = new PhantomWalletAdapter();
  await phantom.connect();
  const rpcUrl = clusterApiUrl(network);
  const connection = new Connection(rpcUrl, "confirmed");
  //console.log(connection.rpcEndpoint);
  const ret = await confirmTransactionFromFrontend(
    connection,
    transaction,
    phantom
  );
  // const checks = await connection.confirmTransaction({signature:ret},'finalised');
  console.log(ret);
  // console.log(checks);
  // await connection.confirmTransaction({
  //     blockhash: transaction.blockhash,
  //     signature: ret,
  //   });
  connection.onSignature(ret, callback, "finalized");
  return ret;
}
