import { TransferUSDC } from '../generated/schema'
import { Transfer } from '../generated/ERC20/ERC20'
import { pools } from './pools'

export function handleTransfer(event: Transfer): void {
	const destAddress = event.params.to.toHexString().toLowerCase()

	if (pools.includes(destAddress)) {
		const transfer = new TransferUSDC(`${event.transaction.hash.toHex()}-${event.logIndex.toString()}`)

		transfer.hash = event.transaction.hash
		transfer.initiator = event.transaction.from
		transfer.from = event.params.from
		transfer.value = event.params.value
		transfer.to = event.params.to
		transfer.gasPrice = event.transaction.gasPrice
		transfer.blockHash = event.block.hash
		transfer.blockNumber = event.block.number
		transfer.timestamp = event.block.timestamp

		transfer.save()
	}
}
