import * as React from 'react';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
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
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
//

import {request_post} from '../config'
import USERLIST from '../_mocks_/user';


import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nom', alignRight: false },
  { id: 'Capacité', label: 'Capcité', alignRight: false },
  { id: 'status', label: 'Statut', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------



function Form(props) {
  const [checked, setChecked] = React.useState(false);

  const [name, setName] = React.useState("");
  const [q, setQ] = React.useState(1);

  const [loanding, setLoand] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  async function onSaveTable(){
    try {
      setLoand(true)
      const result = await request_post("tables", {name: name, capacity: parseInt(q)})
      setName('')
      setQ(1)
      setLoand(false)
      props.reload()
    } catch (error) {
      setLoand(false)
      console.log('error ==', error)
    }
  }

  return (
    <Box sx={{ height: props.heigh }}>
      <Box
        sx={{
          '& > :not(style)': {
            display: 'flex',
            justifyContent: 'space-around',
            height: 320,
            width: 250,
          },
        }}
      >
        <div>
          <Collapse in={props.showTable}>
            <Paper sx={{ m: 1 }} elevation={4}>
              <Box component="form" sx={{ width: 600, height: 200, paddingLeft: 5, paddingRight: 5, paddingTop: 2 }}>
                <h4>Ajout d'une table</h4>
                <br/>
                <TextField 
                  id="outlined-basic" 
                  label="Nom" 
                  variant="outlined" 
                  style={{width: '47%'}} 
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
                <TextField 
                  type="number" 
                  id="outlined-basic" 
                  label="Capacité" 
                  variant="outlined" 
                  style={{width: '47%', marginLeft: '2%'}} 
                  value={q}
                  onChange={(e)=>setQ(e.target.value)}
                />

                {/* <Box sx={{ width: '100%' }}>
                  <LinearProgress />
                </Box> */}

                <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    style={{marginTop: 10}}
                    onClick={()=>{
                        onSaveTable()
                    }}
                    disabled={loanding}
                    //startIcon={<Icon icon={plusFill} />}
                  >
                    {loanding && <CircularProgress  size={20} />}
                    Enregistrer
                </Button>

              </Box>
            </Paper>
          </Collapse>
        </div>
      </Box>
    </Box>
  );
}

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

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [showTable, setShowTable] = useState(false);
  const [heigh, setShowHeigh] = useState(0);
  const [tableLoad, setTableLoad] = useState(true);

  React.useEffect(function(){
    onReload()
  }, [])

  async function onReload(){
    try {
      setShowTable(false)
      setShowHeigh(0)
      setTableLoad(true)
      const tables = await request_get('tables')
      console.log('tables tables tables tables', tables)
    } catch (error) {
      console.log('error fetching table >>', error)
      setTableLoad(false)  
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Liste de tables">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tables
          </Typography>

          <Form heigh={heigh} showTable={showTable} reload={onReload}/>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={()=>{
                if(!showTable){
                    setShowHeigh(200); 
                    setShowTable(true)
                }else{
                    setShowTable(false)
                    setShowHeigh(0)
                }
            }}
            startIcon={<Icon icon={plusFill} />}
          >
            {!showTable? "Nouvelle table" : "Cacher"}
          </Button>
        </Stack>

        <Card>
          {/* <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {!tableLoad && filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, role, status, company, avatarUrl, isVerified } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{company}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(status === 'banned' && 'error') || 'success'}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu />
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
                {isUserNotFound && (
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
            count={USERLIST.length}
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
