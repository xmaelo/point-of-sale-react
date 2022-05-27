import * as React from 'react';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import {request_post, request_get, request_post_with_picture} from '../config'
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
//

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

import USERLIST from '../_mocks_/user';
import { useDispatch, useSelector } from 'react-redux';

import { imageBase } from '../config';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'No', alignRight: false },
  { id: 'company', label: 'Element', alignRight: false },
  { id: 'name', label: 'Prix', alignRight: false },
  { id: 'encaisse', label: 'Encaisse', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'table', label: 'Table', alignRight: false },
  { id: 'state', label: 'Status', alignRight: false },
  { id: 'etat', label: 'Serveur', alignRight: false },
];


// ----------------------------------------------------------------------



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function OrderArchive() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showTable, setShowTable] = useState(false);
  const [heigh, setShowHeigh] = useState(0);
  const [tableLoad, setTableLoad] = useState(true);
  //const [tables, setTables] = useState([]);

  const [cmds, setCmds] = useState([])

  const [value, setValue] = React.useState(new Date());
  const [periode, setP] = React.useState("");
 
  const handleChangeDate = (newValue) => {
    setValue(newValue);
    handleChangeP(null, newValue)
  };
  const handleChangeP = (event, value2) => {
    let s;
    if(event){
      setP(event.target.value);
      s = event.target.value
    }else{
      s = periode
    }

    let value3;
    if(value2) {
      value3 = value2
    }
    else {
      value3 =new Date(value)
    }

    console.log('valuevalue value value value value', value3.toISOString())
    if(s === "auj"){
        const event = value3;
        const event2 = value3;
        console.log('timstamp1', event.toISOString())
        event.setHours(0, 0, 0);
        event2.setHours(23, 59, 59);
        console.log('timstamp1', event.toISOString())
        const constraint = "time[after]="+event.toISOString().split('T')[0]+"&time[before]="+event2.toISOString()
        return onLoadTyeOnWait(constraint)
    }
    if(s === "sem"){
        const event = new Date(value3);
    
        // const event = value3;
        // const firstDay = getMonday(event)
        // console.log('timstamp1', firstDay.toISOString())
        // firstDay.setHours(0, 0, 0);
        // console.log('timstamp1', firstDay.toISOString())
        const startDate = new Date(event.setDate(event.getDate() - event.getDay()+ (event.getDay() == 0 ? -6:1) ))
        const endDate = new Date(event.setDate(event.getDate() - (event.getDay() == 0 ? 7 : event.getDay()) + 7))

        console.log('startDate startDate', new Date(startDate).toISOString().split('T')[0], new Date())
        endDate.setHours(23, 59, 59);
        const constraint = "time[after]="+new Date(startDate).toISOString().split('T')[0]+"&time[before]="+new Date(endDate).toISOString()
        return onLoadTyeOnWait(constraint)
    }
    if(s === "mois"){
        const date = value3, y = date.getFullYear(), m = date.getMonth();
        const firstDay = new Date(y, m, 1);
        //const lastDay = new Date(y, m + 1, 0);

        const lastdate = new Date(date.getFullYear(), date.getMonth() + 1, 0);


        // console.log('timstamp1', firstDay.toISOString())
        lastdate.setHours(23, 59, 59);
        // console.log('timstamp1', firstDay.toISOString())
        const constraint = "time[after]="+firstDay.toISOString().split('T')[0]+"&time[before]="+lastdate.toISOString()
        return onLoadTyeOnWait(constraint)
    }
};


  React.useEffect(function(){
      const target = {}
      target.value = 'auj'
      const event = {}
      event.target = target
      handleChangeP(event)
  }, [])

  function format (number){
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'XAF' }).format(number)
  }

  
  async function onLoadTyeOnWait(contranit){
    try {
      setShowTable(false)
      setShowHeigh(0) 
      setTableLoad(true)
      const cmds = await request_get('commandes?order[id]=desc&status.task_name=valide&status.task_name=servie&'+contranit)
      console.log('cmds cmds cmds cmds cmds', cmds)
      setTableLoad(false)
      if(cmds&&cmds['hydra:member']){
        let t = cmds['hydra:member']
        setCmds(t)
        //dispatch({type: "SAVE_CONSO", consommables: t})
      }
    } catch (error) {
      console.log('error fetching table >>', error)
      setTableLoad(false)  
    }
  }


  const handleRequestSort = (event, property) => {
    // const isAsc = orderBy === property && order === 'asc';
    // setOrder(isAsc ? 'desc' : 'asc');
    // setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = cmds.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
      console.log('table_ table_ table_', id)
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  }; 

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cmds.length) : 0;

  const filteredUsers = applySortFilter(cmds, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  function renerPrice(){
    let price = 0
    cmds&&cmds.map(o => {
      price = price + parseFloat(o.price)
    })
    return price
}

  function renderTitle(consommabes){
    return(
      <Typography>
        {consommabes&&consommabes.map((c, i) => 
           <span key={c.id}>{"- "+c.name} <br/> </span>
        )}
      </Typography>
    ) 
  }

  return (
    <Page title="Historiques">
      <Container>


        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Historiques
          </Typography>
        </Stack>

        <Card>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
            <div style={{padding: '10px', display: 'flex'}}>
                <br/>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <FormControl
                    style={{width: '20%',  marginTop: 15}}
                >
                    <DesktopDatePicker
                      label="Date de debut"
                      inputFormat="MM/dd/yyyy"
                      style={{marginTop: 15}}
                      value={value}
                      onChange={handleChangeDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </FormControl>
                </LocalizationProvider>

                <FormControl
                    style={{width: '20%',  marginTop: 15, marginLeft: '20px'}}
                >
                    <InputLabel id="demo-simple-select-label">Période</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={periode}
                    label="Période"
                    onChange={(e) => handleChangeP(e)}
                    >
                        <MenuItem value="auj">Cet Jour </MenuItem>
                        <MenuItem value="sem"> Cette Semaine</MenuItem>
                        <MenuItem value="mois"> Ce Mois </MenuItem>
                        
                    </Select>
                </FormControl>
                <FormControl
                    style={{width: '20%',  marginTop: 15, marginLeft: '20px'}}
                >
                  <br/>
                  <span style={{fontSize: "14px", fontWeight: 'bold'}}>
                      Total des ventes: {format(renerPrice())}
                  </span>
                </FormControl>
              </div>

              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={cmds.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {!tableLoad && cmds
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, activated, price, picture, description, typeConsommable } = row;
                      const isItemSelected = selected.indexOf(id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {renderTitle(row.consommabes)}
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{format(price)}</TableCell>
                          <TableCell align="left" style={{color: 'red'}}>{row.encaisse ? "Oui" : "Non"}</TableCell>
                          <TableCell align="left">{row.time?.split('T')[0]}</TableCell>
                          <TableCell align="left">{row.table_?.name}</TableCell>
                          <TableCell align="left">{row.status?.name}</TableCell>
                          <TableCell align="left">
                            <Link to={"/dashboard/bilan/"+row.user?.username}>
                              {row.user?.name}
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {!tableLoad && isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}

                {tableLoad && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Box sx={{ width: '50%', margin: 'auto' }}>
                          <LinearProgress />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={cmds.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          
        </Card>
      </Container>
    </Page>
  );
}
