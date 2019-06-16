import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();


  return (

    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="choose-type">Escolha o tipo:</InputLabel>
      <Select
        value={props.value}
        onChange={props.handleChange}
        input={<OutlinedInput name={props.name} id="choose-type" />}
      >
        <MenuItem value="salao">Salão</MenuItem>
        <MenuItem value="cozinha">Cozinha</MenuItem>
      </Select>
    </FormControl>

  );
}