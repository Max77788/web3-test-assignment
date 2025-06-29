import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, useTheme } from "@mui/material";
import SubTitle from "../text/SubTitle";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import Eth from "@ledgerhq/hw-app-eth";
import TrezorConnect from "@trezor/connect";

interface Props {
  openModal: boolean;
  handleCloseModal: () => void;
}

const HardwareWalletModal = ({ openModal, handleCloseModal }: Props) => {
  const theme = useTheme();

  const connectLedger = async () => {
    try {
      const transport = await TransportWebUSB.create();
      const eth = new Eth(transport);
      await eth.getAddress("44'/60'/0'/0/0");
    } catch (err) {
      console.error(err);
    } finally {
      handleCloseModal();
    }
  };

  const connectTrezor = async () => {
    try {
      await TrezorConnect.init({
        manifest: { email: "test@example.com", appUrl: "http://localhost" },
      });
      await TrezorConnect.ethereumGetAddress({ path: "m/44'/60'/0'/0/0" });
    } catch (err) {
      console.error(err);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <Modal keepMounted open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          [theme.breakpoints.up("sm")]: { width: 400 },
          width: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "10px",
          p: 4,
        }}
      >
        <SubTitle text="Connect Hardware Wallet" />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button variant="contained" onClick={connectLedger}>
            Connect Ledger
          </Button>
          <Button variant="contained" onClick={connectTrezor}>
            Connect Trezor
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default HardwareWalletModal;
