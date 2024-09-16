import React from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import DropdownMenu from "./DropdownMenu";
import RadioControl from "./Radio";
import CheckBoxControl from "./CheckBoxControl";
import DateControl from "./DateControl";
import FileControl from "./FileControl";
import RatingControl from "./RatingControl";
import UploadFile from "./UploadFile";
import AutoCompleteComponent from "./AutoComplete";
import SwitchComponent from "./Switch";
import NumberComponent from "./NumberComponent";
import FreeSoloAutocomplete from "./FreeSolo";
import VerifyingEmail from "./VerifyingEmail";
import VerifyingPhone from "./VerifyingPhone";

function FormControl({ control, ...rest }: any) {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <DropdownMenu {...rest} />;
    case "radio":
      return <RadioControl {...rest} />;
    case "checkbox":
      return <CheckBoxControl {...rest} />;
    case "date":
      return <DateControl {...rest} />;
    case "file":
      return <FileControl {...rest} />;
    case "rating":
      return <RatingControl {...rest} />;
    case "upload":
      return <UploadFile {...rest} />;
    case "auto":
      return <AutoCompleteComponent {...rest} />;
    case "switch":
      return <SwitchComponent {...rest} />;
    case "number":
      return <NumberComponent {...rest} />;
    case "verifyPhone":
      return <VerifyingPhone {...rest} />;
    case "freesolo":
      return <FreeSoloAutocomplete {...rest} />;
    case "verifyEmail":
      return <VerifyingEmail {...rest} />;
    default:
      return null;
  }
}

export default FormControl;
