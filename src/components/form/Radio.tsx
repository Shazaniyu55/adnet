import { Field } from "formik";
import {
  Box,
  FormControl,
} from "@mui/material";
import CustomErrorMessage from "./CustomErrorMessage";

export type RadioOption = {
  label: string;
  value: string;
};
function RadioControl({
  name,
  label,
  checkedValue,
  options,values,
  ...rest
}: {
  name: string;
  label: string;
  checkedValue: string;
  options: RadioOption[];values:any
}) {
  //const [fieldValue,setFieldValue] = useState(options[0].key)
  return (
    <Box marginBottom={2}>
      <FormControl>
        <label style={{marginBottom:'1rem'}}>{label}</label>

        {Array.isArray(options) &&
          options.map((option, i) => (
            <label key={i}>
              <Field type="radio" name={name} value={option.value}   checked={option.value === values[name] }/>
              {option.label}
            </label>
           
          ))}
      </FormControl>
      <CustomErrorMessage name={name}/>
     
    </Box>
  );
}

export default RadioControl;
