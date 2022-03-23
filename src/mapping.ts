import { TransferUSDC } from '../generated/schema'
import { Transfer } from '../generated/ERC20/ERC20'

export function handleTransfer(event: Transfer): void {
    let transfer = new TransferUSDC(event.transaction.hash.toHex() + '-' + event.logIndex.toString());

    transfer.hash = event.transaction.hash;
    transfer.initiator = event.transaction.from
    transfer.from = event.params.from;
    transfer.value = event.params.value;
    transfer.to = event.params.to;
    transfer.gasPrice = event.transaction.gasPrice;
    transfer.blockHash = event.block.hash;
    transfer.blockNumber = event.block.number;
    transfer.timestamp = event.block.timestamp;
    
    transfer.save();
}
