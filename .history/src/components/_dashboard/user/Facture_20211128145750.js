import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import printHtmlToPDF from "print-html-to-pdf";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Facture(props) {


  const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);

  async function onPrint(){
    const node = window.document.getElementById("print-me")

    const pdfOption = {
      jsPDF: {
        unit: 'px',
        format: 'a8',
      },
        spin: false,
        fileName: 'default'
    }
    console.log('before prin')
    await printHtmlToPDF.print(node, pdfOption);
  }


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Facture
            </Typography>
            
            <div id="print-me">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit
                    amet laoreet urna, eu convallis arcu. Etiam eget risus nec justo ultricies
                    lobortis. Sed vehicula quam tellus, non porttitor felis pulvinar eget.
                    Integer ac porttitor diam. Donec ultrices vel ex et scelerisque. Ut
                    vulputate dolor nulla, vitae viverra tortor eleifend ut. Suspendisse
                    potenti. In sagittis est non lectus blandit, non tempus erat maximus.
                    Vestibulum id enim dignissim, viverra purus sed, finibus ex. Praesent quis
                    consectetur est. Cras ac erat auctor, egestas magna et, gravida tellus.
                    Phasellus non posuere tortor.
                </p>
            </div>
            <Button onClick={onPrint}>Imprimer</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}