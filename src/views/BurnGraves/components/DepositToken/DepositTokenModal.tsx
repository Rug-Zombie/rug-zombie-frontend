import React, { useState, useEffect } from 'react';
import { Button, Flex, Image, Modal, Text } from '@rug-zombie-libs/uikit';
import { account, burnGraveById } from 'redux/get';
import BigNumber from 'bignumber.js';
import { APESWAP_EXCHANGE_URL } from 'config';
import { getDrBurnensteinContract } from 'utils/contractHelpers';
import { getAddress } from '../../../../utils/addressHelpers';
import { useDrBurnenstein, useERC20 } from '../../../../hooks/useContract'
import useToast from '../../../../hooks/useToast';
import { useTranslation } from '../../../../contexts/Localization';
import { BIG_TEN } from '../../../../utils/bigNumber';

export interface DepositTokenModalProps {
  id: number,
  updateResult: any,
  onDismiss?: () => void,
}

const DepositTokenModal: React.FC<DepositTokenModalProps> = ({ id, updateResult, onDismiss }) => {
  const [hasToken, setHasToken] = useState(false);

  const { toastDefault } = useToast();
  const { t } = useTranslation();

  const grave = burnGraveById(id);
  const token = useERC20(getAddress(grave.depositToken.address));
  const wallet = account();
  const drBurnensteinContract = useDrBurnenstein();

  useEffect(() => {
    if(wallet) {
      token.methods.balanceOf(wallet).call()
        .then(res => {
          setHasToken(!(new BigNumber(res)).isZero());
        });
    }
  });

  const handleDeposit = () => {
    if (wallet) {
      drBurnensteinContract.methods.deposit(id, BIG_TEN.pow(18).toString(), 0).send({ from: wallet })
        .then(() => {
          updateResult(id);
          toastDefault(t(`1 ${grave.depositToken.symbol} DEPOSITED`));
          onDismiss();
        });
    }
  };

  return (
    <Modal onDismiss={onDismiss} title={`Deposit 1 ${grave.depositToken.symbol} Token`}>
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Flex alignItems="center" minWidth="70px">
          <Image src={`/images/tokens/${grave.depositToken.symbol.toLowerCase()}.png`} width={24} height={24} alt={`${grave.depositToken.symbol}`} />
          <Text ml="4px" bold>{grave.depositToken.symbol}</Text>
        </Flex>
      </Flex>
      <Text mt="8px" ml="auto" bold color="tertiary" fontSize="14px" mb="8px">
        To enter this pool, you must deposit 1 {grave.depositToken.symbol} token as part of the unlock process.
      </Text>
      {hasToken
        ? <Button onClick={handleDeposit} mt="8px" as="a" variant="secondary">
          DEPOSIT {grave.depositToken.symbol}
        </Button>
        : <Button mt="8px" as="a" href={`${APESWAP_EXCHANGE_URL}/swap?outputCurrency=${getAddress(grave.depositToken.address)}`} variant="secondary">
          GET {grave.depositToken.symbol}
        </Button>}
    </Modal>
  )
}

export default DepositTokenModal;