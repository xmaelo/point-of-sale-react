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



import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'company', label: 'Nom', alignRight: false },
  { id: 'name', label: 'Prix', alignRight: false },
  { id: 'role', label: 'Description', alignRight: false },
  { id: 'isVerified', label: 'Type', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------


function Form(props) {
    const [checked, setChecked] = React.useState(false);
  
    const [loanding, setLoand] = React.useState(false);

    const [price, setPrice] = React.useState(0);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [typeConsommable, setType] = React.useState(0);
    const [picture, setPath] = React.useState("");
    const [listTyp, setTypesObx] = React.useState([]);
    const [file, setFile] = React.useState([]);

    React.useEffect(function(){
      onReload()
      onGetTypeCOnsommable()
    }, [])

    async function onReload(){

    }

    async function onGetTypeCOnsommable(){
      try {
        const result =  await request_get('type_consommables')
        console.log('result result result', result)
        if(result&&result['hydra:member']){
          setTypesObx(result['hydra:member'])
        }
      } catch (error) {
        console.log('error fetching TypeConso', error)
      }
    }
    const handleChange = () => {
      setChecked((prev) => !prev);
    };

    const onChangeFile = (event) => {
      console.log(event.target.files[0])
      //console.log(event.target.name)
      setFile(event.target.files[0])
      //setPath(event.target.name)
    }

    async function onSaveMenu(){
      try {
        console.log('file file file file', file)
        const formData = new FormData();
        formData.append("file", file, file.name);

        formData.append("name", name)
        formData.append("description", description)
        formData.append("price", parseFloat(price))
        formData.append("typeConsommable", typeConsommable)
        formData.append("status", true)
        


        //setLoand(true)
        //const obx = {name, description, picture, typeConsommable, price: parseInt(price), file: formData}

        console.log('obx obx obx obx', formData.getAll("file"))
        //return
        const result = await request_post_with_picture("consommables", formData)
        console.log('result result result', result)
        // setName('')
        // setPrice(0)
        // setDescription("")
        // setPath('')
        // setLoand(false)
        //props.reload()
      } catch (error) {
        //console.log('error ==', error)
        //setLoand(false)
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
                <Box component="form" sx={{ width: 600, height: 340, paddingLeft: 5, paddingRight: 5, paddingTop: 2 }}>
                  <h4>Nouveau consommable</h4>
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
                    label="Prix" 
                    variant="outlined" 
                    style={{width: '47%', marginLeft: '2%'}} 
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                  />

                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Type de consommable"
                    style={{width: '47%', marginTop: 15}}
                    value={typeConsommable}
                    onChange={(e)=>setType(e.target.value)}
                    helperText="Selection du type de consommable"
                  >
                    {listTyp&&listTyp.map((row, k) =>
                      <MenuItem  value={row['@id']} key={k}>
                        {row.name}
                      </MenuItem>
                    )}
                  </TextField>
                  <TextField 
                    type="file" 
                    id="outlined-basic" 
                    label="Photo" 
                    variant="outlined" 
                    style={{width: '47%', marginLeft: '2%', marginTop: 15}} 
                    onChange={onChangeFile}
                  />

                  <TextField 
                    id="outlined-basic" 
                    multiline
                    minRows={2} 
                    label="Description" 
                    variant="outlined" 
                    style={{width: '96%', marginTop: 15}} 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                  />

                  <Button
                      variant="contained"
                      component={RouterLink}
                      to="#"
                      style={{marginTop: 10}}
                      onClick={()=>{
                          onSaveMenu()
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

export default function Menu() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showTable, setShowTable] = useState(false);
  const [heigh, setShowHeigh] = useState(0);

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
    <Page title="Liste de consommables">
      <Container>


        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Consommables
          </Typography>
        <Form heigh={heigh} showTable={showTable}/>
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
            {!showTable? "Ajouter consommable" : "Cacher"}
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

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
                  {filteredUsers
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
                              <Avatar alt={name} src={require('../asssets/img/p.jpg').default} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{300}</TableCell>
                          <TableCell align="left">{role}</TableCell>
                          <TableCell align="left">{'Repas'}</TableCell>
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
