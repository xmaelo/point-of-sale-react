import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import jwt_decode from "jwt-decode";

import {request_post, request_get} from '../../../config'
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch()

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Le nom d'utilisateur est requis").required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  async function onLogin(obj){
    try {
        const obx = {username: obj.email, password: obj.password}
        
        console.log('first obx', obx)
        const res = await request_post("login", obx, true)
        const data = jwt_decode(res.token)
        console.log('first obx', data)
        dispatch({type: "SAVE_HEADER", token: "Bearer "+res.token})

        const users = await request_get("users?username="+data.username)
        
        if(users&&users['hydra:member']&&users['hydra:member'][0]){
            const user = users['hydra:member'][0]

            console.log('>>> result getUser', user)

            dispatch({type: "SAVE_USER", user: user})
            if(user.role.task_name !== "serveur"){
                return true
            }
        }
        
    } catch (error) {
        console.log('errro login', error)
    }
  }

  async function onReload(){
    try {
      const tables = await request_get('consommables')
      if(tables&&tables['hydra:member']){
        let t = tables['hydra:member']
        dispatch({type: "SAVE_CONSO", consommables: t})
      }
    } catch (error) {
      console.log('error fetching table >>', error) 
    }
  }
  async function getTab(){
    try {
      const tables = await request_get('tables')
      if(tables&&tables['hydra:member']){
        let t = tables['hydra:member']
        dispatch({type: "SAVE_TABLE", tables: t})
      }
    } catch (error) {
      console.log('error fetching table >>', error) 
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      const res = await onLogin(formik.values)
      if(res){
        navigate('/dashboard', { replace: true });
        onReload()
        getTab()
        
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="Nom d'utilisateur"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Mot de passe"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="SE souvenir de moi"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
