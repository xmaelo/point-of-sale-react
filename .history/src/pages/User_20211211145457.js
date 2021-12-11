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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {request_post, request_get, request_delete} from '../config'
import USERLIST from '../_mocks_/user';


import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import trash2Outline from '@iconify/icons-eva/trash-2-outline';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nom', alignRight: false },
  { id: 'username', label: "Nom d'utilisateur", alignRight: false },
  { id: 'role', label: "Role", alignRight: false },
  // { id: 'status', label: 'Statut', alignRight: false },
  { id: '' , label: "Actions", alignRight: false }
];

// ----------------------------------------------------------------------



function Form(props) {
  const [checked, setChecked] = React.useState(false);

  const [name, setName] = React.useState("");
  const [username, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [pass1, setPass1] = React.useState("");
  const [roles, setRoles] = React.useState([]);
  const [role, setRole] = React.useState("");

  const [loanding, setLoand] = React.useState(false); 

  
  React.useEffect(function(){
    onLoadTyeOnWait()
  }, [])

  async function onLoadTyeOnWait(){
    try {
      const result =  await request_get('roles')
      if(result&&result['hydra:member']){
        setRoles(result['hydra:member'])
      }
    } catch (error) {
      console.log('onLoadTyeOnWait', error)
    }
  }

  const handleChange = (event) => {
    setRole(event.target.value);
};


  async function onSaveTable(){
    try {
      setLoand(true)
      const obx = {name: name, password: pass, email: username, username: username, role: role}
      console.log('____________TY______________', obx)
      const result = await request_post("users", obx)
      setName('')
      setPass("")
      setPass1("")
      setUser("")
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
            height: 400,
            width: 250,
          },
        }}
      >
        <div>
          <Collapse in={props.showTable}>
            <Paper sx={{ m: 1 }} elevation={4}>
              <Box component="form" sx={{ width: 600, height: 310, paddingLeft: 5, paddingRight: 5, paddingTop: 2 }}>
                <h4>Ajout d'un utilisateur</h4>
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
                  id="outlined-basic" 
                  label="Nom d'utilisateur" 
                  variant="outlined" 
                  style={{width: '47%', marginLeft: '2%'}} 
                  value={username}
                  onChange={(e)=>setUser(e.target.value)}
                />

                <TextField 
                  id="outlined-basic" 
                  label="Mot de passe" 
                  type="password"
                  variant="outlined" 
                  style={{width: '47%', marginTop: 15}} 
                  value={pass}
                  onChange={(e)=>setPass(e.target.value)}
                />
                <TextField 
                  type="password"
                  id="outlined-basic" 
                  label="Re-Mot de passe" 
                  variant="outlined" 
                  style={{width: '47%', marginLeft: '2%', marginTop: 15}} 
                  value={pass1}
                  onChange={(e)=>setPass1(e.target.value)}
                />

                <FormControl
                    style={{width: '47%',  marginTop: 15}}
                >
                    <InputLabel id="demo-simple-select-label">Selectionner le role</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Sekectionner le role"
                    onChange={handleChange}
                    >
                        {roles.map((t, k) =>
                            <MenuItem value={t['@id']} t={k}>{t.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                {/* <Box sx={{ width: '100%' }}>
                  <LinearProgress />
                </Box> */}
                <br/>

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
  const [tableLoad, setTableLoad] = useState(false);

  const dispatch = useDispatch()

  const [users, setUsers] = useState([])

  React.useEffect(function(){
    onReload()
  }, [])

  async function onReload(){
    try {
      setShowTable(false)
      setShowHeigh(0)
      setTableLoad(true)
      const users = await request_get('users')
      setTableLoad(false)
      if(users&&users['hydra:member']){
        let t = users['hydra:member']
        setUsers(t)
      }
      console.log('users users users users', users['hydra:member'])
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
      const newSelecteds = users.map((n) => n.id);
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

  async function onDelete(id){ 
    if(!window.confirm("Voulez vous vraiment l'efacer ?")) return
    const res = await request_delete('users/'+id)
    onReload()
  }
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isUserNotFound = users.length === 0;

  return (
    <Page title="Liste d'utilisateurs">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Utilisateurs
          </Typography>

          <Form heigh={heigh} showTable={showTable} reload={onReload}/>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={()=>{
                if(!showTable){
                    setShowHeigh(350); 
                    setShowTable(true)
                }else{
                    setShowTable(false)
                    setShowHeigh(0)
                }
            }}
            startIcon={<Icon icon={plusFill} />}
          >
            {!showTable? "Nouvel user" : "Cacher"}
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
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {!tableLoad && users.sort()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, role, status, username, avatarUrl, isVerified } = row;
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
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="center">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{username}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={'success'}
                            >
                              {role.name}
                            </Label>
                          </TableCell>

                          <TableCell align="right" style={{alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                            
                            <span  style={{marginTop: '-100px'}} onClick={() =>onDelete(id)} >
                                <Icon icon={trash2Outline} width={24} height={24}/>
                            </span>
                            
                            <Link to={"/statistique/"+username}>
                                Bilan
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
            count={users.length}
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
