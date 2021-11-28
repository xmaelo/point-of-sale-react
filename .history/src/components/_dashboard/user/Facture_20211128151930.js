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
  const consommabes = props.order?.consommabes

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
            
            <div id="print-me">
                <div style={{padding: '10px'}}>
                    <h3 style={{textAlign: "center"}}>RAPHIA</h3>
                    
                    <br/>
                    
                    Table: 32<br/>
                    Date: 11/11/2021<br/>
                    Facture No: 11<br/>
                    <br/>
                    <hr style={{border: "none",
    borderTop: "3px double #333",
    color: "#333",
    overflow: "visible",
    textAlign: "center",
    height: "5px"}}/>
                    <br/>
                    <Typography>
                        {consommabes&&consommabes.map((c, i) => 
                        <div key={c.id}>
                            <span >{"- "+c.name} </span>
                            <span style={{float: "right"}}>{"1X "+c.price+ " FCFA"} </span>
                        </div>
                        )}
                    </Typography>
                </div>
            </div>
            <Button onClick={onPrint}>Imprimer</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}